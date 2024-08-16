<template>
  <div class="boxfixed">
    <div class="row bg-white border p-3 ms-3 boxraduis">
      <h2>สรุปใบสั่งซื้อ</h2>

      <div class="d-flex justify-content-between align-items-center">
        <h4 class="p-0 m-0">ยอดรวมสินค้า</h4>
        <div class="text-price p-0 m-0">
          &#3647;
          <animated-number
            :value="data"
            :formatValue="formatToPrice"
            :duration="500"
            class="text-price p-0 m-0"
          />
        </div>
      </div>
      <button @click="checkProduct" class="btnCart rounded-pill mx-auto mt-5">
        ดำเนินการสั่งซื้อสินค้า
      </button>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import axios from "axios";
export default {
  name: "OrderCart",
  props: {
    data: Number,
    cartList: Array,
  },
  components: {
    AnimatedNumber,
  },

  data() {
    return {
      id_user: this.$session.get("id_member"),
    };
  },

  methods: {
    checkProduct() {
      axios
        .post(`${this.$URL}/User/cart.php`, {
          action: "checkProduct",
          id_user: this.id_user,
        })
        .then((res) => {
          if (this.deliverPrice >= 20) {
            this.$swal({
              icon: "error",
              title: "น้ำหนักสินค้าเกิน",
              text: `กรุณาสั่งแยกบิล`,
              showCancelButton: false,
              confirmButtonText: "ตกลง",
              confirmButtonColor: "#EB4247",
            }).then(() => {
              this.$emit("updateCart");
            });
          } else if (res.data == "success") {
            this.$router.push("/ConfirmOrder");
          } else {
            this.$swal({
              icon: "error",
              title: "จำนวนสินค้าไม่เพียงพอ",
              showCancelButton: false,
              confirmButtonText: "ตกลง",
              confirmButtonColor: "#EB4247",
            }).then(() => {
              this.$emit("updateCart");
            });
          }
        });
    },

    formatToPrice(value) {
      var num1 = `${value.toFixed()}`;
      var number = new Intl.NumberFormat().format(num1);
      return number;
    },
  },
  computed: {
    deliverPrice() {
      let sum = 0;
      this.cartList.map((item) => (sum += item.qty * item.productWeigth));
      let weigth = sum / 1000;
      return weigth;
    },
  },
};
</script>

<style scoped>
.btnCart {
  background-color: #c5604e;
  border: none;
  font-size: 1.2rem;
  color: white;
  padding: 0.07rem 2rem;
  border-radius: 1.1rem;
  width: 15rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnCart:hover {
  background-color: #e8a89c;
  color: white;
}
.boxfixed {
  position: sticky;
  top: 5rem;
}
.text-price {
  font-size: 1.5rem;
  color: #bc2721;
}
</style>
