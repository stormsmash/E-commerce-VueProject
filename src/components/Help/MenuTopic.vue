<template>
  <div class="container-fluid mt-3 boxfixed">
    <div class="row">
      <div class="col-12 py-3 bg-white boxraduis">
        <div class="text_header">
          <img src="../../assets/icon/user-member.png" alt="" />บริการช่วยเหลือ
        </div>
        <ul>
          <li @click="isActive = 1">
            <router-link
              to="/Help/Buy"
              :class="[isActive === 1 ? 'textMenu' : '']"
              >สั่งซื้อสินค้าอย่างไร
            </router-link>
          </li>
          <li @click="isActive = 2">
            <router-link
              to="/Help/Pay"
              :class="[isActive === 2 ? 'textMenu' : '']"
              >ช่องทางการชำระเงิน
            </router-link>
          </li>
          <li @click="isActive = 3">
            <router-link
              to="/Help/Register"
              :class="[isActive === 3 ? 'textMenu' : '']"
              >สมัครสมาชิกอย่างไร
            </router-link>
          </li>
          <li @click="isActive = 4">
            <router-link
              to="/Help/Cancel"
              :class="[isActive === 4 ? 'textMenu' : '']"
              >ยกเลิกการสั่งสินค้า
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuTopic",
  data() {
    return {
      isActive: 1,
    };
  },
  methods: {
    setMenu(num) {
      this.isActive = num;
    },
  },
  mounted() {
    this.$root.$on("Buy", () => {
      this.setMenu(1);
    });
    this.$root.$on("Cancel", () => {
      this.setMenu(4);
    });
    this.$root.$on("Pay", () => {
      this.setMenu(2);
    });
    this.$root.$on("Register", () => {
      this.setMenu(3);
    });
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin-left: 1.5rem;
}
img {
  width: 1.8rem;
  margin-right: 0.2rem;
}
.text_header {
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
}
ul li {
  margin-top: 0.6rem;
}
ul li a {
  text-decoration: none;
  color: black;
  width: 10rem;
  display: block;
}
.textMenu {
  color: #d36361;
  font-weight: bold;
}
a {
  text-decoration: none;
  color: black;
}
a:hover {
  color: #d36361;
}
.boxfixed {
  position: sticky;
  top: 5rem;
}
</style>
