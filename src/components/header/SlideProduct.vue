<template>
  <div class="col-10 mx-auto mt-3">
    <div class="row com d-none d-md-block">
      <hr />
      <div class="col col-md-12 mx-auto">
        <div class="d-flex align-items-center my-3">
          <h3>{{ Title }}</h3>
          <h6 class="ms-5">
            <router-link to="/Product/null/0/0"
              >ดูทั้งหมด <i class="fas fa-chevron-right"></i
            ></router-link>
          </h6>
        </div>
        <VueSlickCarousel v-bind="settings" v-if="Product.length" class="mb-5">
          <div v-for="(item, index) in Product" :key="index">
            <div class="boxProdct">
              <div class="boximg">
                <img
                  :src="`${$URL}/imgProduct/${item.img_product}`"
                  alt=""
                  class="img-product"
                />
              </div>
              <div class="nameProduct">
                {{ item.productName }}
              </div>
              <div class="boxFooter">
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
        </VueSlickCarousel>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import axios from "axios";
export default {
  name: "SlideProduct",
  props: {
    Title: String,
    Product: Array,
  },
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        touchThreshold: 5,
      },
    };
  },
  methods: {
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
  width: 18rem;
  height: 30rem;
  border-radius: 0.6rem;
  margin-left: 0.6rem;
  margin: 0 auto;
  padding: 0.6rem;
  overflow: hidden;
  transition: 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.boxProdct:hover {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1.1rem 1.2rem;
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
</style>
