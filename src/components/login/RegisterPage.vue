<template>
  <div class="row d-flex">
    <div class="col-md-10">
      <h2 class="text-center mt-4">สมัครสมาชิก</h2>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="exampleInputEmail1">อีเมล</label>
          <input
            type="email"
            class="form-control"
            :class="{
              'form-control is-invalid': $v.email.$error,
              'form-control is-invalid': checkEmail,
            }"
            v-model="$v.email.$model"
            @input="checkUser"
          />
          <span class="text-danger" v-if="$v.email.$error"
            >กรุณากรอกอีเมล
          </span>
          <span class="text-danger" v-if="!$v.email.minLength">
            {{ $v.email.$params.minLength.min }} ตัวอักษรขึ้นไป
          </span>
          <span class="text-danger" v-if="!$v.email.email">ให้ถูกต้อง</span>
          <span class="text-danger" v-if="checkEmail"
            >**อีเมล์นี้มีผู้ใช้แล้ว**</span
          >
        </div>
        <div class="form-group mt-2">
          <label for="exampleInputPassword1">รหัสผ่าน</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'form-control is-invalid': $v.password1.$error }"
            v-model.trim="$v.password1.$model"
          />
        </div>
        <span class="text-danger" v-if="$v.password1.$error"
          >กรุณากรอกรหัสผ่าน
        </span>
        <span class="text-danger" v-if="!$v.password1.minLength">
          {{ $v.password1.$params.minLength.min }} ตัวอักษรขึ้นไป
        </span>
        <div class="form-group mt-2">
          <label for="exampleInputPassword1">ยืนยันรหัสผ่าน</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'form-control is-invalid': $v.password2.$error }"
            v-model.trim="$v.password2.$model"
          />
          <span class="text-danger" v-if="$v.password2.$error"
            >กรุณากรอกรหัสผ่าน
          </span>
          <span class="text-danger" v-if="!$v.password2.minLength">
            {{ $v.password2.$params.minLength.min }} ตัวอักษรขึ้นไป
          </span>
          <span class="text-danger" v-if="!$v.password2.sameAsPassword"
            >รหัสผ่านไม่ตรงกัน</span
          >
        </div>
        <div class="text-center">
          <button type="submit" class="btn btnOk btn-lg w-100 mt-3">
            ลงทะเบียน
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password1: "",
      password2: "",
      checkEmail: false,
    };
  },

  validations: {
    email: {
      required,
      minLength: minLength(6),
      email,
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
      if (this.$v.$invalid || this.checkEmail) {
        console.log("Error");
      } else {
        console.log("success");
        axios
          .post(`${this.$URL}/User/register.php`, {
            action: "Register",
            email: this.email,
            pass: this.password2,
          })
          .then((response) => {
            if (response.status === 200) {
              this.$session.start();
              this.$session.set("email", response.data.email);
              this.$session.set("id_member", response.data.id_member);
              this.$root.$emit("loginPage");
              this.$router.push("/");
              this.resetData();
            }
          });
      }
    },

    checkUser() {
      axios
        .post(`${this.$URL}/User/register.php`, {
          action: "CheckUser",
          email: this.email,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data == "Error") {
            this.checkEmail = true;
          } else {
            this.checkEmail = false;
          }
        });
    },

    resetData() {
      this.email = "";
      this.password1 = "";
      this.password2 = "";
    },
  },
};
</script>

<style scoped>
input {
  border: 0.01rem solid #940b01;
  height: 3rem;
}
input:focus {
  outline: none;
  box-shadow: none;
  border: 0.01rem solid #003cff;
}

.btnOk {
  width: 8rem;
  height: 2.7rem;
  background-color: #c5604e;
  color: white;
  border: none;
}
.btnOk:hover {
  color: #ffffff;
  background-color: #d7897d;
}
.btnReset {
  width: 8rem;
  height: 2.7rem;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: 0.01rem solid #c5604e;
}
.btnReset:hover {
  color: #ffffff;
  background-color: #d7897d;
}
.btnForgerpass {
  transition: 0.3s ease;
}
.btnForgerpass:hover {
  color: #c5604e;
}
</style>
