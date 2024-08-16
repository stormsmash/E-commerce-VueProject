<template>
  <div class="container-fluid">
    <div class="row bg-white boxraduis p-5">
      <div class="col-2 boxMenu">
        <div class="row p-3">
          <div class="col-md-12">
            <h5 class="font-weight-bold">ประเภท</h5>
            <div
              v-for="(item, index) in Type"
              :key="index"
              class="form-check my-2"
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="TypeList"
                :value="item.id_type"
                :id="item.id_type"
                @change="resetPage"
              />
              <label class="form-check-label" :for="item.id_type">
                {{ item.type_name }}
              </label>
            </div>
          </div>
          <hr class="p-0 my-3" />
          <div class="col-md-12">
            <h5 class="font-weight-bold">แบรนด์</h5>
            <div
              v-for="(item, index) in Brand"
              :key="index"
              class="form-check my-2"
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="BrandList"
                :value="item.id_brand"
                :id="item.id_brand"
                @change="resetPage"
              />
              <label class="form-check-label" :for="item.id_brand">
                {{ item.brand_name }}
              </label>
            </div>
          </div>
          <div class="col-md-12">
            <p>ช่วงราคา</p>
            <VueSimpleRangeSlider
              style="width: 100%"
              class="mt-5"
              :min="0"
              :max="9999"
              v-model="range"
              :logarithmic="true"
              barColor="#EFB38F"
              activeBarColor="#BC201B"
              @input="resetPage"
            />
          </div>
          <div class="col-md-12 mt-1">
            <button
              @click="resetFilter"
              class="btnCart rounded-pill mt-3 w-100"
            >
              คืนค่าการค้นหา
            </button>
          </div>
        </div>
      </div>
      <div class="col-10">
        <div class="row">
          <div class="d-flex justify-content-between pt-3">
            <div class="boxsearch position-relative w-50">
              <h4 v-if="Textsearch != ''">
                ผลการค้นหา
                <span class="textSearchSuccess">'{{ Textsearch }}'</span>
              </h4>
              <h6>{{ filterProduct.length }} รายการ</h6>
            </div>

            <div class="d-flex align-items-center">
              <Select
                v-model="orderBy"
                :v="orderBy"
                inputname="tombon"
                text="เรียงตาม"
                :Data="orderVale"
                @change="resetPage"
              />
            </div>
          </div>
        </div>
        <!-- nodata -->
        <div v-if="productShow == ''">
          <div
            class="
              my-3
              p-5
              bg-white
              d-flex
              flex-column
              justify-content-center
              align-items-center
            "
          >
            <img src="../../assets/icon/box.png" alt="" width="150" />
            <h1 class="mt-3">...ไม่พบสินค้าที่ค้นหา...</h1>
          </div>
        </div>
        <!-- nodata -->
        <!-- show product -->
        <div class="row" v-if="productShow != ''">
          <div
            v-for="(item, index) in productShow"
            :key="index"
            :class="[listView == 0 ? 'col-3' : 'col-12']"
            class="boxProduct"
          >
            <div
              :class="[listView == 0 ? 'boxProdct' : 'boxProdctList']"
              class="row"
            >
              <div :class="[listView == 0 ? 'col-12 boximg' : 'col-4']">
                <img
                  :src="`${$URL}/imgProduct/${item.img_product}`"
                  alt=""
                  :class="[listView == 0 ? 'img-product' : 'boximgList']"
                />
              </div>
              <div
                :class="[listView == 0 ? 'col-12' : 'col-4']"
                class="mt-3 nameProduct"
              >
                {{ item.productName }}
              </div>
              <div :class="[listView == 0 ? 'col-12' : 'col-4']">
                <router-link :to="`/ProductInfo/${item.id_product}`">
                  <div class="Price text-center btnCart rounded-pill">
                    <i class="fas fa-shopping-cart"></i>
                    {{ item.productPrice | numFormat }}.-
                  </div>
                </router-link>
                <div>
                  <div class="row mt-3">
                    <button
                      class="btnHeart ms-auto"
                      @click="likeProduct(item.id_product)"
                    >
                      <transition name="like" mode="out-in">
                        <div :key="item.id_user">
                          <i v-if="item.id_user" class="fas fa-heart"></i>
                          <i v-if="!item.id_user" class="far fa-heart"></i>
                        </div>
                      </transition>
                    </button>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6 text-danger">
                      <i class="fas fa-eye"></i> {{ item.view }}
                    </div>
                    <div class="col-md-6 text-danger text-end">
                      ขายแล้ว {{ item.total == null ? 0 : item.total }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- show product -->
      </div>
    </div>
    <div v-if="maxPage != 1" class="p-3 d-flex justify-content-end my-3">
      <Pagination @chengPage="chengPage" :page="page" :maxPage="maxPage" />
    </div>
  </div>
</template>

<script>
import VueSimpleRangeSlider from "vue-simple-range-slider";
import Pagination from "../pagination/Pagination";
import "vue-simple-range-slider/dist/vueSimpleRangeSlider.css";
import Select from "../Input/Select.vue";
import axios from "axios";
export default {
  name: "ListProduct",
  components: {
    VueSimpleRangeSlider,
    Pagination,
    Select,
  },
  data() {
    return {
      Product: [],
      Type: [],
      Brand: [],
      TypeList: [],
      BrandList: [],
      Textsearch: "",
      range: [0, 9999],
      showPage: 8,
      page: 1,
      orderVale: [
        { 0: 0, 1: "ราคาน้อยไปมาก" },
        { 0: 1, 1: "ราคามากไปน้อย" },
      ],
      orderBy: "0",
      listView: 0,
    };
  },

  methods: {
    getProduct() {
      axios
        .post(`${this.$URL}/Admin/Product.php`, {
          action: "getProductShow",
          id_user: this.$session.get("id_member"),
        })
        .then((res) => {
          this.Product = res.data;
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
    getType() {
      axios
        .post(`${this.$URL}/Admin/Type.php`, {
          action: "getTypeShow",
        })
        .then((res) => {
          this.Type = res.data;
        });
    },
    resetFilter() {
      this.TypeList = [];
      this.BrandList = [];
      this.Textsearch = "";
      this.page = 1;
    },
    chengPage(page) {
      this.page = page;
      window.scrollTo(0, 0);
    },
    resetPage() {
      this.page = 1;
    },
    likeProduct(id) {
      if (this.$session.get("id_member") == null) {
        this.$router.push("/Login");
      } else {
        axios
          .post(`${this.$URL}/User/likeProduct.php`, {
            action: "likeProduct",
            id_product: id,
            id_user: this.$session.get("id_member"),
          })
          .then(() => {
            this.$emit("like");
          });
      }
    },
    setText(text) {
      this.Textsearch = text;
    },
  },

  mounted() {
    this.getProduct();
    this.getBrand();
    this.getType();
    this.setText(this.$route.params.text);
    if (this.$route.params.text == "null") {
      this.Textsearch = "";
    } else {
      this.setText(this.$route.params.text);
    }
    if (this.$route.params.type != 0) {
      this.TypeList.push(parseInt(this.$route.params.type));
    }
    if (this.$route.params.brand != 0) {
      this.BrandList.push(parseInt(this.$route.params.brand));
    }
  },
  watch: {
    $route() {
      this.getProduct();
      this.setText(this.$route.params.text);
    },
  },
  computed: {
    filterProduct() {
      return this.Product.filter((item) => {
        return (
          (this.Textsearch.length === 0 ||
            item.productName
              .toString()
              .toLowerCase()
              .includes(this.Textsearch.toString().toLowerCase()) ||
            item.type_name
              .toString()
              .toLowerCase()
              .includes(this.Textsearch.toString().toLowerCase()) ||
            item.brand_name
              .toString()
              .toLowerCase()
              .includes(this.Textsearch.toString().toLowerCase())) &&
          (this.TypeList.length === 0 ||
            this.TypeList.includes(item.productType)) &&
          (this.BrandList.length === 0 ||
            this.BrandList.includes(item.productBrand)) &&
          this.range[0] <= item.productPrice &&
          this.range[1] >= item.productPrice
        );
      }).sort((a, b) => {
        if (this.orderBy == "0") {
          return a["productPrice"] - b["productPrice"];
        } else {
          return b["productPrice"] - a["productPrice"];
        }
      });
    },
    maxPage() {
      let product = this.filterProduct;
      return Math.ceil(product.length / this.showPage);
    },
    productShow() {
      let product = this.filterProduct;
      let index = this.page * this.showPage - this.showPage;
      if (this.page == "1") {
        return product.slice(0, this.showPage);
      } else {
        return product.slice(index, index + this.showPage);
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000000;
}
a:hover {
  color: #940b03;
}

.boxProdct {
  position: relative;
  background: white;
  width: 17rem;
  height: 30rem;
  border-radius: 0.6rem;
  margin-left: 0.6rem;
  margin: 0 auto;
  margin-top: 1rem;
  padding: 0.6rem;
  overflow: hidden;
  transition: 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.boxProdctList {
  position: relative;
  background: white;
  width: 100%;
  height: 12rem;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 20px;
  padding: 0.9rem;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.boxProdct:hover,
.boxProdctList:hover {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1.2rem 1.5rem;
}
.boximg {
  width: 100%;
  height: 40%;
  margin: 0;
}
.img-product {
  padding: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.boxFooter {
  position: absolute;
  width: 100%;
  bottom: 0.6rem;
  left: 0;
  padding: 0 1rem;
}
button {
  background: none;
  border: none;
}
.fa-heart {
  transition: 0.3s;
  color: #c5604e;
}
.fa-heart:hover {
  color: #e8a89c;
}

.btnHeart {
  border-radius: 50%;
  height: 3.7rem;
  width: 3.7rem;
}
.btnHeart i {
  font-size: 2rem;
}
.Price {
  font-size: 1.2rem;
  color: #000000;
  font-weight: bold;
}
.viewSell {
  font-size: 0.8rem;
}
.btnCart {
  background-color: #c5604e;
  font-size: 1.2rem;
  color: white;
  padding: 0.5rem 1.1rem;
  border-radius: 1.1rem;
}
.btnCart:hover {
  background-color: #e8a89c;
  color: white;
}
.nameProduct {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 2.5ex;
  height: 5ex;
  margin-top: 1rem;
}

.fa-search {
  position: absolute;
  top: 1rem;
  right: 0;
}
.boxMenu {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.textSearchSuccess {
  font-size: 2rem;
  font-weight: 700;
}
</style>
