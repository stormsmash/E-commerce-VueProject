<template>
  <div>
    <DatePicker color="red" @input="getDay" locale="th" v-model="day">
      <template @input="getDay" v-slot="{ inputValue, togglePopover }">
        <div class="input-group boxDate">
          <div class="mr-1 d-flex align-items-center" @click="togglePopover()">
            <i class="fas fa-calendar-day"></i>
          </div>
          <input
            :value="inputValue"
            @click="togglePopover()"
            class=""
            readonly
          />
        </div>
      </template>
    </DatePicker>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
export default {
  name: "Date",
  components: { DatePicker },
  props: {
    day: String,
  },
  data() {
    return {
      Date: new Date(),
    };
  },
  methods: {
    getDay() {
      this.$emit("getDay", this.day);
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/input.css";
input {
  border: none;
  background: none;
  height: 2.5rem;
  width: 6.2rem;
  cursor: pointer;
}
input:focus {
  border: none;
  outline: none;
}

i {
  font-size: 1.75rem;
  margin: 0 0.3rem;
  cursor: pointer;
}

.input-group {
  width: 12.5rem;
}
</style>
