<template>
  <div>
    <div class="group">
      <input
        :type="`${inputtype}`"
        :name="`${inputname}`"
        :class="{
          checkInput: name,
        }"
        v-model="name"
        @input="v.$touch()"
      />
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>{{ text }}</label>
      <span class="text-danger" v-if="!v.required && v.$error"
        >กรุณากรอก {{ text }}
      </span>
      <span class="text-danger" v-if="!v.minLength">
        {{ v.$params.minLength.min }} ตัวอักษรขึ้นไป
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    value: {
      type: String,
      default: "",
    },
    v: {
      type: Object,
      required: true,
      minLength: true,
    },
    text: {
      type: String,
    },
    inputname: {
      type: String,
      default: "",
    },
    inputtype: {
      type: String,
      defaule: "text",
    },
  },
  computed: {
    name: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
<style scoped>
@import "../../assets/css/input.css";
</style>
