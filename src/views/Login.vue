<template>
  <div>
    <div class="container min-vh-100">
      <div class="row my-md-5">
        <div class="col-md-5">
          <LoginPage />
        </div>

        <div
          class="col-md-2 d-md-flex align-items-center justify-content-center"
        >
          <div class="boxline"></div>
        </div>
        <div class="col-md-5">
          <RegisterPage />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginPage from "../components/login/LoginPage";
import RegisterPage from "../components/login/RegisterPage.vue";
export default {
  name: "Login",
  components: {
    LoginPage,
    RegisterPage,
  },
  created() {
    document.title = "Pepensuda Shop Login";
  },
};
</script>

<style scoped>
.boxline {
  height: 70vh;
  width: 0.5rem;
  border-right: 0.01rem solid #940b03;
}
</style>
