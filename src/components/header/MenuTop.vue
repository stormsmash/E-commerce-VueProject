<template>
  <div class="sticky-top pos-relative container-fluid">
    <div class="bg row d-flex align-items-center justify-content-around p-3">
      <div class="col-6 col-md-3 d-flex align-items-center position-relative">
        <i
          class="fas fa-bars btnmenu"
          :class="[icon ? 'fa-times animetion' : 'fa-bars']"
          v-b-toggle.collapse-1
          @click="open"
          ref="open"
        ></i>
        <h3 class="p-0 m-0 mx-5 font text-nowrap">
          <router-link to="/" class="logo">
            <img src="../../assets/logo.png" alt="" />
            <p>Pepensuda Shop</p></router-link
          >
        </h3>
      </div>
      <div class="col-5 col-md-5 boxSearch">
        <div class="input-group">
          <input
            type="text"
            class="form-control rounded-pill inputsearch"
            placeholder="ค้นหาสินค้า..."
            v-model="textSearch"
          />
          <div class="input-group-prepend" @click="Search">
            <div
              class="
                text-center
                position-relative
                w-100
                h-100
                d-flex
                align-items-center
                justify-content-center
              "
            >
              <i class="bi bi-search"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="boxicon d-flex align-items-center justify-content-around">
          <div @mouseover="openUser" @mouseleave="closeUser">
            <b-dropdown
              class="btn p-0 m-0"
              size=""
              variant="link"
              toggle-class="text-decoration-none"
              right
              no-caret
              ref="user1"
            >
              <template #button-content>
                <img v-if="id_member" :src="url" alt="" class="imgProfile" />
                <i v-if="!id_member" class="fas fa-user"></i>
              </template>
              <div v-if="this.$session.get('email')">
                <div class="textName text-center">
                  <h6 class="text-truncate">
                    {{ this.$session.get("email") }}
                  </h6>
                </div>
                <hr class="p-0 m-0" />
                <b-dropdown-item>
                  <router-link to="/Profile/ProfileMe"
                    ><img class="imgicon" src="../../assets/icon/profile.png" />
                    โปรไฟล์ของฉัน</router-link
                  >
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link to="/Profile/OrderMe/Order/All">
                    <img
                      class="imgicon"
                      src="../../assets/icon/shopping-bag.png"
                      alt=""
                    />
                    การซื้อของฉัน</router-link
                  >
                </b-dropdown-item>
                <b-dropdown-item>
                  <a @click="logOut"
                    ><img
                      class="imgicon"
                      src="../../assets/icon/log-out.png"
                      alt=""
                    />ออกจากระบบ</a
                  >
                </b-dropdown-item>
              </div>
              <div v-if="!this.$session.get('email')">
                <b-dropdown-item>
                  <router-link to="/Login">
                    <img src="../../assets/icon/log-in.png" alt="" />
                    เข้าสู่ระบบ</router-link
                  >
                </b-dropdown-item>
              </div>
            </b-dropdown>
          </div>
          <div @mouseover="openCart" @mouseleave="closeCart">
            <b-dropdown
              class="btn p-0 m-0"
              size=""
              variant="link"
              toggle-class="text-decoration-none"
              right
              no-caret
              ref="cart"
            >
              <template #button-content>
                <router-link to="/CartMe">
                  <i class="fas fa-shopping-cart"></i>
                  <div v-if="countCart" class="count p-2">
                    <animated-number
                      :value="countCart"
                      :formatValue="formatToPrice"
                      :duration="500"
                    />
                  </div>
                </router-link>
              </template>
              <div class="row" v-if="cartList == ''">
                <h5 class="text-center">ไม่มีสินค้า</h5>
              </div>
              <div class="row" v-if="cartList != ''">
                <div class="containerCart">
                  <div v-for="(item, index) in cartList" :key="index">
                    <div class="row boxCart px-4">
                      <div class="col-md-3">
                        <img
                          :src="`${$URL}/imgProduct/${item.img_product}`"
                          alt=""
                          class="boxImgcart"
                        />
                      </div>
                      <div class="col-md-6">
                        <div class="text-truncate text-name">
                          {{ item.productName }}
                        </div>
                        <div>x{{ item.Total }}</div>
                      </div>
                      <div class="col-md-3 text-end pe-1 text-price">
                        &#3647;{{
                          (item.productPrice * item.Total) | numFormat
                        }}
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
                <router-link to="/CartMe">
                  <div class="btnCart rounded-pill ms-auto mx-3">
                    ดูสินค้าของคุณ
                  </div>
                </router-link>
              </div>
            </b-dropdown>
          </div>

          <div>
            <button class="btn position-relative">
              <router-link to="/Like">
                <i class="fas fa-heart"></i>
              </router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
    <MenuItem />
  </div>
</template>

