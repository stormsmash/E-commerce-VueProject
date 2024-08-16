<template>
  <div class="boxSlider">
    <vueper-slides
      class="no-shadow"
      :autoplay="numType.length <= 1 ? false : true"
      duration="3000"
    >
      <vueper-slide
        v-for="(item, i) in numType"
        :key="i"
        :image="`${$URL}/imgSlide/${item.img_slide}`"
      />
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "Slides",
  components: { VueperSlides, VueperSlide },
  props: {
    numType: Array,
  },
  data: () => ({}),
};
</script>

<style>
.boxSliderProduct .vueperslide__content-wrapper {
  border-radius: 1.1rem;
}
.vueperslide__content-wrapper {
  transition: 0.3s all;
}
.boxSliderProduct .vueperslide {
  padding: 1.1rem;
  transition: 0.3s ease-in-out;
  overflow: hidden;
}
.boxSliderProduct .vueperslide--active {
  padding: 0px;
}

.vueperslides__bullets {
  display: flex;
  justify-content: flex-end;
}
.vueperslides__bullet .default {
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  box-shadow: none;
  transition: 0.3s;
  width: 0.5rem;
  height: 0.5rem;
}

.vueperslides__bullet--active .default {
  background-color: #b94242;
}
.vueperslides__arrow {
  color: #b94242;
}
.vueperslides__arrow svg {
  width: 3rem;
}
</style>
