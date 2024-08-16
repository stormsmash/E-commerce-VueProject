<template>
  <div class="row d-flex justify-content-end">
    <div class="col-md-10">
      <h2 class="text-center mt-4">ลงชื่อเข้าใช้</h2>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="exampleInputEmail1">อีเมล</label>
          <input
            type="email"
            class="form-control"
            :class="{ 'form-control is-invalid': $v.login.email.$error }"
            v-model.trim="$v.login.email.$model"
          />
          <span class="text-danger" v-if="$v.login.email.$error"
            >กรุณากรอกอีเมล
          </span>
          <span class="text-danger" v-if="!$v.login.email.minLength">
            {{ $v.login.email.$params.minLength.min }} ตัวอักษรขึ้นไป
          </span>
          <span class="text-danger" v-if="!$v.login.email.email"
            >ให้ถูกต้อง</span
          >
        </div>
        <div class="form-group mt-2">
          <label for="exampleInputPassword1">รหัสผ่าน</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'form-control is-invalid': $v.login.password.$error }"
            v-model.trim="$v.login.password.$model"
          />
          <span class="text-danger" v-if="$v.login.password.$error"
            >กรุณากรอกรหัสผ่าน
          </span>
          <span class="text-danger" v-if="!$v.login.password.minLength">
            {{ $v.login.password.$params.minLength.min }} ตัวอักษรขึ้นไป
          </span>
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="btn btn-lg form-control mt-3 btnOk w-100"
          >
            ลงชื่อเข้าใช้
          </button>
        </div>
      </form>

      <div class="row d-flex align-items-center mt-2">
        <div class="col-20"><hr /></div>

      </div>

      <LoginFacebook />
      <LoginGoogle />
      <div class="mt-3 text-center">
        <button
          @click="resetFrom"
          class="btnForgerpass rounded-pill"
          v-b-modal.modal-add
        >
          ลืมรหัสผ่าน <i class="fas fa-key"></i>
        </button>
        <!-- Modal Add -->
        <b-modal
          id="modal-add"
          ref="my-modal-add"
          hide-footer
          centered
          title="ลืมรหัสผ่าน"
          size="lg"
        >
          <h6>กรุณากรอกอีเมล์ที่สมัครในระบบ</h6>
          <form @submit.prevent="submitPassword" class="p-2">
            <div class="row mt-2">
              <div class="form-group">
                <label>อีเมล</label>
                <input
                  type="email"
                  class="form-control"
                  :class="{
                    'form-control is-invalid': $v.reset.emailpass.$error,
                  }"
                  v-model="$v.reset.emailpass.$model"
                />
                <span class="text-danger" v-if="$v.reset.emailpass.$error"
                  >กรุณากรอกอีเมล
                </span>
                <span class="text-danger" v-if="!$v.reset.emailpass.minLength">
                  {{ $v.reset.emailpass.$params.minLength.min }} ตัวอักษรขึ้นไป
                </span>
                <span class="text-danger" v-if="!$v.reset.emailpass.email"
                  >ให้ถูกต้อง</span
                >
              </div>
            </div>

            <div class="footer d-flex justify-content-end mt-5">
              <button
                type="reset"
                class="btn-outline-light btnReset me-2 rounded-pill"
                @click="hideModal()"
              >
                ยกเลิก
              </button>
              <button type="submit" class="btnOk rounded-pill">ยืนยัน</button>
            </div>
          </form>
        </b-modal>
        <!-- Modal Add -->
      </div>
    </div>
  </div>
</template>

<script>

import { required, minLength, email } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "LoginPage",
  components: {
  
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      reset: {
        emailpass: "",
      },
    };
  },

  validations: {
    login: {
      email: { required, minLength: minLength(6), email },
      password: { required, minLength: minLength(6) },
    },
    reset: {
      emailpass: { required, minLength: minLength(6), email },
    },
  },

  methods: {
    submit() {
      this.$v.login.$touch();
      if (this.$v.login.$invalid) {
        console.log("Error");
      } else {
        axios
          .post(`${this.$URL}/User/login.php`, {
            email: this.login.email,
            pass: this.login.password,
          })
          .then((res) => {
            if (res.data.status == "SuccessLogin") {
              this.$session.start();
              this.$session.set("email", res.data.email);
              this.$session.set("id_member", res.data.id_member);
              this.$root.$emit("loginPage");
              this.$router.push("/");
              this.resetData();
            } else if (res.data == "ban") {
              this.password = "";
              this.$swal({
                icon: "error",
                title: "เข้าสู่ระบบไม่สำเร็จ!",
                text: "บัญชีผู้ใช่ถูกระงับการใช้งาน กรุณาติดต่อเจ้าหน้าที่",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#7367F0",
              });
            } else {
              this.password = "";
              this.$swal({
                icon: "error",
                title: "เข้าสู่ระบบไม่สำเร็จ!",
                text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#7367F0",
              });
            }
          });
      }
    },
    resetData() {
      this.login.email = "";
      this.login.password = "";
    },
    resetFrom() {
      this.reset.emailpass = "";
    },
    submitPassword() {
      this.$v.reset.$touch();
      if (this.$v.reset.$invalid) {
        console.log("Error");
      } else {
        axios
          .post(`${this.$URL}/User/member.php`, {
            action: "ForgotPass",
            email: this.reset.emailpass,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data == "Success") {
              this.$swal({
                icon: "success",
                title: "สำเร็จ",
                text: `กรุณายืนยันการตั้งรหัสผ่านที่ ${this.reset.emailpass}`,
                showCancelButton: false,
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#54b13c",
              }).then(() => {
                this.hideModal();
              });
            } else if (res.data == "Error") {
              this.$swal({
                icon: "error",
                title: "ผิดผลาด",
                text: `ไม่พบ E-mail ในระบบกรุณาตรวจสอบ`,
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
    hideModal() {
      this.$refs["my-modal-add"].hide();
      this.$v.emailCheck.$reset();
      this.resetFrom();
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