<script>
import MenuItem from "./MenuItem";
import axios from "axios";
import AnimatedNumber from "animated-number-vue";
export default {
  name: "MenuTop",
  props: {},
  components: {
    MenuItem,
    AnimatedNumber,
  },

  data() {
    return {
      icon: false,
      countCart: 0,
      url: "",
      textSearch: "",
      Login: false,
      // id_member: this.$session.get("id_member"),
      cartList: [],
    };
  },

  methods: {
    open() {
      this.icon = !this.icon;
    },
    openUser() {
      this.$refs.user1.visible = true;
    },
    closeUser() {
      this.$refs.user1.visible = false;
    },
    openCart() {
      this.$refs.cart.visible = true;
    },
    closeCart() {
      this.$refs.cart.visible = false;
    },
    logOut() {
      this.$session.destroy();
      this.getCount();
      this.getCart();
      this.$root.$emit("loginPage");
      this.$root.$emit("logoutPage");
      this.$router.push("/Login");
    },
    getCount() {
      if (this.id_user != "") {
        axios
          .post(`${this.$URL}/User/cart.php`, {
            action: "countCart",
            id_user: this.$session.get("id_member"),
          })
          .then((res) => {
            this.countCart = res.data;
          });
      }
    },
    formatToPrice(value) {
      var num1 = `${value.toFixed()}`;
      var number = new Intl.NumberFormat().format(num1);
      return number;
    },
    getData() {
      axios
        .post(`${this.$URL}/User/member.php`, {
          action: "getData",
          id_member: this.$session.get("id_member"),
        })
        .then((res) => {
          this.id_member = res.data.id_member;
          this.url = `${this.$URL}/img/${res.data.img}`;
          if (
            this.url == `${this.$URL}/img/undefined` ||
            this.url == `${this.$URL}/img/null`
          ) {
            this.url = `${this.$URL}/img/preview.png`;
          }
        });
    },
    Search() {
      if (this.textSearch == "" || this.textSearch == null) {
        this.Textsearch = null;
      } else {
        this.$router.push(`/Product/${this.textSearch}/0/0`);
        this.textSearch = null;
      }
    },

    // cart
    getCart() {
      axios
        .post(`${this.$URL}/User/cart.php`, {
          action: "getCart",
          id_member: this.$session.get("id_member"),
        })
        .then((res) => {
          this.cartList = res.data;
        });
    },
  },
  created() {
    this.getData();
    this.getCount();
    this.getCart();
  },

  mounted() {
    this.$root.$on("getCount", () => {
      this.getCount();
      this.getCart();
    });
    this.$root.$on("loginPage", () => {
      this.getCount();
      this.getCart();
      this.getData();
    });
    this.$root.$on("setProfile", () => {
      this.getData();
    });
  },
  computed: {},
  watch: {
    $route() {
      if (this.icon == true) {
        this.$refs["open"].click();
      }
    },
    id_member() {
      return this.$session.get("id_member");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap");
.bg {
  background: #066803;
  color: white;
}
i {
  font-size: 1.75rem;
  cursor: pointer;
  transition: 0.3s all;
}
i:hover {
  color: #f9c7c6;
}
.bi-search {
  font-size: 1.5rem;
}
input {
  top: 0;
  left: 0;
}
.inputsearch {
  height: 2.3rem;
}
.input-group-prepend {
  position: absolute;
  width: 12%;
  height: 100%;
  top: 0;
  right: -1rem;
  z-index: 10;
  border: none;
  background-color: #9ea80e;
  border-top-right-radius: 3.1rem;
  border-bottom-right-radius: 3.1rem;
  cursor: pointer;
}
.input-group-text {
  height: 100%;
  color: white;
}
.boxicon {
  margin-left: 100px;
}
.btnmenu {
  width: 3.1rem;
  text-align: center;
}
.animetion {
  transform: rotateY(180deg);
  transform-origin: center;
}
.font {
  font-size: 1.1rem;
}
.dropdown:focus {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}
::v-deep .btn {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
.btn:focus,
.btn:active:focus,
.btn.active:focus {
  outline: none;
  box-shadow: none;
}
button i {
  color: rgb(255, 255, 255);
  font-size: 2rem;
}
.logo {
  position: relative;
  color: white;
  text-decoration: none;
}
.logo p {
  padding: 0;
  margin: 0;
  margin-left: 7.3rem;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: "Comfortaa", cursive;
}

.logo img {
  position: absolute;
  top: -0.9rem;
  width: 3.5rem;
  height: 3.5rem;
  margin-left: 2.7rem;
}
ul a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
img {
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.5rem;
}
::v-deep .dropdown-item:hover {
  background-color: #efb1a2;
}
::v-deep .dropdown-item:active {
  background-color: #c5604e;
}
ul a i {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}
.count {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -0.3rem;
  right: -0.3rem;
  width: 2ch;
  height: 2ch;
  background-color: #ffff;
  border-radius: 50%;
  border: 0.1rem solid #bb1f1a;
  color: #940b03;
}
.imgProfile {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 0.1rem solid #fff;
}
.textName {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 2.5ex;
  height: 2.5ex;
  width: 10rem;
  margin: 0.1rem;
}
.textName h6 {
  font-size: 1rem;
}

/* cart */
.containerCart {
  max-height: 20rem;
  overflow-y: scroll;
}
.containerCart::-webkit-scrollbar {
  display: none;
}
.boxCart {
  width: 20rem;
}
.boxCart:hover {
  background: none;
}
.boxImgcart {
  width: 3rem;
  height: 3rem;
}
.btnCart {
  background-color: #c5604e;
  border: none;
  font-size: 0.9rem;
  color: white;
  padding: 0.07rem 0.5rem;
  border-radius: 1.1rem;
  width: 10rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnCart:hover {
  background-color: #e8a89c;
  color: white;
}
.text-price {
  font-size: 0.8rem;
  color: #bc2721;
}
.text-name {
  font-size: 0.8rem;
}
@media only screen and (max-width: 600px) {
  .boxSearch {
    display: none;
  }
}
</style>
