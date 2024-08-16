<template>
  <div>
    <div class="col-10 mx-auto">
      <div class="row">
        <!-- Error -->
        <nav aria-label="breadcrumb" class="mt-5 mb-3 ms-2">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">หน้าแรก</router-link>
            </li>
            <li class="breadcrumb-item textActive">
              {{ textType ? textType : `ทั้งหมด` }}
            </li>
          </ol>
        </nav>
        <!-- Error -->

        <div class="col-12">
          <ListProduct />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListProduct from "../components/Product/ListProduct.vue";
import axios from "axios";
export default {
  name: "Product",
  components: {
    ListProduct,
  },

  data() {
    return {
      idType: this.$route.params.idType,
      textType: "ทั้งหมด",
    };
  },

  methods: {
    getProduct() {
      axios
        .post(`${this.$URL}/Admin/Product.php`, {
          action: "getProductWhere",
          idType: this.idType,
        })
        .then((res) => {
          this.textType = res.data[0].type_name;
        });
    },

    setIDtype(id, typeName = false) {
      this.idType = id;
      this.textType = typeName;
      this.getProduct();
    },
  },

  created() {
    this.getProduct();
    document.title = "Pepensuda Shop Product";
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
