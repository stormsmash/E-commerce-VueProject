<template>
  <div class="boxraduis mt-3">
    <div>
      <div class="row mt-1 p-2">
        <h4>ข้อมูลของฉัน</h4>
        <h6 class="mb-3">
          จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
        </h6>
        <hr />
        <div class="row">
          <div class="col-8 boxData">
            <div class="boxInput">
              <div class="input-group row">
                <div class="col-3">
                  <span class="input-group-text">ชื่อ</span>
                </div>
                <div class="col-9">
                  <div class="group col-6 m-0 p-0">
                    <input
                      type="text"
                      name="name"
                      class="m-0 p-0"
                      v-model="name"
                    />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                  </div>
                </div>
              </div>

              <div class="input-group row">
                <div class="col-3">
                  <span class="input-group-text">สกุล</span>
                </div>
                <div class="col-9">
                  <div class="group col-6 m-0 p-0">
                    <input
                      type="text"
                      name="name"
                      class="m-0 p-0"
                      v-model="last"
                    />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                  </div>
                </div>
              </div>
              <div class="input-group row">
                <div class="col-3">
                  <span class="input-group-text">E-Mail</span>
                </div>
                <div class="col-9">
                  <div class="group col-6 m-0 p-0">
                    <input
                      type="text"
                      name="name"
                      class="m-0 p-0"
                      v-model="email"
                      readonly
                    />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                  </div>
                </div>
              </div>
              <div class="input-group row">
                <div class="col-3">
                  <span class="input-group-text">หมายเลขโทรศัพท์</span>
                </div>
                <div class="col-9">
                  <div class="group col-6 m-0 p-0">
                    <input
                      type="text"
                      name="name"
                      class="m-0 p-0"
                      v-model="phone"
                    />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                  </div>
                </div>
              </div>
              <div class="input-group row d-flex align-items-center">
                <div class="col-3">
                  <span class="input-group-text">เพศ</span>
                </div>
                <div class="col-9">
                  <div class="p-1">
                    <div class="form-check form-check-inline ml-auto">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="1"
                        v-model="gender"
                      />
                      <label class="form-check-label" for="inlineRadio1"
                        >ชาย</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="2"
                        v-model="gender"
                      />
                      <label class="form-check-label" for="inlineRadio2"
                        >หญิง</label
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-group row">
                <div class="col-3">
                  <span class="input-group-text">วัน/เดือน/ปี เกิด </span>
                </div>
                <div class="col-9">
                  <Date @getDay="getDay" :day="birthday" />
                </div>
              </div>
              <div class="col-9 ms-auto">
                <button class="btn mt-4 rounded-pill" @click="submit">
                  บันทึก
                </button>
              </div>
            </div>
          </div>

          <div class="col-4 text-center">
            <form ref="formImg">
              <div class="BoximgProfile mx-auto">
                <img :src="url" alt="" class="rounded-circle" />
              </div>

              <div class="text-center mt-2">
                <label for="file-upload" class="custom-file-upload">
                  <i class="fas fa-image"></i> เลือกรูป
                </label>
                <input
                  id="file-upload"
                  name="img"
                  ref="img"
                  type="file"
                  accept="image/*"
                  @change="onFileChange"
                />
                <p class="mt-2">ไฟล์ที่รองรับ: .JPEG, .PNG</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Date from "./Date.vue";
import axios from "axios";
export default {
  name: "ProfileMe",
  components: { Date },
  data() {
    return {
      id_member: this.$session.get("id_member"),
      name: "",
      last: "",
      email: this.$session.get("email"),
      phone: "",
      gender: "",
      birthday: "",
      url: "",
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      const typeImg = "|jpg|png|jpeg";
      const type = file.type.split("/");
      if (file && typeImg.indexOf(type[1]) !== -1) {
        this.url = URL.createObjectURL(file);
        console.log("Success");
        console.log(this.$refs.img.value);
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
          this.$refs.img.value = null;
          this.getData();
        });
      }
    },

    getDay(date) {
      this.birthday = date;
    },
    submit() {
      axios
        .post(`${this.$URL}/User/member.php`, {
          action: "update",
          id_member: this.id_member,
          firstname: this.name,
          lastname: this.last,
          phone: this.phone,
          gender: this.gender,
          birthday: this.birthday,
        })
        .then(() => {
          this.$swal({
            position: "center",
            icon: "success",
            title: "อัปเดตข้อมูลสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      this.uploadImg();
    },
    getData() {
      axios
        .post(`${this.$URL}/User/member.php`, {
          action: "getData",
          id_member: this.id_member,
        })
        .then((res) => {
          this.name = res.data.firstname;
          this.last = res.data.lastname;
          this.phone = res.data.phone;
          this.gender = res.data.gender;
          this.birthday = res.data.birthday;
          this.url = `${this.$URL}/img/${res.data.img}`;
          this.$emit("getImg", `${this.$URL}/img/${res.data.img}`);
          if (
            this.url == `${this.$URL}/img/undefined` ||
            this.url == `${this.$URL}/img/null`
          ) {
            this.url = `${this.$URL}/img/preview.png`;
          }
          this.$root.$emit("getImg");
        });
    },
    uploadImg() {
      const fromData = new FormData(this.$refs["formImg"]);
      for (let key in fromData.entries()) {
        fromData.append(key, fromData[key]);
      }
      fromData.append("id_member", this.$session.get("id_member"));
      fromData.append("action", "uploadImg");

      axios
        .post(`${this.$URL}/User/member.php`, fromData)
        .then(() => {
          this.getData();
          this.$refs.img.value = null;
        })
        .then(() => {
          this.$root.$emit("setProfile");
        });
    },
  },
  mounted() {
    this.getData();
    this.$root.$emit("setProfile");
    this.$root.$emit("Profile");
    document.title = "Pepensuda Shop Profile";
  },
};
</script>

<style scoped>
@import "../../assets/css/input.css";
.box {
  background-color: #ffffff;
  border: 0.01rem solid #940b01;
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 1.3rem 0.5rem;
  margin-top: 0.5rem;
}
.input-group-text {
  background: none;
  border: none;
}
.input-group {
  margin-top: 0.4rem;
}
.boxInput {
  width: 43rem;
}
span {
  font-size: 1.1rem;
}
.boxImg {
  width: 20rem;
  height: 20rem;
  margin: 0 auto;
}
.boxImg img {
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  border: 0.01rem solid black;
  object-fit: cover;
}

input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
}
p {
  font-size: 0.9rem;
}
input[type="radio"]:checked {
  border: none;
  background-color: red;
}
button {
  width: 10rem;
  background-color: #c5604e;
  color: white;
}
button:hover {
  color: #ffffff;
  background-color: #efb1a2;
}
.BoximgProfile {
  width: 10rem;
  height: 10rem;
}
.BoximgProfile img {
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  display: block;
  object-fit: cover;
  object-position: center;
}
.boxData {
  border-right: 0.01rem solid #ccc;
}
</style>
