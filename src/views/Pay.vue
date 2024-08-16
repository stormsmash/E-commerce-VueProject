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
          <div class="d-flex justify-content-between">
            <AddressOrder class="mb-2 col-6" :data="cartList" />
            <DeliveryOrder class="mb-2 col-6" />
          </div>
          <OrderList :data="cartList" />
        </div>
        <div class="col-4 ms-auto">
          <div class="boxfixed">
            <OrderCart :data="cartList" />
            <PayBank :data="cartList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topic from "../components/pay/Topic";
import OrderList from "../components/pay/OrderList";
import OrderCart from "../components/pay/OrderCart";
import AddressOrder from "../components/pay/AddressOrder";
import DeliveryOrder from "../components/pay/DeliveryOrder";
import PayBank from "../components/pay/PayBank";
import axios from "axios";
export default {
  name: "Pay",
  components: {
    Topic,
    OrderList,
    OrderCart,
    AddressOrder,
    DeliveryOrder,
    PayBank,
  },

  data() {
    return {
      cartList: [],
      id_member: this.$session.get("id_member"),
      id_order: this.$route.params.id,
      totalCart: 0,
      id_Address: "test",
    };
  },

  methods: {
    getPay() {
      axios
        .post(`${this.$URL}/User/pay.php`, {
          action: "getPay",
          id_member: this.id_member,
          id_order: this.id_order,
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
    this.getPay();
    document.title = "Pepensuda Shop Pay";
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
