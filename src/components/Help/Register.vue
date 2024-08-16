<template>
  <div class="boxraduis mt-3">
    <div>
      <div class="textH">
        ฉันจะสมัครสมาชิกอย่างไร ต้องทำอย่างไร การสมัครสมาชิกใน ร้าน Pepensuda Shop
        ง่ายกว่าที่คุณคิด เพียงคุณคลิก
      </div>
      <div class="textSub">
        1. เข้าสู่เว็บไซต์ ร้าน Pepensuda Shop คลิกปุ่มเข้าสู่ระบบ
      </div>
      <div class="boxImg">
        <img src="../../assets/help/register/register1.png" alt="" />
      </div>
      <div class="textSub">
        2. กรอกรายละเอียด อีเมล์ รหัสผ่าน (โดยอีเมล์ และ
        รหัสผ่านจะเป็นข้อมูลที่ใช้เข้าสู่ระบบในครั้งถัดไป) และยืนยันรหัสผ่าน
        <br />
        เมื่อกรอกข้อมูลครบทำการลงทะเบียน
      </div>
      <div class="boxImg">
        <img src="../../assets/help/register/register2.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  created() {
    this.$root.$emit("Register");
  },
};
</script>

<style scoped>
.boxH {
  margin-left: 5rem;
  margin-top: 2rem;
}
.textH {
  font-size: 1.2rem;
  font-weight: 700;
}
.textSub {
  margin-left: 10rem;
  margin-top: 1.5rem;
}
.boxImg {
  width: 50rem;
  height: 25rem;
  margin: 0 auto;
}
.boxImg img {
  width: 100%;
  height: 100%;
}
</style>
