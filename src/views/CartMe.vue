<template>
  <div>
    <Topic />
    <div class="col-10 mx-auto">
      <div
        v-if="cartList[0] == null"
        class="
          mt-3
          p-5
          bg-white
          d-flex
          flex-column
          justify-content-center
          align-items-center
          boxnone
        "
      >
        <img src="../assets/icon/cartBank.png" alt="" width="150px" />
        <h5 class="mt-3">ไม่พบสินค้าในตะกร้า...</h5>
        <router-link to="/" class="mt-3">
          <button class="btnCart rounded-pill">ช้อปปิ้งกันเลย</button>
        </router-link>
      </div>

      <div v-if="cartList[0]" class="row mt-4 position-relative">
        <div class="col-8">
          <CartList :data="cartList" @updateCart="getCart" />
        </div>
        <div class="col-3 ms-auto">
          <OrderCart
            :data="totalCart"
            :cartList="cartList"
            @updateCart="getCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topic from "../components/cart/Topic";
import CartList from "../components/cart/CartList";
import OrderCart from "../components/cart/OrderCart";
import axios from "axios";
export default {
  name: "CartMe",
  components: {
    Topic,
    CartList,
    OrderCart,
  },

  data() {
    return {
      cartList: [],
      id_member: this.$session.get("id_member"),
      totalCart: 0,
    };
  },

  methods: {
    getCart() {
      axios
        .post(`${this.$URL}/User/cart.php`, {
          action: "getCart",
          id_member: this.id_member,
        })
        .then((res) => {
          this.cartList = res.data;
          this.sumTotal();
        });
    },
    sumTotal() {
      var sum = 0;
      this.cartList.forEach((item) => {
        sum += item.productPrice * item.Total;
      });
      return (this.totalCart = sum);
    },
  },
  created() {
    this.getCart();
    document.title = "Pepensuda Shop Cart";
  },
};
</script>

<style scoped>
.btnCart {
  background-color: #c5604e;
  font-size: 1.2rem;
  color: white;
  padding: 0.5rem 1.3rem;
  border-radius: 1.1rem;
}
.btnCart:hover {
  background-color: #e8a89c;
  color: white;
}
.boxnone {
  min-height: 60vh;
  border-radius: 1.1rem;
}
</style>
