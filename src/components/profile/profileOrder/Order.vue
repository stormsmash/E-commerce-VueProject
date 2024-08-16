<template>
  <div>
    <transition name="fade" mode="out-in">
      <!-- noData -->
      <div v-if="filterList == ''" :key="Num">
        <div
          class="
            my-3
            p-5
            bg-white
            d-flex
            flex-column
            justify-content-center
            align-items-center
            boxnone
          "
        >
          <img src="../../../assets/icon/cartBank.png" alt="" width="150px" />
          <h5 class="mt-3">ยังไม่มีการสั่งซื้อ...</h5>
          <router-link to="/" class="mt-3">
            <button class="btn btnAll rounded-pill">ช้อปปิ้งกันเลย</button>
          </router-link>
        </div>
      </div>
      <!-- noData -->

      <!-- List -->
      <div v-if="filterList" :key="Num">
        <div
          v-for="(item, index) in filterList"
          :key="index"
          class="boxraduis my-3"
        >
          <!-- Top -->
          <div
            class="
              p-0
              m-0
              px-5
              py-1
              d-flex
              justify-content-between
              align-item-center
            "
          >
            <div class="p-0 m-0 textHeader">
              เลขที่ใบสั่งซื้อ #{{ item.id_order }}
              วันที่สั่ง
              {{
                new Date(formatToDate(item.order_date))
                  | dateFormat("DD/MM/YYYY")
              }}
              เวลา {{ formatToTime(item.order_date) }}
            </div>
            <div class="p-0 m-0" v-if="item.status_order == 5">
              <Print
                :data="
                  orderList.filter(
                    (itemlist) => itemlist.id_order == item.id_order
                  )
                "
                :dataList="
                  orderDetail.filter(
                    (itemlist) => itemlist.id_order == item.id_order
                  )
                "
              />
            </div>
          </div>
          <!-- Top -->

          <!-- Body -->
          <div class="row">
            <div
              v-for="(itemlist, index) in orderDetail.filter(
                (itemlist) => itemlist.id_order == item.id_order
              )"
              :key="index"
              class="row ps-3 p0 m-0"
            >
              <!-- show -->
              <hr class="mt-2 lineTop" />

              <div class="row">
                <div class="col-8 d-flex">
                  <img
                    :src="`${$URL}/imgProduct/${itemlist.img_product}`"
                    alt=""
                    class="boximg me-3"
                  />
                  <div>
                    <p class="pt-2">{{ itemlist.productName }}</p>
                    <p>จำนวน {{ itemlist.qty }} ชิ้น</p>
                  </div>
                </div>
                <div
                  class="
                    col-4
                    d-flex
                    align-items-center
                    justify-content-end
                    px-5
                  "
                >
                  &#3647;
                  {{ (itemlist.qty * itemlist.productPrice) | numFormat }}
                </div>
              </div>
              <!-- show -->
            </div>
            <hr class="my-4 lineEnd" />
            <div class="boxFooter">
              <div class="d-flex justify-content-end align-items-center px-5">
                <h5 class="me-3">ยอดคำสั่งซื้อทั้งหมด</h5>
                <h4 class="textPrice">
                  &#3647; {{ (item.total + item.deliverPrice) | numFormat }}
                </h4>
              </div>
              <div class="status">
                <div
                  v-if="item.status_order == 0"
                  class="
                    d-flex
                    justify-content-between
                    align-items-center
                    px-5
                    my-3
                  "
                >
                  <p class="p-0 m-0 text-danger fw-bolder">
                    กรุณาชำระเงินภายในวันที่
                    {{
                      new Date(formatToDate(item.date_exe))
                        | dateFormat("DD/MM/YYYY")
                    }}
                    เวลา {{ formatToTime(item.date_exe) }}
                  </p>
                  <div class="row">
                    <btn
                      @click="submitError(item.id_order)"
                      class="btn btnError rounded-pill ms-1"
                    >
                      ยกเลิก
                    </btn>
                    <router-link
                      :to="`/Pay/${item.id_order}`"
                      class="btn btnAll rounded-pill ms-1"
                    >
                      แจ้งชำระเงิน
                    </router-link>
                  </div>
                </div>
                <div v-if="item.status_order == 1" class="jusCenter">
                  <div class="btn btnAll rounded-pill">รอการตรวจสอบ</div>
                </div>
                <div v-if="item.status_order == 2" class="jusCenter">
                  <div class="btn btnAll rounded-pill">รอการจัดส่ง</div>
                </div>
                <div v-if="item.status_order == 3" class="jusCenter">
                  <div class="btn btnError rounded-pill">ไม่สำเร็จ</div>
                </div>
                <div v-if="item.status_order == 4" class="jusBetween">
                  <div>
                    <p>
                      เลขพัสดุ
                      <span v-if="item.order_post == null">xxx-xxx-xxxx </span>
                      <span v-if="item.order_post != ''"
                        >{{ item.order_post }}
                      </span>
                    </p>
                    <p v-if="item.delivery_EXE != null">
                      ยืนยันการรับสินค้าภายในวัน
                      {{
                        new Date(formatToDate(item.delivery_EXE))
                          | dateFormat("DD/MM/YYYY")
                      }}
                    </p>
                  </div>
                  <div
                    @click="submitOrder(item.id_order)"
                    class="btn btnAll rounded-pill"
                  >
                    ยืนยันการรับสินค้า
                  </div>
                </div>
                <div v-if="item.status_order == 5" class="jusBetween">
                  <p>
                    เลขพัสดุ
                    <span v-if="item.order_post == null">xxx-xxx-xxxx </span>
                    <span v-if="item.order_post != ''"
                      >{{ item.order_post }}
                    </span>
                  </p>
                  <div class="btn btnAll rounded-pill">สำเร็จ</div>
                </div>
              </div>
            </div>
          </div>
          <!-- Body -->
        </div>
      </div>
      <!-- List -->
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import Print from "./Print";
export default {
  name: "Order",
  components: {
    Print,
  },
  data() {
    return {
      orderList: [],
      orderDetail: [],
      id_user: this.$session.get("id_member"),
      idMenu: this.$route.params.id,
      Num: 0,
    };
  },
  methods: {
    getOrder() {
      axios
        .post(`${this.$URL}/User/profileOrder.php`, {
          action: "getOrder",
          id_user: this.$session.get("id_member"),
        })
        .then((res) => {
          this.orderList = res.data;
        });
    },
    getDetail() {
      axios
        .post(`${this.$URL}/User/profileOrder.php`, {
          action: "getDetail",
        })
        .then((res) => {
          this.orderDetail = res.data;
        });
    },
    submitOrder(id) {
      this.$swal({
        icon: "info",
        title: "ยืนยันการรับสินค้า",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#1C9E3F",
        cancelButtonText: "ยกเลิก",
        cancelButtonColor: "#EB4247",
      }).then((result) => {
        if (result.isConfirmed) {
          this.confirmOrder(id);
        }
      });
    },
    confirmOrder(id) {
      axios
        .post(`${this.$URL}/User/profileOrder.php`, {
          action: "UpdateOrderConfirm",
          id_order: id,
        })
        .then(() => {
          this.getOrder();
          this.$emit("Confirm");
        });
    },
    submitError(id) {
      this.$swal({
        icon: "error",
        title: "ยกเลิกรายการ",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#1C9E3F",
        cancelButtonText: "ยกเลิก",
        cancelButtonColor: "#EB4247",
      }).then((result) => {
        if (result.isConfirmed) {
          this.errorOrder(id);
        }
      });
    },
    errorOrder(id) {
      axios
        .post(`${this.$URL}/Admin/Orders.php`, {
          action: "UpdateOrder",
          id_order: id,
          status: 3,
        })
        .then(() => {
          this.getOrder();
          this.$emit("Confirm");
        });
    },
    formatToDate(value) {
      var res = value.substring(0, 10);
      var txt = res.replaceAll("-", "/");
      return txt;
    },
    formatToTime(value) {
      var res = value.substring(11, 19);
      return res;
    },
    async print(id) {
      await this.$htmlToPaper(`${id}`);
    },
    changeNum() {
      this.Num = Math.floor(Math.random() * (100 - 1) - 1);
    },
  },

  created() {
    this.getOrder();
    this.getDetail();
    this.$root.$emit("setOrder");
    this.$root.$emit("Order");
    document.title = "Pepensuda Shop OrderMe";
  },
  watch: {
    $route() {
      this.changeNum();
      this.getOrder();
      this.$emit("Confirm");
    },
  },
  computed: {
    filterList() {
      let route = this.$route.params.id;
      let data = this.orderList;

      if (route == "All") {
        data = data.filter((item) => item.status_order >= 0);
      } else if (route == "Pay") {
        data = data.filter(
          (item) => item.status_order == 0 || item.status_order == 1
        );
      } else if (route == "Delivery") {
        data = data.filter((item) => item.status_order == 2);
      } else if (route == "Confirm") {
        data = data.filter((item) => item.status_order == 4);
      } else if (route == "Success") {
        data = data.filter((item) => item.status_order == 5);
      } else if (route == "Error") {
        data = data.filter((item) => item.status_order == 3);
      } else {
        return;
      }
      return data;
    },
  },
};
</script>

