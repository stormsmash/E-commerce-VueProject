<template>
  <div>
    <div
      class="
        row
        bg-white
        border
        p-3
        ms-3
        boxraduis
        position-relative
        w-100
        boxAddress
      "
    >
      <div class="d-flex align-items-center mb-2">
        <img src="../../assets/icon/address.png" alt="" class="icon me-3" />
        <h5>ที่อยู่ในการจัดส่ง</h5>
      </div>
      <hr />

      <div v-if="AddressActive != 0">
        <p class="m-0 p-0">ชื่อ {{ AddressActive.name }}</p>
        <p class="m-0 p-0">เบอร์โทร {{ AddressActive.phone }}</p>
        <p class="m-0 p-0">ที่อยู่ {{ AddressActive.address }}</p>
        <p class="m-0 p-0">
          ต.{{ AddressActive.TambonName }} อ.{{ AddressActive.DistrictName }}
        </p>
        <p class="m-0 p-0">
          จ.{{ AddressActive.ProvinceThai }} {{ AddressActive.zipcode }}
        </p>
      </div>

      <p class="boxedit" v-b-modal.modal-edit>แก้ไข</p>
    </div>

    <!-- Modal Edit -->
    <b-modal
      id="modal-edit"
      ref="my-modal-edit"
      hide-footer
      centered
      title="แก้ไขข้อมูลที่อยู่"
      size="lg"
    >
      <Address @setAddress="getAddressActive" />
      <div class="px-3">
        <button
          class="btnCart rounded-pill ms-auto d-block mt-3"
          @click="$bvModal.hide('modal-edit')"
        >
          ตกลง
        </button>
      </div>
    </b-modal>

    <!-- Modal Edit -->
  </div>
</template>

<script>
import Address from "../profile/Address.vue";
import axios from "axios";
export default {
  name: "AddressOrder",

  components: {
    Address,
  },

  data() {
    return {
      id_member: this.$session.get("id_member"),
      AddressActive: [],
    };
  },

  methods: {
    getAddressActive() {
      axios
        .post(`${this.$URL}/User/address.php`, {
          action: "getAddressActive",
          id_member: this.id_member,
        })
        .then((res) => {
          this.AddressActive = res.data[0];
          this.$emit("getAddress", res.data[0].id_address);
        });
    },
  },

  created() {
    this.getAddressActive();
  },
};
</script>

<style scoped>
.icon {
  width: 2.8rem;
  padding: 0;
  margin: 0;
}
.boxAddress {
  min-height: 12rem;
}
.boxedit {
  position: absolute;
  width: auto;
  right: 0;
  bottom: -0.5rem;
}
.modal-body > .boxraduis {
  border: none;
  box-shadow: none;
}
.btnCart {
  background-color: #c5604e;
  border: none;
  font-size: 1.1rem;
  color: white;
  padding: 0.3rem 1.8rem;
  width: 6.8rem;
  height: 2.5rem;
}
.btnCart:hover {
  background-color: #e8a89c;
  color: white;
}
</style>
