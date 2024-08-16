<template>
  <div class="containerApp position-relative">
    <HeaderHelp />
    <MenuTop />
    <router-view />
    <FooterMenu />
    <Footer />
    <transition name="fade" mode="out-in">
      <div class="backtoTop" v-show="scY > 500" @click="toTop">
        <i class="far fa-arrow-alt-circle-up"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import HeaderHelp from "./components/header/HeaderHelp";
import MenuTop from "./components/header/MenuTop";
import FooterMenu from "./components/footer/FooterMenu";
import Footer from "./components/footer/Footer";
export default {
  name: "App",
  components: {
    HeaderHelp,
    MenuTop,
    FooterMenu,
    Footer,
  },
  data() {
    return {
      scTimer: 0,
      scY: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
<style>
@import "assets/css/main.css";
.backtoTop {
  position: fixed;
  right: 1rem;
  bottom: 7rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.backtoTop i {
  font-size: 3rem;
  color: #bc201b;
}
</style>
