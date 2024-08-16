<template>
  <div>
    <div
      class="
        row
        bg-white
        border
        p-3
        boxraduis
        position-relative
        w-100
        h-100
        boxAddress
      "
    >
      <div class="d-flex align-items-center mb-2">
        <img
          src="../../assets/icon/address.png"
          alt=""
          class="iconHeader me-3"
        />
        <h5>ที่อยู่ในการจัดส่ง</h5>
      </div>
      <hr />

      <div class="h-100 w-100" v-for="(item, index) in data" :key="index">
        <div v-if="index == 0">
          <p class="m-0 p-0">ชื่อ {{ item.name }}</p>
          <p class="m-0 p-0">เบอร์โทร {{ item.phone }}</p>
          <p class="m-0 p-0">ที่อยู่ {{ item.address }}</p>
          <p class="m-0 p-0">
            ต.{{ item.TambonName }} อ.{{ item.DistrictName }}
          </p>
          <p class="m-0 p-0">จ.{{ item.ProvinceThai }} {{ item.zipcode }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressOrder",
  props: {
    data: Array,
  },
  data() {
    return {
      test: "ne",
    };
  },
  created() {
    this.test = this.data;
  },
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
