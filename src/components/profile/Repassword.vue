<template>
  <div class="boxraduis mt-3">
    <div class="row p-3">
      <div class="col-md-6">
        <h4>เปลี่ยนรหัสผ่าน</h4>
        <form @submit.prevent="submit">
          <div class="group mt-3">
            <input
              type="password"
              name="password"
              :class="{
                checkInput: password,
              }"
              v-model="$v.password.$model"
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>รหัสผ่านปัจจุบัน</label>
            <span class="text-danger" v-if="$v.password.$error"
              >รหัสผ่านปัจจุบัน</span
            >
            <span class="text-danger" v-if="!$v.password.minLength">
              {{ $v.password.$params.minLength.min }} ตัวอักษรขึ้นไป
            </span>
          </div>
          <div class="group mt-3">
            <input
              type="password"
              name="password1"
              :class="{
                checkInput: password1,
              }"
              v-model="$v.password1.$model"
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>รหัสผ่านใหม่</label>
            <span class="text-danger" v-if="$v.password1.$error"
              >รหัสผ่านใหม่</span
            >
            <span class="text-danger" v-if="!$v.password1.minLength">
              {{ $v.password1.$params.minLength.min }} ตัวอักษรขึ้นไป
            </span>
          </div>
          <div class="group mt-3">
            <input
              type="password"
              name="password2"
              :class="{
                checkInput: password2,
              }"
              v-model="$v.password2.$model"
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>ยืนยันรหัสผ่านใหม่</label>
            <span class="text-danger" v-if="$v.password2.$error"
              >ยืนยันรหัสผ่านใหม่</span
            >
            <span class="text-danger" v-if="!$v.password2.minLength">
              {{ $v.password2.$params.minLength.min }} ตัวอักษรขึ้นไป
            </span>
            <span class="text-danger" v-if="!$v.password2.sameAsPassword"
              >รหัสผ่านไม่ตรงกัน</span
            >
          </div>
          <button type="submit" class="btn btnDefault rounded-pill">
            ตกลง
          </button>
        </form>
      </div>
      <div class="col-md-6 d-flex align-items-center justify-content-center">
        <img src="../../assets/icon/privacy.png" alt="" class="imgPassword" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Repassword",

  data() {
    return {
      password: "",
      password1: "",
      password2: "",
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    password1: {
      required,
      minLength: minLength(6),
    },
    password2: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs("password1"),
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error");
      } else {
        axios
          .post(`${this.$URL}/User/member.php`, {
            action: "Repassword",
            id_user: this.$session.get("id_member"),
            password: this.password,
            password1: this.password1,
          })
          .then((res) => {
            if (res.data == "Success") {
              this.$swal({
                position: "center",
                icon: "success",
                title: "อัปเดตข้อมูลสำเร็จ",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.logOut();
              });
            } else {
              this.$swal({
                icon: "error",
                title: "รหัสผ่านไม่ถูกต้อง",
                showCancelButton: false,
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#EB4247",
              }).then(() => {
                this.resetData();
              });
            }
          });
      }
    },
    logOut() {
      this.$session.destroy();
      this.$root.$emit("loginPage");
      this.$root.$emit("logoutPage");
      this.$router.push("/Login");
    },
    resetData() {
      this.password = null;
      this.password1 = null;
      this.password2 = null;
      this.$v.$reset();
    },
  },
  created() {
    this.$root.$emit("Repassword");
    document.title = "Pepensuda Shop Profile";
  },
};
</script>

<style scoped>
@import "../../assets/css/input.css";
.btnDefault {
  width: 7rem;
  background-color: #c5604e;
  color: white;
}
.btnDefault:hover {
  color: #ffffff;
  background-color: #efb1a2;
}
.imgPassword {
  width: 10rem;
}
</style>
