<template>
  <div class="mt-3 min-vh-100 position-relative">
    <div class="boxraduis">
      <div
        class="
          boxMenu
          d-flex
          justify-content-around
          align-items-center
          boxfixed
        "
      >
        <div @click="activeMenu = 1" class="position-relative">
          <router-link
            to="/Profile/OrderMe/Order/All"
            :class="[activeMenu == 1 ? 'activeMenu' : '']"
            class="rounded-pill"
            >ทั้งหมด
          </router-link>
          <span v-if="countAll != 0" class="count"> {{ countAll }}</span>
        </div>

        <div @click="activeMenu = 2" class="position-relative">
          <router-link
            to="/Profile/OrderMe/Order/Pay"
            :class="[activeMenu == 2 ? 'activeMenu' : '']"
            class="rounded-pill"
            >ที่ต้องชำระ
          </router-link>
          <span v-if="countPay != 0" class="count"> {{ countPay }} </span>
        </div>

        <div @click="activeMenu = 3" class="position-relative">
          <router-link
            to="/Profile/OrderMe/Order/Delivery"
            :class="[activeMenu == 3 ? 'activeMenu' : '']"
            class="rounded-pill"
            >ที่ต้องจัดส่ง
          </router-link>
          <span v-if="countDelivery != 0" class="count">
            {{ countDelivery }}
          </span>
        </div>

        <div @click="activeMenu = 4" class="position-relative">
          <router-link
            to="/Profile/OrderMe/Order/Confirm"
            :class="[activeMenu == 4 ? 'activeMenu' : '']"
            class="rounded-pill"
            >ที่ต้องได้รับ
          </router-link>
          <span v-if="countConfirm != 0" class="count">
            {{ countConfirm }}
          </span>
        </div>

        <div @click="activeMenu = 5" class="position-relative">
          <router-link
            to="/Profile/OrderMe/Order/Success"
            :class="[activeMenu == 5 ? 'activeMenu' : '']"
            class="rounded-pill"
            >สำเร็จแล้ว
          </router-link>
          <span v-if="countSuccess != 0" class="count">
            {{ countSuccess }}
          </span>
        </div>

        <div @click="activeMenu = 6" class="position-relative">
          <router-link
            to="/Profile/OrderMe/Order/Error"
            :class="[activeMenu == 6 ? 'activeMenu' : '']"
            class="rounded-pill"
            >ยกเลิกแล้ว
          </router-link>
          <span v-if="countError != 0" class="count"> {{ countError }} </span>
        </div>
      </div>
    </div>

    <div class="overflow-hidden">
      <router-view @Confirm="getCount" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MenuOrder",
  data() {
    return {
      activeMenu: 1,
      dataCount: [],
    };
  },

  methods: {
    getCount() {
      axios
        .post(`${this.$URL}/User/profileOrder.php`, {
          action: "countData",
          id_user: this.$session.get("id_member"),
        })
        .then((res) => {
          this.dataCount = res.data;
        });
    },
  },
  created() {
    this.getCount();
  },
  computed: {
    countAll() {
      let data = this.dataCount;
      let total = 0;
      data.forEach((item) => {
        total += item.COUNT;
      });
      return total;
    },
    countPay() {
      let data = this.dataCount;
      let total = 0;
      let dataFilter = data.filter(
        (item) => item.status_order == 0 || item.status_order == 1
      );
      dataFilter.forEach((item) => {
        total += item.COUNT;
      });
      return total;
    },
    countDelivery() {
      let data = this.dataCount;
      let total = 0;
      let dataFilter = data.filter((item) => item.status_order == 2);
      dataFilter.forEach((item) => {
        total += item.COUNT;
      });
      return total;
    },
    countConfirm() {
      let data = this.dataCount;
      let total = 0;
      let dataFilter = data.filter((item) => item.status_order == 4);
      dataFilter.forEach((item) => {
        total += item.COUNT;
      });
      return total;
    },
    countSuccess() {
      let data = this.dataCount;
      let total = 0;
      let dataFilter = data.filter((item) => item.status_order == 5);
      dataFilter.forEach((item) => {
        total += item.COUNT;
      });
      return total;
    },
    countError() {
      let data = this.dataCount;
      let total = 0;
      let dataFilter = data.filter((item) => item.status_order == 3);
      dataFilter.forEach((item) => {
        total += item.COUNT;
      });
      return total;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(0, 0, 0);
  width: 10rem;
  height: 3rem;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  font-size: 1.1rem;
  transition: 0.3s;
  padding: 1rem 0.5rem;
}
a:hover {
  background-color: #c5604e;
  color: white;
}
.activeMenu {
  background-color: #c5604e;
  color: white;
}
.boxMenu div {
  width: 10rem;
  height: 3rem;
  margin: 0 0.5rem;
}
.boxfixed {
  position: sticky;
  top: 5rem;
}
.count {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  background: #bc201b;
  color: #ffffff;
  border: 0.2rem solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
}
.rounded-pill {
  border: 0.1rem solid #ca8477;
}
</style>
