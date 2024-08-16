<template>
  <div class="boxraduis mt-3">
    <div>
      <div class="row mt-1 p-3">
        <div
          class="col-12 d-flex align-items-center mb-3 justify-content-between"
        >
          <h4 class="p-0 m-0">ที่อยู่ของฉัน</h4>
          <button
            class="btn btnDefault rounded-pill"
            @click="resetData"
            v-b-modal.modal-add
          >
            + เพิ่มที่อยู่
          </button>
        </div>

        <hr />

        <div class="row ms-2" v-for="(item, index) in address" :key="index">
          <div class="col-8">
            <div class="row">
              <div class="col-3">
                <span>ชื่อ - สกุล</span>
              </div>
              <div class="col-9">
                <p>
                  {{ item.name }}
                  <span class="defaultAdd" v-if="item.status == 1"
                    >ค่าเริ่มต้น</span
                  >
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <span>โทรศัพท์ </span>
              </div>
              <div class="col-9">
                <p>{{ item.phone }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <span>ที่อยู่ </span>
              </div>
              <div class="col-9">
                <p>
                  {{ item.address }}
                </p>
                <p>ต. {{ item.TambonName }} อ. {{ item.DistrictName }}</p>
                <p>จ. {{ item.ProvinceThai }} {{ item.zipcode }}</p>
              </div>
            </div>
          </div>
          <div class="col-4 text-end">
            <div class="d-flex justify-content-end align-items-center">
              <div
                class="line me-3"
                @click="updateAdd(item.id_address)"
                v-b-modal.modal-edit
              >
                แก้ไข
              </div>
              <!-- <div v-if="item.status == 0">
                <img
                  class="img"
                  src="../../assets/icon/delete.png"
                  alt=""
                  @click="deleteAdd(item.id_address)"
                />
              </div> -->
            </div>
            <button
              class="btn btnDefault rounded-pill mt-2"
              @click="setAddress(item.id_address)"
              :disabled="item.status == 1"
            >
              ตั้งเป็นค่าเริ่มต้น
            </button>
          </div>
          <hr class="mt-3" />
        </div>
      </div>
    </div>

    <!-- Modal Add -->
    <b-modal
      id="modal-add"
      ref="my-modal-add"
      hide-footer
      centered
      title="ที่อยู่ใหม่"
      size="lg"
    >
      <form ref="fromaddress" @submit.prevent="saveAddress" class="p-2">
        <div class="row mt-2">
          <div class="col-6">
            <Input
              v-model="form.name"
              :v="$v.form.name"
              inputname="name"
              text="ชื่อ-นามสกุล"
            />
          </div>
          <div class="col-6">
            <Input
              v-model="form.phone"
              :v="$v.form.phone"
              inputname="phone"
              text="หมายเลขโทรศัพท์"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <Select
              v-model="form.province"
              :v="$v.form.province"
              inputname="province"
              text="จังหวัด"
              :Data="Province"
              @input="getDistrict"
              @reset1="resetDistrictAndTombon"
            />
          </div>
          <div class="col-6">
            <Select
              v-model="form.district"
              :v="$v.form.district"
              inputname="district"
              text="อำเภอ"
              :Data="District"
              @input="getTombon"
              @reset1="resetTombon"
            />
          </div>
          <div class="col-6">
            <Select
              v-model="form.tombon"
              :v="$v.form.tombon"
              inputname="tombon"
              text="ตำบล"
              :Data="Tombon"
              @input="getZipcode(form.tombon)"
            />
          </div>
          <div class="col-6">
            <Input
              v-model="form.zipcode"
              :v="$v.form.zipcode"
              inputname="zipcode"
              text="รหัสไปรษณีย์"
            />
          </div>
        </div>
        <Input
          v-model="form.addressInput"
          :v="$v.form.addressInput"
          inputname="address"
          text="รายละเอียดที่อยู่"
        />
        <div class="footer d-flex justify-content-end mt-5">
          <button
            type="reset"
            class="btn-outline-light btnReset me-2 rounded-pill"
            @click="hideModal('add')"
          >
            ยกเลิก
          </button>
          <button type="submit" class="btnOk rounded-pill">ยืนยัน</button>
        </div>
      </form>
    </b-modal>
    <!-- Modal Add -->

    <!-- Modal Edit -->
    <b-modal
      id="modal-edit"
      ref="my-modal-edit"
      hide-footer
      centered
      title="แก้ไขข้อมูลที่อยู่"
      size="lg"
    >
      <form ref="fromEdit" @submit.prevent="editAddress" class="p-2">
        <div class="row mt-2">
          <div class="col-6">
            <Input
              v-model="form.name"
              :v="$v.form.name"
              inputname="name"
              text="ชื่อ-นามสกุล"
            />
          </div>
          <div class="col-6">
            <Input
              v-model="form.phone"
              :v="$v.form.phone"
              inputname="phone"
              text="หมายเลขโทรศัพท์"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <Select
              v-model="form.province"
              :v="$v.form.province"
              inputname="province"
              text="จังหวัด"
              :Data="Province"
              @input="getDistrict"
              @reset1="resetDistrictAndTombon"
            />
          </div>
          <div class="col-6">
            <Select
              v-model="form.district"
              :v="$v.form.district"
              inputname="district"
              text="อำเภอ"
              :Data="District"
              @input="getTombon"
              @reset1="resetTombon"
            />
          </div>
          <div class="col-6">
            <Select
              v-model="form.tombon"
              :v="$v.form.tombon"
              inputname="tombon"
              text="ตำบล"
              :Data="Tombon"
              @input="getZipcode(form.tombon)"
            />
          </div>
          <div class="col-6">
            <Input
              v-model="form.zipcode"
              :v="$v.form.zipcode"
              inputname="zipcode"
              text="รหัสไปรษณีย์"
            />
          </div>
        </div>
        <Input
          v-model="form.addressInput"
          :v="$v.form.addressInput"
          inputname="address"
          text="รายละเอียดที่อยู่"
        />
        <input
          type="hidden"
          name="id_address"
          :value="getEditData.id_address"
        />
        <div class="footer d-flex justify-content-end mt-5">
          <button
            type="reset"
            class="btn-outline-light btnReset me-2 rounded-pill"
            @click="hideModal('edit')"
          >
            ยกเลิก
          </button>
          <button type="submit" class="btnOk rounded-pill">ยืนยัน</button>
        </div>
      </form>
    </b-modal>
    <!-- Modal Edit -->
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength } from "vuelidate/lib/validators";
import Input from "../../components/Input/Input.vue";
import Select from "../../components/Input/Select.vue";
export default {
  name: "Address",
  components: {
    Input,
    Select,
  },
  data() {
    return {
      address: [],
      getEditData: [],
      Province: [],
      District: [],
      Tombon: [],
      form: {
        name: null,
        phone: null,
        province: null,
        district: null,
        tombon: null,
        zipcode: null,
        addressInput: null,
      },
    };
  },

  validations: {
    form: {
      name: { required, minLength: minLength(2) },
      phone: { required, minLength: minLength(8) },
      province: { required },
      district: { required },
      tombon: { required },
      zipcode: { required, minLength: minLength(5) },
      addressInput: { required, minLength: minLength(1) },
    },
  },
  methods: {
    getProvince() {
      axios
        .post(`${this.$URL}/User/selectAddress.php`, {
          action: "getProvince",
        })
        .then((res) => {
          this.Province = res.data;
        });
    },
    getDistrict() {
      axios
        .post(`${this.$URL}/User/selectAddress.php`, {
          action: "getDistrict",
          ProvinceID: this.form.province,
        })
        .then((res) => {
          this.District = res.data;
        });
    },
    getTombon() {
      axios
        .post(`${this.$URL}/User/selectAddress.php`, {
          action: "getTombon",
          DistrictID: this.form.district,
        })
        .then((res) => {
          this.Tombon = res.data;
        });
    },
    getZipcode(id) {
      const data = this.Tombon.filter((item) => item[0] == id);
      this.form.zipcode = data[0][3];
    },
    resetDistrictAndTombon() {
      this.form.district = null;
      this.form.tombon = null;
      this.form.zipcode = null;
      this.District = null;
      this.Tombon = null;
    },
    resetTombon() {
      this.form.tombon = null;
      this.form.zipcode = null;
      this.Tombon = null;
    },
    saveAddress() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error");
      } else {
        const fromData = new FormData(this.$refs["fromaddress"]);
        for (let key in fromData.entries()) {
          fromData.append(key, fromData[key]);
        }
        fromData.append("id_member", this.$session.get("id_member"));
        fromData.append("action", "saveAddress");
        axios.post(`${this.$URL}/User/address.php`, fromData).then(() => {
          this.hideModal("add");
          this.alert1("success", "เพิ่มข้อมูลเรียบร้อยแล้ว");
          this.getaddress();
          this.resetData();
        });
      }
    },

    editAddress() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error");
      } else {
        const fromData = new FormData(this.$refs["fromEdit"]);
        for (let key in fromData.entries()) {
          fromData.append(key, fromData[key]);
        }
        fromData.append("action", "editAddress");
        axios.post(`${this.$URL}/User/address.php`, fromData).then(() => {
          this.hideModal("edit");
          this.alert1("success", "แก้ไขข้อมูลเรียบร้อยแล้ว");
          this.getaddress();
        });
      }
    },

    getaddress() {
      axios
        .post(`${this.$URL}/User/address.php`, {
          id_member: this.$session.get("id_member"),
          action: "getAddress",
        })
        .then((res) => {
          this.address = res.data;
        });
    },

    hideModal(name) {
      this.$refs["my-modal-" + `${name}`].hide();
      this.resetData();
    },
    alert1(icon, text) {
      this.$swal({
        position: "center",
        icon: `${icon}`,
        title: `${text}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },

    deleteAdd(id) {
      this.$swal({
        icon: "error",
        title: "ยืนยันการลบ",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#EB4247",
        cancelButtonText: "ยกเลิก",
        cancelButtonColor: "#1C9E3F",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`${this.$URL}/User/address.php`, {
              id_address: id,
              action: "deleteAdd",
            })
            .then(() => {
              this.alert1("success", "ลบข้อมูลเรียบร้อยแล้ว");
              this.getaddress();
            });
        }
      });
    },

    getEdit(id) {
      axios
        .post(`${this.$URL}/User/address.php`, {
          id_address: id,
          action: `getEdit`,
        })
        .then((res) => {
          this.getEditData = res.data;
          this.form.name = res.data.name;
          this.form.phone = res.data.phone;
          this.form.province = res.data.province;
          this.form.district = res.data.district;
          this.form.tombon = res.data.tombon;
          this.form.zipcode = res.data.zipcode;
          this.form.addressInput = res.data.address;
          this.getDistrict();
          this.getTombon();
        });
    },
    updateAdd(id) {
      this.getEdit(id);
    },
    setAddress(id) {
      axios
        .post(`${this.$URL}/User/address.php`, {
          id_member: this.$session.get("id_member"),
          id_address: id,
          action: `setAddress`,
        })
        .then(() => {
          this.getaddress();
          this.$emit("setAddress");
        });
    },
    resetData() {
      this.form.name = null;
      this.form.phone = null;
      this.form.province = null;
      this.form.district = null;
      this.form.tombon = null;
      this.form.zipcode = null;
      this.form.addressInput = null;
      this.$v.$reset();
    },
  },
  created() {
    this.getaddress();
    this.getProvince();
    this.$root.$emit("Address");
    document.title = "Pepensuda Shop Profile";
  },
};
</script>

<style scoped>
@import "../../assets/css/input.css";

.btn:focus {
  outline: none;
  box-shadow: none;
}
.box {
  background-color: #ffffff;
  border: 0.01rem solid #940b01;
  overflow: hidden;
  padding: 1.5rem 0.5rem;
  margin-top: 0.5rem;
}
.btnDefault {
  width: 10rem;
  background-color: #fff;
  color: rgb(0, 0, 0);
  border: 0.01rem solid #c5604e;
}
.btnDefault:hover {
  color: #ffffff;
  background-color: #c5604e;
}
.btnDefault:disabled {
  background: rgb(170, 167, 167);
}
.line {
  text-decoration: underline;
}
.btnOk {
  width: 7rem;
  height: 2rem;
  background-color: #c5604e;
  color: white;
  border: none;
}
.btnOk:hover {
  color: #ffffff;
  background-color: #d7897d;
}
.img {
  width: 1.3rem;
  height: 1.3rem;
  cursor: pointer;
}
.btnReset {
  width: 7rem;
  height: 2rem;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: 0.01rem solid #c5604e;
}
.btnReset:hover {
  color: #ffffff;
  background-color: #d7897d;
}
p {
  font-size: 0.9rem;
  margin: 0;
  padding: 0;
}
.defaultAdd {
  background: #38c970;
  color: #ffffff;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
}
span.text-danger {
  font-size: 0.9rem;
}
</style>
