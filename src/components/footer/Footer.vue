<template>
  <div class="bg-color pt-3">
    <div class="container borderBottom pb-3">
      <div class="row">
        <div class="col-md-4">
          <div class="d-flex align-items-center">
            <img src="../../assets/logo.png" alt="" class="logo" />
            <h4 class="mt-3 ms-2">Pepensuda Shop</h4>
          </div>
          <div class="d-flex align-items-center">
            <div>ติดต่อสอบถามข้อมูลเพิ่มเติม 0909723403</div>
          </div>
          <div class="fontsize p-1">
            ร้านตั้งอยู่ที่ 485/5 ทิมเรืองเวช ซอย 3 แขวง <br />
            คลองถนน เขตสายไหม <br />
            กรุงเทพมหานคร 10220 
          </div>
        </div>
        <div class="col-md-3">
          <h4>บริการช่วยเหลือ</h4>
          <div>
            <p class="m-1">
              <router-link to="/Help/Buy">สั่งซื้อสินค้าอย่างไร</router-link>
            </p>
            <p class="m-1">
              <router-link to="/Help/Pay">ช่องทางการชำระเงิน</router-link>
            </p>
            <p class="m-1">
              <router-link to="/Help/Register">สมัครสมาชิกอย่างไร</router-link>
            </p>
            <p class="m-1">
              <router-link to="/Help/Cancel">ยกเลิกการสั่งสินค้า</router-link>
            </p>
          </div>
        </div>
        <div class="col-md-3">
          <h4>รองรับการชำระ</h4>
          <div class="row col-12 mx-auto">
            <div class="col-12">
              <img
                src="../../assets/icon/bankSCB.png"
                alt=""
                class="img-fluid imgBank"
              />
              <img
                src="../../assets/icon/bankKasikron.png"
                alt=""
                class="img-fluid imgBank"
              />
            </div>
            <div class="col-12">
              <img
                src="../../assets/icon/bankKrungthai.png"
                alt=""
                class="img-fluid imgBank"
              />
              <img
                src="../../assets/icon/bankKrungsri.png"
                alt=""
                class="img-fluid imgBank"
              />
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <h4>บริการจัดส่ง</h4>
          <div>
            <img
              src="../../assets/icon/kerryexpress.png"
              alt=""
              class="imgDalivery"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 mx-auto"></div>
    <div class="footerTextCopy container p-2 text-center">@Pepensuda Shop 2022</div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}
a:hover {
  color: #000;
}
.fa-blender-phone {
  font-size: 3rem;
}
.fa-facebook-square {
  font-size: 3rem;
  color: rgb(12, 41, 136);
}
.fontsize {
  font-size: 0.9rem;
}
.bg-color {
  background-color: #f0f0f0;
}
.imgBank {
  width: 3rem;
  height: 3rem;
  padding: 0.5rem 0.5rem;
}
.imgDalivery {
  width: 9.1rem;
  padding: 0.8rem 0.5rem;
}
.borderBottom {
  border-bottom: 0.01rem solid #bc2721;
}
.fa-blender-phone {
  color: #930a00;
}
.logo {
  width: 4rem;
  height: 4rem;
}
</style>