<style scoped>
.boximg {
  width: 6.2rem;
}
.textPrice {
  color: #bc2721;
}
.jusCenter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 2.7rem;
}
.jusBetween {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2.7rem;
}
.btnAll {
  background-color: #c5604e;
  font-size: 1.2rem;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 1.1rem;
  width: 13rem;
  height: 2.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnCart:hover {
  background-color: #e8a89c;
  color: white;
}
.btnError {
  cursor: pointer;
  background-color: #ffffff;
  border: 0.02rem solid #bc2721;
  font-size: 1.2rem;
  color: rgb(97, 97, 97);
  padding: 0.5rem 1.5rem;
  border-radius: 1.1rem;
  width: 12rem;
  height: 2.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btnCheck {
  background-color: #cccccc;
  font-size: 1.2rem;
  color: rgb(255, 255, 255);
  padding: 0.5rem 1.5rem;
  border-radius: 1.1rem;
  width: 12rem;
  height: 2.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
a {
  text-decoration: none;
  color: black;
}
.textHeader {
  font-size: 1.1rem;
  font-weight: bold;
}
.lineEnd {
  border: 0.05rem solid !important;
}
.boxFooter {
  background-color: #ffffff;
  padding: 0;
  margin: 0;
}
.boxraduis {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.lineTop {
  width: 70rem;
  margin: 0 auto;
}
</style>
