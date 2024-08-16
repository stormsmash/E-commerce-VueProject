<template>
  <div class="container-fluid border box bg-white">
    <div class="">
      <h5>หมวดหมู่สินค้า</h5>
      <hr />
      <ul>
        <li @click="setType(0, `ทั้งหมด`)">
          <router-link
            to="/Product/0"
            class="menuAll w-100"
            :class="[$route.params.idType == '0' ? 'textMenu' : '']"
            ><i class="fas fa-caret-right"></i> ทั้งหมด</router-link
          >
        </li>
        <li
          v-for="(item, index) in Type"
          :key="index"
          @click="setType(item.id_type, item.type_name)"
        >
          <router-link
            :to="`/Product/${item.id_type}`"
            :class="[$route.params.idType == item.id_type ? 'textMenu' : '']"
          >
            <i class="fas fa-caret-right"></i> {{ item.type_name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MenuProduct",

  data() {
    return {
      Type: [],
      checkMenu: this.$route.params.idType,
      idType: 0,
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

    setType(id, typeName) {
      this.idType = id;
      this.$emit("setType", id, typeName);
    },
  },
  created() {
    this.getType();
  },
};
</script>

<style scoped>
ul li {
  list-style: none;
  font-size: 1.2rem;
  margin-top: 1rem;
}
ul li:hover {
  color: #d36361;
  cursor: pointer;
}

.textMenu {
  color: #d36361;
  font-weight: bold;
}
.menuAll {
  font-size: 1.1rem;
}
.box {
  background-color: #ffff;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 0.01rem,
    rgb(209, 213, 219) 0px 0px 0px 0.01rem inset;
  padding: 1rem;
}
hr {
  border-top: 0.02rem solid #940b03;
}
a {
  text-decoration: none;
  color: #000000;
  display: block;
  width: 100%;
}
a:hover {
  color: #d36361;
}
</style>
