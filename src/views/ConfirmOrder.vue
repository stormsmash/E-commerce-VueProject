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

      <div v-if="cartList[0]" class="row mt-4">
        <div class="col-8">
          <OrderList :data="cartList" @updateCart="getCart" />
        </div>
        <div class="col-4 ms-auto">
          <div class="boxfixed">
            <AddressOrder class="mb-2" @getAddress="sendAddress" />
            <DeliveryOrder class="mb-2" />
            <OrderCart
              :data="totalCart"
              :cartList="cartList"
              :id_address="id_Address"
              @updateCart="getCart"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topic from "../components/confirmOrder/Topic";
import OrderList from "../components/confirmOrder/OrderList";
import OrderCart from "../components/confirmOrder/OrderCart";
import AddressOrder from "../components/confirmOrder/AddressOrder";
import DeliveryOrder from "../components/confirmOrder/DeliveryOrder";
import axios from "axios";
export default {
  name: "ConfirmOrder",
  components: {
    Topic,
    OrderList,
    OrderCart,
    AddressOrder,
    DeliveryOrder,
  },

  data() {
    return {
      cartList: [],
      id_member: this.$session.get("id_member"),
      totalCart: 0,
      id_Address: 0,
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

    sendAddress(id_address) {
      this.id_Address = id_address;
    },
  },
  created() {
    this.getCart();
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
