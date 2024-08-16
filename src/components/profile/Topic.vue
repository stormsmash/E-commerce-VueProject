<template>
  <div class="">
    <div class="topic container-fluid d-flex align-items-center py-3">
      <div class="boxtopic d-flex align-items-center justify-content-between">
        <div class="boximg"><img :src="url" alt="" /></div>
        <div class="line"></div>
        <div class="textTopic">{{ textTopic }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Topic",
  props: {
    Profile: String,
  },
  data() {
    return {
      textTopic: "แก้ไขข้อมูลส่วนตัว",
      id_member: this.$session.get("id_member"),
      url: "",
    };
  },
  methods: {
    getData() {
      axios
        .post(`${this.$URL}/User/member.php`, {
          action: "getData",
          id_member: this.id_member,
        })
        .then((res) => {
          this.url = `${this.$URL}/img/${res.data.img}`;
          if (
            this.url == `${this.$URL}/img/undefined` ||
            this.url == `${this.$URL}/img/null`
          ) {
            this.url = `${this.$URL}/img/preview.png`;
          }
        });
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.$root.$on("getImg", () => {
      this.getData();
    });

    this.$root.$on("Profile", () => {
      this.textTopic = "แก้ไขข้อมูลส่วนตัว";
    });

    this.$root.$on("Address", () => {
      this.textTopic = "แก้ไขที่อยู่";
    });

    this.$root.$on("Repassword", () => {
      this.textTopic = "แก้ไขรหัสผ่าน";
    });
    this.$root.$on("Order", () => {
      this.textTopic = "การสั่งซื้อของฉัน";
    });
  },
};
</script>

<style scoped>
.topic {
  height: 7.5rem;
  background: rgb(255, 255, 255);
}
.boxtopic {
  width: 31rem;
  height: 100%;
}
.boximg {
  width: 5rem;
  height: 5rem;
  margin-left: 7.5rem;
  overflow: hidden;
}
.boximg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.textTopic {
  font-size: 1.5rem;
  width: 15rem;
}
.line {
  width: 0.5rem;
  height: 80%;
  border-right: 0.3rem solid #bc2721;
}
</style>
