<template>
  <div class="box">
    <div class="boxname mt-5">
      {{ data[0].productName }}
    </div>
    <div class="boxprice mt-2">
      &#3647;{{ data[0].productPrice | numFormat }}
    </div>
    <div class="boxview mt-3 text-danger">
      <i class="fas fa-eye"></i> จำนวนการเข้าชม
      {{ data[0].view | numFormat }} ครั้ง
    </div>
    <div class="boxview mt-3 text-danger">
      <i class="fas fa-box-open"></i> ขายแล้ว
      {{ data[0].total ? data[0].total : 0 | numFormat }} ชิ้น
    </div>
    <hr />

    <div class="boxnum mt-5 d-flex align-items-center">
      <button @click="del" :disabled="num == 1" class="btnNum">
        <i class="fas fa-minus"></i>
      </button>
      <input
        type="number"
        v-model="num"
        @input="checkInput"
        @change="checkZero"
      />
      <button @click="add" class="btnNum">
        <i class="fas fa-plus"></i>
      </button>
      <span class="ms-2">จำนวนสินค้า {{ data[0].productNum }} ชิ้น</span>
    </div>
    <p v-if="data[0].productNum == 0" class="text-danger mt-2">
      *ไม่สามารถสั่งซื้อสินค้าได้ เนื่องจากสินค้าหมด
    </p>

    <div class="mt-5 d-flex align-items-center">
      <button
        class="btnCart rounded-pill"
        :disabled="data[0].productNum == 0"
        @click="checkSubmitCart"
      >
        เพิ่มเข้ารถเข็น
      </button>
      <button class="btnHeart ms-3" @click="likeProduct(data[0].id_product)">
        <transition name="like" mode="out-in">
          <div :key="data[0].id_user">
            <i v-if="data[0].id_user" class="fas fa-heart"></i>
            <i v-if="!data[0].id_user" class="far fa-heart"></i>
          </div>
        </transition>
      </button>
    </div>
    <img
      :src="`${$URL}/imgBrand/${data[0].brand_img}`"
      alt=""
      class="mt-3"
      width="150px"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SubmitCart",
  props: {
    data: Array,
    dataNum: {
      Type: Array,
      default: 0,
    },
  },

  data() {
    return {
      num: 1,
      idProduct: this.data[0].id_product,
      idUser: this.$session.get("id_member"),
    };
  },
  methods: {
    add() {
      if (this.sumTotal >= this.numProduct) {
        this.alertSubmit(
          "error",
          `เนื่องจากจำนวนสินค้าไม่เพียงพอ คุณมีสินค้านี้แล้ว ${
            this.sumTotal - 1
          } ชิ้น`
        );
      } else if (this.num >= this.numProduct) {
        this.alertSubmit("error", `เนื่องจากจำนวนสินค้าไม่เพียงพอ`);
      } else {
        this.num++;
      }
    },
    del() {
      this.num--;
    },
    checkInput() {
      if (this.num >= this.numProduct) {
        this.num = this.numProduct;
      }
    },
    checkZero() {
      if (this.num <= 0) {
        this.num = 1;
      }
    },
    checkSubmitCart() {
      if (this.idUser == null) {
        this.$router.push("/Login");
      } else {
        if (this.sumTotal > this.numProduct) {
          this.alertSubmit(
            "error",
            `เนื่องจากคุณเพิ่มสินค้านี้ไว้ในรถเข็นแล้ว ${
              this.sumTotal - 1
            } ชิ้น`
          );
        } else {
          this.submitCart();
        }
      }
    },
    submitCart() {
      axios
        .post(`${this.$URL}/User/cart.php`, {
          id_product: this.data[0].id_product,
          qty: this.num,
          id_user: this.idUser,
          action: "addCart",
        })
        .then(() => {
          this.$swal({
            position: "center",
            icon: `success`,
            html: '<h4 class="textAlert">คุณได้ทำการเพิ่มสินค้าใส่รถเข็นสำเร็จ <i class="fas fa-cart-arrow-down"></i></h4>',
            showConfirmButton: false,
            timer: 1500,
          });
          this.num = 1;
          this.$emit("submitCart");
        });
    },
    alertSubmit(icon, content) {
      this.$swal({
        position: "center",
        icon: `${icon}`,
        title: "ไม่สามารถเพิ่มจำนวนสินค้านี้ได้!",
        text: `${content}`,
        showConfirmButton: true,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#c5604e",
      });
    },

    likeProduct(id) {
      if (this.$session.get("id_member") == null) {
        this.$router.push("/Login");
      } else {
        axios
          .post(`${this.$URL}/User/likeProduct.php`, {
            action: "likeProduct",
            id_product: id,
            id_user: this.$session.get("id_member"),
          })
          .then(() => {
            this.$emit("like");
          });
      }
    },
  },

  created() {
    this.idProduct = this.data[0].id_product;
  },
  computed: {
    sumTotal() {
      if (this.dataNum != "") {
        return parseInt(this.dataNum) + this.num;
      } else {
        return 0;
      }
    },
    numProduct() {
      return parseInt(this.data[0].productNum);
    },
  },
};
</script>

<style scoped>
.box {
  padding-left: 3rem;
}
button {
  background: none;
  border: none;
}
.btnCart {
  background-color: #c5604e;
  font-size: 1.5rem;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1.1rem;
  width: 13rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnCart:hover {
  background-color: #e8a89c;
  color: white;
}
.btnCart:disabled {
  background-color: rgb(204, 204, 204);
  color: #696969;
  border: none;
}
.btnNum {
  background-color: #c5604e;
}
.fa-heart {
  transition: 0.3s;
  color: #c5604e;
}
.fa-heart:hover {
  color: #e8a89c;
}
.btnHeart {
  background-color: none;
  border-radius: 50%;
  height: 3.7rem;
  width: 3.7rem;
}
.btnHeart i {
  font-size: 2rem;
}
.boxnum {
  border: none;
}
.boxnum button {
  width: 2rem;
  height: 2rem;
  color: #fff;
}
.boxnum input {
  width: 6rem;
  height: 2rem;
  text-align: center;
  font-size: 1.1rem;
  border: 0.01rem solid #c5604e;
  padding: 0;
  margin: 0;
  /* border: none; */
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.boxname {
  font-size: 1.5rem;
}
.boxprice {
  font-size: 1.4rem;
  font-weight: bold;
}
.textAlert {
  font-size: 1.4rem;
}
</style>
