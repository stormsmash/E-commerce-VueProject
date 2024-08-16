<template>
  <div class="mt-5 p-4 boxdetail boxraduis">
    <h1>รายละเอียด</h1>
    <div v-html="data[0].productInfo"></div>
  </div>
</template>

<script>
export default {
  name: "DetailProduct",

  props: {
    data: Array,
  },
};
</script>

<style scoped>
.boxdetail {
  border: 0.02rem solid #c5604e;
}
</style>
