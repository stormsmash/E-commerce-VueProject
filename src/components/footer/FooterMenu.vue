<template>
  <div class="boxFooter pt-3 mt-5">
    <!-- <div class="container borderBottom pb-3">
      <div class="row">
        <div v-for="(list, index) in type" :key="index" class="col-md-4">
          <h1>{{ list.name }}</h1>
          <span v-for="(sublist, index) in list.list" :key="index">
            <span v-if="index != 0">,</span> {{ sublist }}
          </span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "FooterMenu",

  data() {
    return {
      type: [
        { name: "Type1", list: ["test1", "test3"] },
        { name: "Type2", list: ["test1", "test2", "test3", "test1"] },
        {
          name: "Type3",
          list: ["test1", "test2", "test3", "test2", "test3"],
        },
        {
          name: "Type4",
          list: ["test1", "test2", "test3", "test3"],
        },
        {
          name: "Type5",
          list: ["test1", "test1", "test2", "test3"],
        },
        {
          name: "Type6",
          list: ["test1", "test2", "test1", "test2", "test3"],
        },
      ],
    };
  },
};
</script>

<style scoped>
.boxFooter {
  background-color: #f0f0f0;
  border-top: 0.01rem solid #bc2721;
}
.borderBottom {
  border-bottom: 0.01rem solid #bc2721;
}
</style>
