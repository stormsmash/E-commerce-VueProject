<template>
  <div>
    <div class="container my-5">
      <nav aria-label="breadcrumb" class="mt-5 mb-3 ms-2">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">หน้าแรก</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/Product/null/0/0"> ทั้งหมด</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="`/Product/null/${product.id_type}/0`">
              {{ product.type_name }}
            </router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="`/Product/null/0/${product.id_brand}/`">
              {{ product.brand_name }}
            </router-link>
          </li>
          <li class="breadcrumb-item textActive">
            {{ product.productName }}
          </li>
        </ol>
      </nav>
      <div class="row border p-5 bg-white boxraduis">
        <div class="col-6">
          <SlideProduct :data="productImg" />
        </div>
        <div class="col-6">
          <SubmitCart
            :data="[product]"
            :dataNum="cartList"
            @submitCart="getData"
            @like="getData"
          />
        </div>
        <div>
          <DetailProduct :data="[product]" />
        </div>
      </div>
    </div>
    <SlideProductButtom
      :Title="`สินค้าประเภท ${product.type_name}`"
      @like="getProduct"
      :Product="ProductType"
    />

    <SlideProductButtom
      :Title="`สินค้าแบรนด์ ${product.brand_name}`"
      @like="getProduct"
      :Product="ProductBrand"
    />
  </div>
</template>

<script>
import SlideProduct from "../components/Product/SlideProduct";
import SubmitCart from "../components/Product/SubmitCart";
import DetailProduct from "../components/Product/DetailProduct";
import SlideProductButtom from "../components/header/SlideProduct.vue";
import axios from "axios";
export default {
  name: "ProductInfo",
  components: {
    SlideProduct,
    SubmitCart,
    DetailProduct,
    SlideProductButtom,
  },
  data() {
    return {
      product: [],
      productImg: [],
      cartList: [],
      id_member: this.$session.get("id_member"),
      idproduct: this.$route.params.id,
      getCount: false,
      ProductType: [],
      ProductBrand: [],
    };
  },
  methods: {
    async getProduct() {
      let res = await axios.post(`${this.$URL}/Admin/Product.php`, {
        action: "getProductID",
        idproduct: this.$route.params.id,
        id_user: this.$session.get("id_member"),
      });
      this.productImg = res.data.img;
      this.product = res.data.product[0];
      this.getType(res.data.product[0].id_type);
      this.getBrand(res.data.product[0].id_brand);
      document.title = `${res.data.product[0].productName}`;
    },
    getCart() {
      axios
        .post(`${this.$URL}/User/cart.php`, {
          action: "getCartProduct",
          id_member: this.id_member,
          idproduct: this.$route.params.id,
        })
        .then((res) => {
          this.cartList = res.data[0].Total;
        });
    },

    updateView() {
      axios.post(`${this.$URL}/Admin/Product.php`, {
        action: "updateView",
        id_product: this.idproduct,
      });
    },

    getData() {
      this.getProduct();
      this.getCart();
      this.$root.$emit("getCount");
    },

    // slide
    async getType(id) {
      let res = await axios.post(`${this.$URL}/Admin/Product.php`, {
        action: "getProductShowType",
        id_user: this.$session.get("id_member"),
        id_type: id,
      });
      this.ProductType = res.data;
    },
    async getBrand(id) {
      let res = await axios.post(`${this.$URL}/Admin/Product.php`, {
        action: "getProductShowBrand",
        id_user: this.$session.get("id_member"),
        id_brand: id,
      });
      this.ProductBrand = res.data;
    },
  },
  created() {
    this.getData();
    this.updateView();
  },
  watch: {
    $route() {
      this.getProduct();
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #212529;
}
a:hover {
  color: #efb38f;
}
.textActive {
  color: #bc2721;
}
</style>
