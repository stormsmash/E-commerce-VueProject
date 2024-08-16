<template>
  <div>
    <div class="row bg-white p-3 mt-3 ms-3 boxraduis boxPay">
      <h2>แจ้งชำระเงิน</h2>
      <hr />
      <div>
        <div class="mt-5">
          <Select
            v-model="form.IDBank"
            :v="$v.form.IDBank"
            inputname="productBrand"
            text="เลือกธนาคารที่ชำระเงิน"
            :Data="Bank"
          />
        </div>
        <!-- preview Bank -->
        <div v-for="(item, index) in Bank" :key="index">
          <div
            v-if="item.id_bank == form.IDBank"
            class="d-flex align-items-center mb-3"
          >
            <img
              :src="`${$URL}/imgBank/${item.bank_img}`"
              alt=""
              width="76px"
            />
            <div class="ms-3">
              <p class="p-0 m-0">ชื่อบัญชี {{ item.bank_name }}</p>
              <p class="p-0 m-0">เลขบัญชี {{ item.bank_num }}</p>
            </div>
          </div>
        </div>
        <!-- Date -->
        <DatePicker
          is-red
          color="red"
          v-model="date"
          mode="dateTime"
          locale="th"
          is24hr
        >
          <template v-slot="{ inputValue, inputEvents }">
            <div class="d-block group">
              <p class="texttime mb-2 p-0">วันที่และเวลาที่โอน</p>
              <input class="m-0 p-0" :value="inputValue" v-on="inputEvents" />
            </div>
          </template>
        </DatePicker>
        <div class="position-relative">
          <Input
            v-model="form.Price"
            :v="$v.form.Price"
            inputname="price"
            text="จำนวนเงินที่โอน"
          />
          <span v-if="!$v.form.Price.numeric" class="text-danger textErrorPrice"
            >กรุณาใส่จำนวนเงิน</span
          >
        </div>

        <!-- img -->
        <div class="row d-flex justify-content-between">
          <div class="col-6">
            <p class="texttime mb-2 p-0">อัปโหลดหลักฐานการชำระเงิน</p>
            <label for="file-upload-bank" class="custom-file-upload">
              <i class="fas fa-image"></i> อัปโหลดรูป
            </label>
            <input
              id="file-upload-bank"
              type="file"
              class=""
              @change="onChange"
              ref="file"
              accept=".jpg,.jpeg,.png"
            />
            <p class="text-danger" v-if="filelist[0] == null">
              กรุณาเลือกรูปภาพ
            </p>
            <p v-b-modal.modal-pay class="text_imgpay">
              ตัวอย่างหลักฐานการชำระเงิน
            </p>
            <b-modal
              id="modal-pay"
              ref="modal-pay"
              centered
              title="ตัวอย่างหลักฐานการชำระเงิน"
              hide-footer
            >
              <div>
                <p class="my-4">
                  <img src="../../assets/sleep.png" alt="" class="sleep" />
                </p>
                <div>
                  <button
                    type="reset"
                    class="btn btn-sm btn-danger rounded-pill mx-auto d-block"
                    @click="$refs['modal-pay'].hide()"
                  >
                    ตกลง
                  </button>
                </div>
              </div>
            </b-modal>
          </div>
          <div class="col-6">
            <div v-for="(file, index) in Img" :key="index">
              <div class="position-relative boxImg">
                <img :src="`${file.url}`" alt="" class="img-fluid" width="" />
                <button
                  class="ml-2 btn btn-danger btn-sm"
                  type="button"
                  @click="remove(index)"
                  title="Remove file"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- btn -->
        <div class="text-center mt-3">
          <button class="btnCart rounded-pill mx-auto" @click="submitPay">
            ส่งหลักฐานการชำระเงิน
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Select from "../Input/Select.vue";
import Input from "../Input/Input.vue";
import { DatePicker } from 'v-calendar';
import { required, minLength, numeric } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "PayBank",
  props: {
    data: Array,
  },
  components: {
    Select,
    Input,
    DatePicker,
  },

  data() {
    return {
      deliverPrice: 45,
      id_user: this.$session.get("id_member"),
      Total: 0,
      IDOrder: this.data[0].id_order,
      Bank: [],
      filelist: [],
      date: new Date(),
      Img: [],
      form: {
        IDBank: null,
        Price: null,
      },
    };
  },

  validations: {
    form: {
      IDBank: { required },
      Price: { required, minLength: minLength(1), numeric },
    },
  },

  methods: {
    getBank() {
      axios
        .post(`${this.$URL}/Admin/bank.php`, {
          action: "getBankShow",
        })
        .then((res) => {
          this.Bank = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectBank(id) {
      alert(id);
    },
    getDay(time) {
      this.Datetime = time;
    },
    onChange() {
      this.filelist = [...this.$refs.file.files];
      const typeImg = "|jpg|png|jpeg";
      const type = this.filelist[0].type.split("/");
      if (this.filelist[0] != null && typeImg.indexOf(type[1]) !== -1) {
        this.Img = this.filelist.map((item, index) => ({
          key: index,
          name: item.name,
          url: URL.createObjectURL(item),
        }));
      } else {
        this.$swal({
          position: "center",
          icon: "error",
          title: "ผิดผลาด",
          text: "รองรับไฟล์: .JPEG, .PNG เท่านั้น",
          showCancelButton: false,
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#EB4247",
        }).then(() => {
          this.filelist[0] = null;
          this.Img = null;
        });
      }
    },
    remove(i) {
      this.filelist.splice(i, 1);
      this.Img.splice(i, 1);
      this.$refs.file.FileList.splice(i, 1);
    },
    submitPay() {
      this.$v.$touch();
      if (this.$v.$invalid || this.filelist[0] == null) {
        console.log("Error");
      } else {
        const fromData = new FormData();
        fromData.append("id_bank", this.form.IDBank);
        fromData.append("id_order", this.IDOrder);
        fromData.append("date", this.date);
        fromData.append("price", this.form.Price);
        fromData.append("img", this.filelist[0]);
        fromData.append("action", "submitPay");
        axios.post(`${this.$URL}/User/pay.php`, fromData).then(() => {
          this.$swal({
            position: "center",
            icon: `success`,
            text: `แจ้งชำระเงินสำเร็จ`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$router.push("/Profile/OrderMe/Order/All");
          });
        });
      }
    },
  },

  created() {
    this.getBank();
  },
};
</script>

<style scoped>
@import "../../assets/css/input.css";

input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 0.01rem solid #ccc;
  display: inline-block;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
}
.boxPay {
  height: auto;
  display: block;
}
.btnCart {
  background-color: #c5604e;
  border: none;
  font-size: 1.2rem;
  color: white;
  padding: 0.3rem 1.5rem;
  width: auto;
  height: 2.5rem;
  border-radius: 1.1rem;
  margin: 0 auto;
}
.btnCart:hover {
  background-color: #e8a89c;
  color: white;
}
.textPrice {
  color: #bc2721;
}
.texttime {
  font-size: 0.9rem;
  color: #a66a42;
}
.boxImg button {
  position: absolute;
  font-size: 0.9rem;
  top: -0.5rem;
  left: -0.5rem;
}
.textErrorPrice {
  position: absolute;
  bottom: -1.3rem;
}
.text_imgpay {
  color: #000000;
  transition: 0.3s ease;
  padding: 0;
  margin: 0;
}
.text_imgpay:hover {
  color: #868686;
}
.sleep {
  width: 20rem;
  margin: 0 auto;
  display: block;
}
</style>
