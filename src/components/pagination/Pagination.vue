<template>
  <div class="">
    <nav class="p-0 m-0">
      <ul class="pagination">
        <!-- back -->
        <li class="page-item">
          <button class="page-link" :disabled="page <= 1" @click="chengPage(1)">
            <i class="fas fa-angle-double-left"></i>
          </button>
        </li>
        <li class="page-item">
          <button
            class="page-link"
            :disabled="page <= 1"
            @click="chengPage(page - 1)"
          >
            <i class="fas fa-angle-left"></i>
          </button>
        </li>
        <!-- back -->

        <div v-if="page > 3" class="d-flex">
          <!-- pre2 -->
          <li class="page-item" v-for="(item, index) in 2" :key="index">
            <button
              class="page-link"
              :class="[item + page - 4 == page ? 'active' : '']"
              v-if="item + page - 4 != 0 && item + page - 4 <= maxPage"
              @click="chengPage(item + page - 4)"
            >
              {{ item + page - 4 }}
            </button>
          </li>
          <!-- pre2 -->
          <!-- 
          <li class="page-ietm">
            <button class="page-link">...</button>
          </li> -->
        </div>

        <!-- center -->
        <li class="page-item" v-for="(item, index) in 3" :key="index">
          <button
            class="page-link"
            :class="[item + page - 2 == page ? 'active' : '']"
            v-if="item + page - 2 != 0 && item + page - 2 <= maxPage"
            @click="chengPage(item + page - 2)"
          >
            {{ item + page - 2 }}
          </button>
        </li>
        <!-- center -->
        <div v-if="page > 3 && page != maxPage" class="d-flex">
          <!-- <li class="page-ietm">
            <button class="page-link">...</button>
          </li> -->

          <!-- pre2 -->
          <li class="page-item" v-for="(item, index) in 2" :key="index">
            <button
              class="page-link"
              :class="[item + page + 1 == page ? 'active' : '']"
              v-if="item + page + 1 != 0 && item + page + 1 <= maxPage"
              @click="chengPage(item + page + 1)"
            >
              {{ item + page + 1 }}
            </button>
          </li>
          <!-- pre2 -->
        </div>
        <!-- next -->
        <li class="page-item">
          <button
            class="page-link"
            :disabled="maxPage == page"
            @click="chengPage(page + 1)"
          >
            <i class="fas fa-angle-right"></i>
          </button>
        </li>
        <li class="page-item">
          <button
            class="page-link"
            :disabled="maxPage == page"
            @click="chengPage(maxPage)"
          >
            <i class="fas fa-angle-double-right"></i>
          </button>
        </li>
        <!-- next -->
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    maxPage: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    chengPage(page) {
      this.$emit("chengPage", page);
    },
  },
};
</script>

<style scoped>
.page-link {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(0.5rem);
  -webkit-backdrop-filter: blur(5rem);
  border: 0.03rem solid rgb(0, 0, 0);
  margin-right: 0.5rem;
  color: #000000;
  width: 2.2rem;
  height: 2.2rem;
}
.page-link:hover {
  background: #f7ab9b;
  color: #000000;
  border: 0.03rem solid rgb(0, 0, 0);
}
.page-link:active,
.page-link:focus {
  color: #000000;
  background: rgba(255, 255, 255, 0.4);
  border: 0.03rem solid rgb(0, 0, 0);
}
.active {
  color: #000000;
  background: #f7ab9b;
  border: 0.03rem solid rgb(0, 0, 0);
}
</style>
