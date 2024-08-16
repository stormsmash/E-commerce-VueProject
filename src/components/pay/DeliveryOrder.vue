<template>
  <div>
    <div
      class="
        row
        bg-white
        border
        p-3
        ms-3
        boxraduis
        position-relative
        w-100
        h-100
        boxAddress
      "
    >
      <div class="d-flex align-items-center mb-2">
        <img
          src="../../assets/icon/box_address.png"
          alt=""
          class="iconHeader me-3"
        />
        <h5>ตัวเลือกการจัดส่ง</h5>
      </div>
      <hr />
      <div class="h-100 w-100">Kerry Express Thailand เคอรี่ เอ็กซ์เพรส</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeliveryOrder",
};
</script>

<style scoped>
.iconHeader {
  width: 2.8rem;
  height: 2.8rem;
  padding: 0;
  margin: 0;
}
.boxAddress {
  min-height: 12.5rem;
}
</style>
