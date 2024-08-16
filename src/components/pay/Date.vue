<template>
  <div>
    <DatePicker
      color="red"
      v-model="day"
      mode="dateTime"
      is24hr
      @input="getDay"
    >
      <template v-slot:input="{ inputValue, togglePopover }">
        <div class="input-group boxDate">
          <div class="mr-1 d-flex align-items-center" @click="togglePopover">
            <i class="fas fa-calendar-day"></i>
          </div>
          <input
            :value="inputValue"
            @click="togglePopover"
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
  name: "DateComponent",
  components: { DatePicker },
  props: {
    value: String,
  },
  data() {
    return {
      day: this.value || '', // Initialize with prop value if provided
    };
  },
  watch: {
    value(newValue) {
      this.day = newValue;
    }
  },
  methods: {
    getDay(value) {
      this.$emit('input', value); // Emit the input event with the new value
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
