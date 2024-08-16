<template>
  <div class="boxraduis mt-3">
    <div class="textH">ช่องทางการชำระเงินของทางร้าน Pepensuda Shop</div>
    <div class="row my-2" v-for="(item, index) in bank" :key="index">
      <div class="boxImg">
        <img :src="`${$URL}/imgBank/${item.bank_img}`" alt="" class="bankImg" />
      </div>
      <div class="boxInfo">
        <div class="textH">{{ item.bank_type }}</div>
        <p class="p-0 m-0">ชื่อบัญชี : {{ item.bank_name }}</p>
        <p class="p-0 m-0">เลขที่บัญชี : {{ item.bank_num }}</p>
      </div>
      <hr class="mt-3" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Pay",
  data() {
    return {
      bank: [],
    };
  },
  methods: {
    getPay() {
      axios
        .post(`${this.$URL}/Admin/bank.php`, {
          action: "getBankShow",
        })
        .then((res) => {
          this.bank = res.data;
        });
    },
  },
  created() {
    this.getPay();
    this.$root.$emit("Pay");
  },
};
</script>

<style scoped>
.textH {
  font-size: 1.2rem;
  font-weight: 700;
}
.boxInfo {
  width: 30rem;
  height: 10rem;
  margin-left: 2rem;
}
.boxImg {
  width: 10rem;
  height: 10rem;
  margin-left: 2rem;
}
.bankImg {
  width: 7.5rem;
  height: 7.5rem;
}
.boxH {
  margin-left: 5rem;
  margin-top: 2rem;
}
.textH {
  font-size: 1.2rem;
  font-weight: 700;
}
.textSub {
  margin-left: 10rem;
  margin-top: 1.5rem;
}
</style>
