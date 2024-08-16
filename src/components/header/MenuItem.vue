<template>
  <div class="listmenu container-fluid">
    <b-collapse id="collapse-1">
      <div class="row p-0 mt-2">
        <div class="tabs col-4 p-0">
          <div>
            <div
              v-for="(type, index) in Type"
              :key="index"
              @mouseover="activetab = index"
              :class="[activetab === index ? 'active' : '']"
              class="
                boxBtn
                d-flex
                justify-content-between
                align-items-center
                px-3
                mb-2
              "
            >
              {{ type[1] }} <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div v-for="(menu, index) in Type" :key="index">
            <div v-if="activetab === index">
              <div
                v-for="(product, indexP) in Product.filter(
                  (item) => item.productType == menu.id_type
                )"
                :key="indexP"
                class="my-2"
              >
                <router-link :to="`/ProductInfo/${product.id_product}`">
                  {{ product.productName }}</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MenuItem",
  data() {
    return {
      activetab: 2,
      Type: [],
      Product: [],
    };
  },
  methods: {
    getType() {
      axios
        .post(`${this.$URL}/Admin/Type.php`, {
          action: "getType",
        })
        .then((res) => {
          this.Type = res.data;
        });
    },
    getProduct() {
      axios
        .post(`${this.$URL}/Admin/Product.php`, {
          action: "getProductShow",
        })
        .then((res) => {
          this.Product = res.data;
        });
    },
  },
  created() {
    this.getType();
    this.getProduct();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}
a:hover {
  color: #35ebc3;
}
.listmenu {
  z-index: 100;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  width: 100%;
}
.tabs {
  height: 50vh;
  overflow-y: scroll;
}
.tabs::-webkit-scrollbar {
  display: none;
}
.boxBtn {
  background-color: rgb(255, 255, 255);
  width: 50%;
  margin: 0;
  margin-left: 3.75rem;
  border-radius: 0.1rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.3s all;
  padding: 0.5rem 1.2rem;
}
.boxBtn:hover {
  background-color: #fedbb3;
}
.active {
  background-color: #fedbb3;
}
</style>
