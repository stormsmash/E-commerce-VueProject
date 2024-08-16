<template>
  <div class="">
    <div class="row bg-white py-3 border boxraduis">
      <div class="col-6 d-flex align-items-center justify-content-start">
        <h2 class="p-0 m-0">รายการสินค้า</h2>
      </div>
      <div class="col-2 text-center boxMenu">ราคา</div>
      <div class="col-2 text-center boxMenu">จำนวน</div>
      <div class="col-2 text-center boxMenu">ยอดรวมสินค้า</div>
    </div>
    <div
      v-for="(item, index) in data"
      :key="index"
      class="row bg-white my-1 border py-2 boxraduis"
    >
      <div class="col-6 d-flex align-items-center">
        <div>
          <img
            :src="`${$URL}/imgProduct/${item.img_product}`"
            alt=""
            width="100px"
          />
        </div>
        <div>
          <p class="ps-3">
            {{ item.productName }}
          </p>
        </div>
      </div>
      <div
        class="
          col-2
          text-center
          d-flex
          justify-content-center
          align-items-center
        "
      >
        &#3647; {{ item.productPrice | numFormat }}
      </div>
      <div class="col-2 d-flex justify-content-center align-items-center">
        <div class="row">
          <div class="boxnum d-flex align-items-center">
            <input
              type="number"
              :value="item.qty"
              :ref="`input_${index}`"
              readonly
            />
            <input
              type="hidden"
              :value="item.id_product"
              :ref="`id_${index}`"
            />
            <input
              type="hidden"
              :value="item.id_cart"
              :ref="`idCart_${index}`"
            />
          </div>
        </div>
      </div>
      <div
        class="
          col-2
          position-relative
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <p class="text-center p-0 m-0">
          &#3647;
          <animated-number
            :value="item.productPrice * item.qty"
            :formatValue="formatToPrice"
            :duration="500"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
export default {
  name: "OrderList",
  props: {
    data: Array,
  },
  components: {
    AnimatedNumber,
  },

  data() {
    return {
      id_member: this.$session.get("id_member"),
    };
  },
  methods: {
    formatToPrice(value) {
      var num1 = `${value.toFixed()}`;
      var number = new Intl.NumberFormat().format(num1);
      return number;
    },
  },
};
</script>

<style scoped>
button {
  background: none;
  border: none;
  border: 0.01rem solid #c5604e;
  background-color: #c5604e;
}
button:focus,
button:active {
  outline: none;
  box-shadow: none;
}
.boxnum {
  border: none;
}
.boxnum button {
  width: 2rem;
  height: 2rem;
  color: rgb(255, 255, 255);
  /* border-radius: 5px; */
}
.boxnum input {
  width: 4rem;
  height: 2rem;
  text-align: center;
  font-size: 1.2rem;
  border: none;
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
  font-size: 1.1rem;
  color: #c5604e;
  position: absolute;
  right: 0;
  bottom: -1.1rem;
  padding-right: 1.1rem;
  cursor: pointer;
}
.boxMenu {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
}
.checkProduct {
  filter: grayscale(100%);
  opacity: 0.5;
}
.btnCart {
  background-color: #c5604e;
  border: none;
  font-size: 1.1rem;
  color: white;
  padding: 0.01rem 0.5rem;
  margin-left: 1rem;
  width: 5rem;
  height: 2rem;
  border-radius: 1.1rem;
}
</style>
