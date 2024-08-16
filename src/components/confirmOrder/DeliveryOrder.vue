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
        <img src="../../assets/icon/box_address.png" alt="" class="icon me-3" />
        <h5>ตัวเลือกการจัดส่ง</h5>
      </div>
      <hr />
      Kerry Express Thailand เคอรี่ เอ็กซ์เพรส
      <!-- <p class="boxedit" v-b-modal.modal-delivery>แก้ไข</p> -->
    </div>

    <!-- Modal Edit -->
    <b-modal
      id="modal-delivery"
      ref="modal-delivery"
      hide-footer
      centered
      title="แก้ไขข้อมูลที่อยู่"
      size="lg"
    >
      <div class="">
        <button
          class="btnCart rounded-pill ms-auto d-block mt-3"
          @click="$bvModal.hide('modal-delivery')"
        >
          ตกลง
        </button>
      </div>
    </b-modal>

    <!-- Modal Edit -->
  </div>
</template>

<script>
export default {
  name: "DeliveryOrder",
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
