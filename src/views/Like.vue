<template>
  <div>
    <Topic />
    <div class="col-10 mx-auto">
      <div
        v-if="ListProduct[0] == null"
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
        <h5 class="mt-3">ไม่พบสินค้าที่ถูกใจ...</h5>
        <router-link to="/" class="mt-3">
          <button class="btnCart rounded-pill">ช้อปปิ้งกันเลย</button>
        </router-link>
      </div>
      <ListProduct :data="ListProduct" @like="getProductLike" />
    </div>
  </div>
</template>

<script>
import Topic from "../components/Like/Topic";
import ListProduct from "../components/Like/ListProduct";
import axios from "axios";
export default {
  name: "Like",
  components: {
    Topic,
    ListProduct,
  },
  data() {
    return {
      ListProduct: [],
    };
  },
  methods: {
    getProductLike() {
      axios
        .post(`${this.$URL}/User/likeProduct.php`, {
          action: "getProductLike",
          id_user: this.$session.get("id_member"),
        })
        .then((res) => {
          this.ListProduct = res.data;
        });
    },
  },
  created() {
    this.getProductLike();
    document.title = "Pepensuda Shop Like";
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
</style>
