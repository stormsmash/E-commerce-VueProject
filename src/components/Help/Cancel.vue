<template>
  <div class="boxraduis mt-3">
    <div>
      <div class="textH">ฉันจะยกเลิกสินค้า ร้าน Pepensuda Shop ต้องทำอย่างไร?</div>
      <div class="textSub">
        1. การยกเลิกสินค้าใน ร้าน Pepensuda Shop
        ในแต่ละขั้นตอนจะนำท่านไปสู่การยกเลิกสินค้าที่สำเร็จได้
      </div>
      <div class="boxImg">
        <img src="../../assets/help/cancel/cancel1.png" alt="" />
      </div>
      <div class="textSub">
        2. ไปที่เมนู การสั่งซื้อของฉัน > ที่ต้องชำระ
        จะมีสินค้าของท่านที่ค้างชำระอยู่ ให้ท่านทำการกดปุ่ม ยกเลิก
      </div>
      <div class="boxImg">
        <img src="../../assets/help/cancel/cancel2.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cancel",

  created() {
    this.$root.$emit("Cancel");
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
