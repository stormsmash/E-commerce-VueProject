<template>
  <div class="col-10 mx-auto p-0 mt-4 overflow-hidden">
    <div class="row">
      <div class="col-md-8">
        <Slides class="boxSlider" :numType="SlideCenter" />
      </div>
      <div class="col-md-4 mt-2">
        <div class="row">
          <div class="col-12 col-md-12 mb-2">
            <Slides class="boxSlider" :numType="SlideTop" />
          </div>
          <div class="col-12 col-md-12">
            <Slides class="boxSlider" :numType="SlideButtom" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Slides from "./Slides";
export default {
  name: "SlideGroup",
  components: {
    Slides,
  },
  data() {
    return {
      SlideCenter: [],
      SlideTop: [],
      SlideButtom: [],
    };
  },
  methods: {
    getSlideCenter() {
      axios
        .post(`${this.$URL}/Admin/Slide.php`, {
          action: "getSlide",
          name_slide: "Center",
        })
        .then((res) => {
          this.SlideCenter = res.data;
        });
    },
    getSlideTop() {
      axios
        .post(`${this.$URL}/Admin/Slide.php`, {
          action: "getSlide",
          name_slide: "Top",
        })
        .then((res) => {
          this.SlideTop = res.data;
        });
    },
    getSlideButtom() {
      axios
        .post(`${this.$URL}/Admin/Slide.php`, {
          action: "getSlide",
          name_slide: "Buttom",
        })
        .then((res) => {
          this.SlideButtom = res.data;
        });
    },
  },
  created() {
    this.getSlideCenter();
    this.getSlideTop();
    this.getSlideButtom();
  },
};
</script>

<style scoped>
.boxSlider {
  margin: 0 auto;
  border-radius: 1.2rem;
  overflow: hidden;
}
</style>
