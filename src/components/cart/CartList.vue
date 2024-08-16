<template>
  <div class="min-vh-100">
    <div class="row bg-white py-3 border boxraduis">
      <div class="col-6 d-flex align-items-center justify-content-start">
        <h2 class="p-0 m-0">รายการสินค้า</h2>
      </div>
      <div class="col-2 text-center boxMenu">ราคา</div>
      <div class="col-2 text-center boxMenu">จำนวน</div>
      <div class="col-2 text-center boxMenu">ยอดรวมสินค้า</div>
    </div>
    <div
      v-for="(item, index) in data"
      :key="index"
      class="row bg-white my-1 border py-2 boxraduis"
    >
      <div
        class="col-6 d-flex align-items-center"
        :class="[item.productNum < item.Total ? 'checkProduct ' : '']"
      >
        <div>
          <img
            :src="`${$URL}/imgProduct/${item.img_product}`"
            alt=""
            width="100px"
          />
        </div>
        <div>
          <p class="ps-3">
            {{ item.productName }}
          </p>
          <p
            v-if="item.productNum < item.Total"
            class="btnCart rounded-pill text-center"
          >
            สินค้าหมด
          </p>
        </div>
      </div>
      <div
        class="
          col-2
          text-center
          d-flex
          justify-content-center
          align-items-center
        "
        :class="[item.productNum < item.Total ? 'checkProduct ' : '']"
      >
        &#3647; {{ item.productPrice | numFormat }}
      </div>
      <div
        class="col-2 d-flex justify-content-center align-items-center"
        :class="[item.productNum < item.Total ? 'checkProduct ' : '']"
      >
        <div class="row">
          <div class="boxnum d-flex align-items-center">
            <button @click="del(index)" :disabled="0 == 1">
              <i class="fas fa-minus"></i>
            </button>
            <input
              type="number"
              :value="item.Total"
              :ref="`input_${index}`"
              readonly
            />
            <input
              type="hidden"
              :value="item.id_product"
              :ref="`id_${index}`"
            />
            <input
              type="hidden"
              :value="item.id_cart"
              :ref="`idCart_${index}`"
            />
            <button @click="add(index)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        class="
          col-2
          position-relative
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <p
          class="text-center p-0 m-0"
          :class="[item.productNum < item.Total ? 'checkProduct ' : '']"
        >
          &#3647;
          <animated-number
            :value="item.productPrice * item.Total"
            :formatValue="formatToPrice"
            :duration="500"
          />
        </p>
        <p class="btnDelete" @click="deleteProduct(index)">
          <i class="fas fa-trash-alt"></i>
        </p>
      </div>
    </div>
    <pre></pre>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import axios from "axios";
export default {
  name: "CartList",
  props: {
    data: Array,
  },
  components: {
    AnimatedNumber,
  },

  data() {
    return {
      id_member: this.$session.get("id_member"),
    };
  },
  methods: {
    del(index) {
      let input = this.$refs["input_" + `${index}`];

      if (input[0].value == 1) {
        return;
      } else {
        input[0].value--;
        let id = this.$refs["id_" + `${index}`];
        let idCart = this.$refs["idCart_" + `${index}`];

        axios
          .post(`${this.$URL}/User/cart.php`, {
            action: "updateCartDel",
            qty: 1,
            id: id[0].value,
            idCart: idCart[0].value,
            id_member: this.id_member,
          })
          .then(() => {
            this.$emit("updateCart");
          });
      }
    },
    add(index) {
      let input = this.$refs["input_" + `${index}`];
      if (input[0].value == this.data[index].productNum) {
        this.$swal({
          icon: "error",
          title: "สินค้ามีจำนวนไม่พอ",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        input[0].value++;
        let id = this.$refs["id_" + `${index}`];
        let idCart = this.$refs["idCart_" + `${index}`];

        axios
          .post(`${this.$URL}/User/cart.php`, {
            action: "updateCartPlus",
            qty: 1,
            id: id[0].value,
            idCart: idCart[0].value,
            id_member: this.id_member,
          })
          .then(() => {
            this.$emit("updateCart");
          });
      }
    },
    deleteProduct(index) {
      let id = this.$refs["id_" + `${index}`];
      let input = this.$refs["input_" + `${index}`];

      this.$swal({
        icon: "error",
        title: "ยืนยันการลบ",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#EB4247",
        cancelButtonText: "ยกเลิก",
        cancelButtonColor: "#1C9E3F",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`${this.$URL}/User/cart.php`, {
              action: "deleteProduct",
              id: id[0].value,
              id_member: this.id_member,
              qty: input[0].value,
            })
            .then(() => {
              this.$emit("updateCart");
              this.$root.$emit("getCount");
            });
        }
      });
    },
    formatToPrice(value) {
      var num1 = `${value.toFixed()}`;
      var number = new Intl.NumberFormat().format(num1);
      return number;
    },
  },
};
</script>

<style scoped>
button {
  background: none;
  border: none;
  border: 0.01rem solid #c5604e;
  background-color: #c5604e;
}
button:focus,
button:active {
  outline: none;
  box-shadow: none;
}
.boxnum {
  border: none;
}
.boxnum button {
  width: 2rem;
  height: 2rem;
  color: rgb(255, 255, 255);
  /* border-radius: 5px; */
}
.boxnum input {
  width: 4rem;
  height: 2rem;
  text-align: center;
  font-size: 1.2rem;
  border: 0.01rem solid #c5604e;
  padding: 0;
  margin: 0;
  border-radius: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.btnDelete {
  font-size: 1.1rem;
  color: #c5604e;
  position: absolute;
  right: 0;
  bottom: -1.1rem;
  padding-right: 1.1rem;
  cursor: pointer;
}
.boxMenu {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
}
.checkProduct {
  filter: grayscale(100%);
  opacity: 0.5;
}
.btnCart {
  background-color: #c5604e;
  border: none;
  font-size: 1.1rem;
  color: white;
  padding: 0.01rem 0.5rem;
  margin-left: 1rem;
  width: 8rem;
  height: 1.8rem;
  border-radius: 1.1rem;
}
</style>
