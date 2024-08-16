<template>
  <div class="box">
    <Topic />
    <div class="container-fluid">
      <div class="row mb-5 float-left">
        <div class="boxMenu">
          <MenuTopic />
        </div>
        <div class="boxConten overflow-hidden">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topic from "../components/Help/Topic";
import MenuTopic from "../components/Help/MenuTopic.vue";

export default {
  name: "Help",
  components: {
    Topic,
    MenuTopic,
  },
  data() {
    return {
      img: "",
    };
  },
};
</script>

<style scoped>
.box {
  background-color: #f6f6f6;
}
.boxMenu {
  width: 20%;
  margin-left: 3rem;
}
.boxConten {
  width: 70%;
  margin-left: 0.5rem;
}
</style>
