<template>
  <div class="navbar px-1">
    <div class="d-flex align-items-centers">
      <a
        target="_blank"
        href="https://www.facebook.com/ppsdss/"
      >
        <div>
          สามารถสอบถามพวกเราได้บน
          <i class="fab fa-facebook"></i>
        </div>
      </a>
    </div>
    <div class="ml-auto d-flex align-items-centers">
      <div class="d-flex align-items-centers mx-2">
        <router-link to="/About">
          <div><i class="fas fa-users px-1"></i>เกี่ยวกับเรา</div>
        </router-link>
      </div>
      <div class="d-flex align-items-centers mx-2">
        <router-link to="/Help/Buy">
          <div><i class="fas fa-question-circle px-1"></i>ช่วยเหลือ</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderHelp",
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
a:hover {
  color: #fff;
}
.navbar {
  background: #5c2a17;
  color: #fff;
}
i {
  font-size: 1rem;
  color: #fff;
}
.fa-facebook {
  color: #fff;
}
.fa-users,
.fa-question-circle {
  color: #fff;
}
</style>
