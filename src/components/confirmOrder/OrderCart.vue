<template>
  <div class="boxfixed">
    <div class="row bg-white border p-3 ms-3 boxraduis">
      <h2>สรุปใบสั่งซื้อ</h2>
      <hr />

      <div>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="p-0 m-0">ยอดรวมสินค้า</h5>
          <h5 class="text-price">
            &#3647;
            <animated-number
              :value="data"
              :formatValue="formatToPrice"
              :duration="500"
              class="text-price"
            />
          </h5>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="p-0 m-0">ยอดรวมค่าจัดส่ง</h5>
          <h5 class="text-price">
            &#3647;
            <animated-number
              :value="deliverPrice"
              :formatValue="formatToPrice"
              :duration="500"
              class="text-price"
            />
          </h5>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-4">
          <h4 class="p-0 m-0">ยอดรวมการสั่งซื้อทั้งหมด</h4>
          <h2 class="text-price">
            &#3647;
            <animated-number
              :value="Total"
              :formatValue="formatToPrice"
              :duration="500"
              class="text-price"
            />
          </h2>
        </div>
      </div>
      <button
        class="btnCart rounded-pill mx-auto mt-5"
        @click="submitCartOrder"
      >
        ดำเนินการสั่งซื้อและชำระเงิน
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
    id_address: Number,
    cartList: Array,
  },
  components: {
    AnimatedNumber,
  },

  data() {
    return {
      id_user: this.$session.get("id_member"),
      Total: 0,
    };
  },

  methods: {
    submitCartOrder() {
      if (this.id_address != 0) {
        axios
          .post(`${this.$URL}/User/cart.php`, {
            action: "checkProduct",
            id_user: this.id_user,
          })
          .then((res) => {
            if (res.data == "success") {
              this.submitCart();
            } else {
              this.myAlert(`สินค้าไม่คงเหลือไม่พอ`);
              this.$router.push("/CartMe");
            }
          });
      } else {
        this.myAlert(`กรุณาเพิ่มที่อยู่ในการจัดส่ง`);
      }
    },

    submitCart() {
      axios
        .post(`${this.$URL}/User/cart.php`, {
          action: "submitCartOrder",
          id_user: this.id_user,
          address: this.id_address,
          total: this.data,
          deliverPrice: this.deliverPrice,
        })
        .then((res) => {
          this.$router.push(`/Pay/${res.data.id_order}`);
          this.$emit("updateCart");
          this.$root.$emit("getCount");
        });
    },
    myAlert(text) {
      this.$swal({
        position: "center",
        icon: `error`,
        title: "ผิดผลาด",
        text: `${text}`,
        showConfirmButton: true,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#EB4247",
      });
    },

    formatToPrice(value) {
      var num1 = `${value.toFixed()}`;
      var number = new Intl.NumberFormat().format(num1);
      return number;
    },
  },
  created() {
    this.Total = this.data + this.deliverPrice;
  },

  computed: {
    deliverPrice() {
      let sum = 0;
      this.cartList.map((item) => (sum += item.qty * item.productWeigth));
      let weigth = sum / 1000;
      let price = 0;

      if (weigth <= 1) {
        price = 35;
      } else if (weigth > 1 && weigth <= 2) {
        price = 45;
      } else if (weigth > 2 && weigth <= 3) {
        price = 75;
      } else if (weigth > 3 && weigth <= 5) {
        price = 80;
      } else if (weigth > 5 && weigth <= 7) {
        price = 105;
      } else if (weigth > 7 && weigth <= 9) {
        price = 120;
      } else if (weigth > 9 && weigth <= 10) {
        price = 130;
      } else if (weigth > 10 && weigth <= 12) {
        price = 150;
      } else if (weigth > 12 && weigth <= 14) {
        price = 165;
      } else if (weigth > 14 && weigth <= 15) {
        price = 190;
      } else if (weigth > 15 && weigth <= 17) {
        price = 215;
      } else if (weigth > 17 && weigth <= 18) {
        price = 235;
      } else if (weigth > 18 && weigth <= 19) {
        price = 255;
      } else if (weigth > 19 && weigth <= 20) {
        price = 300;
      }
      // return `น้ำหนัก ${weigth} /  ค่าส่ง ${price}`;
      return price;
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
  width: 18rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnCart:hover {
  background-color: #e8a89c;
  color: white;
}
.text-price {
  font-size: 1.5rem;
  color: #bc2721;
}
.boxfixed {
  position: sticky;
  top: 5rem;
}
</style>
