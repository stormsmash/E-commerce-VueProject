<template>
  <div>
    <Slides class="" :numType="Slide" :auto="true" />
    <MenuType name="หมวดหมู่" :Data="Type" Folder="imgType" />
    <SlidesGroup />
    <MenuType name="แบรนด์" :Data="Brand" Folder="imgBrand" />
    <div class="col-10 mx-auto">
      <SlideProduct
        Title="สินค้ามาใหม่"
        @like="getProductAll"
        :Product="ProductNew"
      />
      <SlideProduct
        Title="สินค้าขายดี"
        @like="getProductAll"
        :Product="ProductMostSell"
      />
      <SlideProduct
        Title="สินค้าเข้าชมสูงสุด"
        @like="getProductAll"
        :Product="ProductView"
      />
    </div>
  </div>
</template>
<script>
import Slides from "../components/header/Slides";
import MenuType from "../components/header/MenuType";
import SlidesGroup from "../components/header/SlidesGroup";
import SlideProduct from "../components/header/SlideProduct.vue";
import axios from "axios";
export default {
  name: "Home",
  components: {
    Slides,
    MenuType,
    SlidesGroup,
    SlideProduct,
  },
  data() {
    return {
      Type: [],
      Brand: [],
      ProductNew: [],
      ProductView: [],
      ProductMostSell: [],
      Slide: [],
    };
  },
  methods: {
    getType() {
      axios
        .post(`${this.$URL}/Admin/Type.php`, {
          action: "getTypeShow",
        })
        .then((res) => {
          this.Type = res.data;
        });
    },
    getBrand() {
      axios
        .post(`${this.$URL}/Admin/Brand.php`, {
          action: "getBrandShow",
        })
        .then((res) => {
          this.Brand = res.data;
        });
    },
    getProductNew() {
      axios
        .post(`${this.$URL}/Admin/Product.php`, {
          action: "getProductShowNew",
          id_user: this.$session.get("id_member"),
        })
        .then((res) => {
          this.ProductNew = res.data;
        });
    },
    getProductView() {
      axios
        .post(`${this.$URL}/Admin/Product.php`, {
          action: "getProductShowView",
          id_user: this.$session.get("id_member"),
        })
        .then((res) => {
          this.ProductView = res.data;
        });
    },
    getProductMostSell() {
      axios
        .post(`${this.$URL}/Admin/Product.php`, {
          action: "getProductShowMostSell",
          id_user: this.$session.get("id_member"),
        })
        .then((res) => {
          this.ProductMostSell = res.data;
        });
    },
    getSlide() {
      axios
        .post(`${this.$URL}/Admin/Slide.php`, {
          action: "getSlide",
          name_slide: "Main",
        })
        .then((res) => {
          this.Slide = res.data;
        });
    },
    getProductAll() {
      this.getProductNew();
      this.getProductView();
      this.getProductMostSell();
    },
  },

  created() {
    this.getType();
    this.getBrand();
    this.getProductAll();
    this.getSlide();
    document.title = "Pepensuda Shop";
  },
};
</script>

<style scoped></style>
