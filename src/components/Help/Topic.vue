<template>
  <div class="">
    <div class="topic container-fluid d-flex align-items-center py-3">
      <div class="boxtopic d-flex align-items-center justify-content-between">
        <div class="boximg">
          <img src="../../assets/icon/information.png" alt="" />
        </div>
        <div class="line"></div>
        <div class="textTopic">{{ textTopic }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Topic",
  props: {
    Profile: String,
  },
  data() {
    return {
      textTopic: "สั่งซื้อสินค้า",
      id_member: this.$session.get("id_member"),
    };
  },

  mounted() {
    this.$root.$on("Buy", () => {
      this.textTopic = "สั่งซื้อสินค้า";
    });

    this.$root.$on("Pay", () => {
      this.textTopic = "ช่องทางการชำระเงิน";
    });

    this.$root.$on("Register", () => {
      this.textTopic = "การสมัครสมาชิก";
    });
    this.$root.$on("Cancel", () => {
      this.textTopic = "การยกเลิกการสั่งซื้อ";
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
