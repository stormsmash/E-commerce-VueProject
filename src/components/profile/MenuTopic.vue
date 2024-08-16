<template>
  <div class="container-fluid mt-3 boxfixed">
    <div class="row">
      <div class="col-12 py-3 bg-white boxraduis">
        <div class="text_header">
          <img src="../../assets/icon/user-member.png" alt="" /> บัญชีของฉัน
        </div>
        <ul>
          <li @click="isActive = 1">
            <router-link
              to="/Profile/ProfileMe"
              :class="[isActive === 1 ? 'textMenu' : '']"
              >ประวัติ
            </router-link>
          </li>
          <li @click="isActive = 2">
            <router-link
              to="/Profile/Address"
              :class="[isActive === 2 ? 'textMenu' : '']"
              >ที่อยู่</router-link
            >
          </li>
          <li @click="isActive = 3">
            <router-link
              to="/Profile/Repassword"
              :class="[isActive === 3 ? 'textMenu' : '']"
              >เปลี่ยนรหัสผ่าน</router-link
            >
          </li>
        </ul>
        <div class="text_header" @click="isActive = 4">
          <router-link
            to="/Profile/OrderMe/Order/All"
            :class="[isActive === 4 ? 'textMenu' : '']"
          >
            <img src="../../assets/icon/buy.png" alt="" />การสั่งซื้อของฉัน
          </router-link>
        </div>
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
    setMenu() {
      this.isActive = 4;
    },
    setMenuProfile() {
      this.isActive = 1;
    },
  },
  mounted() {
    this.$root.$on("setOrder", this.setMenu);
    if (this.$root.$on("setProfile") != null) {
      this.$root.$on("setProfile", this.setMenuProfile);
    }
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
