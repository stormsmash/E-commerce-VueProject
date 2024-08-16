<template>
  <div class="">
    <button @click="print(data[0].id_order)" class="btn btn-dark ms-auto">
      พิมพ์ใบเสร็จ
    </button>

    <div :id="data[0].id_order" class="product px-1 d-none">
      <div class="row border-bottom pb-3">
        <div class="text-center">
          <h3 class="p-0 m-0">Pepensuda Shop</h3>
          <p class="p-0 m-0">ใบเสร็จรับเงิน</p>
          <p class="p-0 m-0">เลขที่ใบสั่งซื้อ #{{ data[0].id_order }}</p>
        </div>
      </div>
      <div class="row bg-white">
        <div class="col-6 d-flex align-items-center justify-content-start">
          <h2 class="p-0 m-0 boxMenu">รายการสินค้า</h2>
        </div>
        <div class="col-2 text-end boxMenu">ราคา</div>
        <div class="col-2 text-end boxMenu">จำนวน</div>
        <div class="col-2 text-end boxMenu text-nowrap">ยอดรวมสินค้า</div>
      </div>
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="row bg-white my-1"
      >
        <div class="col-6 d-flex">
          <p class="p-0 m-0">
            {{ item.productName }}
          </p>
        </div>
        <div class="col-2 text-end">
          {{ item.productPrice | numFormat }}
        </div>
        <div class="col-2 d-flex justify-content-center">
          <div class="row">
            <div class="boxnum d-flex">
              {{ item.qty }}
            </div>
          </div>
        </div>
        <div class="col-2 position-relative d-flex justify-content-end">
          <p class="text-end p-0 m-0 px-3">
            <animated-number
              :value="item.productPrice * item.qty"
              :formatValue="formatToPrice"
              :duration="500"
            />
          </p>
        </div>
      </div>
      <div class="row">
        <p class="col-12 text-end px-3 p-0 m-0">
          ค่าจัดส่ง {{ data[0].deliverPrice | numFormat }} บาท
        </p>
        <p class="col-12 text-end px-3 p-0 m-0">
          สินค้า {{ data[0].total | numFormat }} บาท
        </p>
        <p class="col-12 text-end px-3 p-0 m-0">
          รวมทั้งหมด
          {{ (data[0].total + data[0].deliverPrice) | numFormat }} บาท
        </p>
      </div>
      <div class="text-center border-top py-3">
        <p class="p-0 m-0">IT 25-26 ชั้นที่ 3 ศูนย์การค้าแฟชั่นไอซ์แลนด์</p>
        <p class="p-0 m-0">ถนนรามอินทรา แขวงคันนายาว เขตคันนายาว</p>
        <p class="p-0 m-0">กรุงเทพมหานคร 10230</p>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
export default {
  name: "Print",
  props: {
    data: Array,
    dataList: Array,
  },
  components: {
    AnimatedNumber,
  },

  methods: {
    formatToPrice(value) {
      var num1 = `${value.toFixed()}`;
      var number = new Intl.NumberFormat().format(num1);
      return number;
    },
    async print(id) {
      await this.$htmlToPaper(`${id}`);
    },
  },
};
</script>

<style scoped>
button:focus,
button:active {
  outline: none;
  box-shadow: none;
}
.boxnum {
  border: none;
}
.boxnum button {
  width: 30px;
  height: 30px;
  color: rgb(255, 255, 255);
  /* border-radius: 5px; */
}
.boxnum input {
  width: 80px;
  height: 30px;
  text-align: center;
  font-size: 20px;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  border-radius: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.btnDelete {
  font-size: 20px;
  color: #c5604e;
  position: absolute;
  right: 0;
  bottom: -20px;
  padding-right: 20px;
}
.boxMenu {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
}
</style>
