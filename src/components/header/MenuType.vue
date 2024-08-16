<template>
  <div class="col-10 mx-auto boxType p-5 my-5">
    <h2>{{ name }}</h2>
    <div
      class="row d-flex justify-content-center align-items-center mx-auto mt-3"
    >
      <div
        v-if="Folder == 'imgType'"
        class="row d-flex justify-content-center align-items-center"
      >
        <router-link
          :to="`/Product/null/${item[0]}/0`"
          v-for="(item, index) in Data"
          :key="index"
          class="col-md-2 col-sm-6"
        >
          <div
            class="
              m-0 m-md-4
              boxItem
              d-flex
              flex-column
              justify-content-around
              align-items-center
              p-0
              border
            "
          >
            <img :src="`${$URL}/${Folder}/${item[2]}`" alt="" />
            <div class="textinfo">{{ item[1] }}</div>
          </div>
        </router-link>
      </div>

      <div
        v-if="Folder == 'imgBrand'"
        class="row d-flex justify-content-center align-items-center"
      >
        <router-link
          :to="`/Product/null/0/${item[0]}`"
          v-for="(item, index) in Data"
          :key="index"
          class="col-md-2 col-sm-6"
        >
          <div
            class="
              m-0 m-md-4
              boxItem
              d-flex
              flex-column
              justify-content-around
              align-items-center
              p-0
              border
            "
          >
            <img :src="`${$URL}/${Folder}/${item[2]}`" alt="" />
            <div class="textinfo">{{ item[1] }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuType",
  props: {
    name: String,
    Data: Array,
    Folder: String,
  },
  data() {
    return {
      file: "bg-type.jpg",
    };
  },
};
</script>

<style scoped>
.boxType {
  border-radius: 1.25rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0.1rem 0.5rem 0px;
}
.boxItem {
  background: #ffffff;
  background-size: cover;
  background-repeat: no-repeat;
  width: 12rem;
  height: 6rem;
  text-align: center;
  margin-bottom: 0.6rem;
  border-radius: 0.6rem;
  cursor: pointer;
  position: relative;
  /* overflow: hidden; */
}
.boxItem .bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.boxItem img {
  width: 50%;
  height: auto;
  transition: 0.3s ease-in-out;
}
.boxItem p {
  right: 0;
  color: rgb(0, 0, 0);
  font-size: 1.1rem;
}
.textinfo {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  background: #bc201b;
  color: #ffffff;
  opacity: 0;
  transition: 0.5s ease;
  border-radius: 0.6rem;
}
.boxItem:hover > .textinfo {
  opacity: 1;
}

.boxItem:hover > img {
  transform: scale(1.2);
}
a {
  text-decoration: none;
  color: #000000;
}
a:hover p {
  color: #940b03;
}
</style>
