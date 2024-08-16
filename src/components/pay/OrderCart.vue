<template>
  <div>
    <div class="row bg-white border p-3 ms-3 boxraduis">
      <h2>สรุปใบสั่งซื้อ #{{ data[0].id_order }}</h2>
      <hr />
      <div>
        <div class="d-flex justify-content-between align-items-center mt-4">
          <h4 class="p-0 m-0">ยอดรวมการสั่งซื้อทั้งหมด</h4>
          <div class="text-price">
            &#3647;
            <animated-number
              :value="data[0].total + data[0].deliverPrice"
              :formatValue="formatToPrice"
              :duration="500"
              class="text-price"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
export default {
  name: "OrderCart",
  props: {
    data: Array,
  },
  components: {
    AnimatedNumber,
  },

  data() {
    return {
      deliverPrice: 45,
      id_user: this.$session.get("id_member"),
      Total: 0,
    };
  },

  methods: {
    formatToPrice(value) {
      var num1 = `${value.toFixed()}`;
      var number = new Intl.NumberFormat().format(num1);
      return number;
    },
  },
  created() {
    this.Total = this.data + this.deliverPrice;
  },
};
</script>

<style scoped>
.btnCart {
  background-color: #c5604e;
  border: none;
  font-size: 1.1rem;
  color: white;
  padding: 0.3rem 1.8rem;
  width: 18rem;
  height: 3.7rem;
  border-radius: 1.3rem;
}
.btnCart:hover {
  background-color: #e8a89c;
  color: white;
}

.text-price {
  font-size: 1.5rem;
  color: #bc2721;
}
</style>
