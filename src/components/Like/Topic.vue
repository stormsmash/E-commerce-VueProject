<template>
  <div>
    <div class="topic container-fluid d-flex align-items-center">
      <div class="boxtopic d-flex align-items-center justify-content-between">
        <div class="boximg">
          <img src="../../assets/icon/like.png" alt="" />
        </div>
        <div class="line"></div>
        <div class="textTopic">สินค้าที่ถูกใจ</div>
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
  methods: {},
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
}
.textTopic {
  font-size: 1.5rem;
}
.line {
  width: 0.5rem;
  height: 80%;
  border-right: 0.3rem solid #bc2721;
}
</style>
