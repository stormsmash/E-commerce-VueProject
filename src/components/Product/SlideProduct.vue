<template>
  <div v-if="data.length" class="px-3">
    <VueSlickCarousel
      ref="c1"
      :asNavFor="$refs.c2"
      v-bind="settings"
      :focusOnSelect="true"
      @beforeChange="syncSliders"
    >
      <div
        v-for="(item, index) in data"
        :key="index"
        class="text-center boxImgTop"
      >
        <inner-image-zoom
          :src="`${$URL}/imgProduct/${item.img_product}`"
          zoomScale="1.5"
        />
      </div>
    </VueSlickCarousel>
    <hr />
    <VueSlickCarousel
      ref="c2"
      :asNavFor="$refs.c1"
      v-bind="settings2"
      :focusOnSelect="true"
      @beforeChange="syncSliders"
    >
      <div v-for="(item, index) in data" :key="index" class="boxImgButtom">
        <img
          :src="`${$URL}/imgProduct/${item.img_product}`"
          alt=""
          class="d-block mx-auto"
        />
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
import InnerImageZoom from "vue-inner-image-zoom";
export default {
  name: "SlideProduct",
  props: {
    data: Array,
  },
  components: {
    VueSlickCarousel,
    "inner-image-zoom": InnerImageZoom,
  },

  data() {
    return {
      settings: {
        arrows: true,
        dots: false,
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
      settings2: {
        arrows: false,
        dots: true,
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    };
  },
  methods: {
    syncSliders(nextPosition) {
      this.$refs["c1"].goTo(nextPosition);
      this.$refs["c2"].goTo(nextPosition);
    },
  },
};
</script>

<style scoped>
button.slick-arrow::before {
  color: black;
}
.slick-dots {
  text-align: right;
}
img {
  width: 100%;
  height: 100%;
}

.boxImgButtom {
  padding: 0.5rem;
  width: 5rem;
  height: 5rem;
}
.boxImgButtom img {
  border: 0.01rem solid #c5604e;
  border-radius: 0.5rem;
  width: 5rem;
  height: 5rem;
  object-fit: contain;
}
</style>
