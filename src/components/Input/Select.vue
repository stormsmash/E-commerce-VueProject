<template>
  <div>
    <div class="group">
      <select
        :name="`${inputname}`"
        :class="{
          checkInput: name,
        }"
        v-model="name"
        @input="v.$touch()"
        @change="resetData"
      >
        <option value="null" selected disabled>--{{ text }}--</option>
        <option v-for="(item, index) in Data" :key="index" :value="item[0]">
          {{ item[1] }}
        </option>
      </select>

      <span class="highlight"></span>
      <span class="bar"></span>
      <label>{{ text }}</label>
      <span class="text-danger" v-if="!v.required && v.$error"
        >กรุณากรอก {{ text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    v: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
    },
    inputname: {
      type: String,
      default: "",
    },
    Data: {
      type: Array,
    },
  },

  methods: {
    resetData() {
      this.$emit(`reset1`);
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
