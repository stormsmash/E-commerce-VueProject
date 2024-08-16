<template>
  <div class="boxraduis mt-3">
    <div>
      <div class="textH">
        ฉันจะเริ่มซื้อของใน ร้าน Pepensuda Shop ต้องทำอย่างไร?
      </div>

      <div class="textH">
        การซื้อสินค้าใน ร้าน Pepensuda Shop ง่ายกว่าที่คุณคิด
        เพียงคุณเลือกสินค้าที่คุณต้องการแล้วทำตามขั้นตอน
      </div>
      <span
        >ในแต่ละขั้นตอนจะนำท่านไปสู่การสั่งซื้อที่สำเร็จได้
        โดยอย่าลืมอ่านรายละเอียดให้ดีก่อนสั่งซื้อทุกครั้ง</span
      >
      <div class="boxH">
        <div class="textH">
          1. ค้นหาสินค้าที่คุณต้องการและการเพิ่มสินค้าใส่ตะกร้า
        </div>
        <span>
          คุณสามารถค้นหาสินค้าที่คุณต้องการได้อย่างหลากหลาย
          ไม่ว่าจะเป็นสินค้าในหน้าแรก, หมวดหมู่สินค้าหรือใช้แถบค้นหาสินค้า
          ซึ่งอยู่ด้านบนสุดของหน้าแรก
        </span>
      </div>
      <div class="textSub">
        1. กดช่องค้นหา และพิมพ์ชื่อสินค้าหรือร้านค้าที่คุณต้องการ
      </div>
      <div class="boxImg">
        <img src="../../assets/help/buy/buy1.png" alt="" />
      </div>
      <div class="textSub">
        2. เมื่อเจอสินค้าที่ต้องการ โดยการกดที่ ปุ่ม สีชมพูรูปรถเข็น
      </div>
      <div class="boxImg">
        <img src="../../assets/help/buy/buy2.png" alt="" />
      </div>
      <div class="textSub">
        3. หากคุณต้องการซื้อสินค้าทันที กรุณากด เพิ่มเข้ารถเข็น
        เมื่อกดแล้วจะมีข้อความยืนยันว่า จะมีข้อความแสดงยืนยันว่า
        <br />
        “คุณได้ทำการเพิ่มสินค้าเข้ารถเข็นสำเร็จ”
        และจะสามารถกลับออกไปเลือกซื้อสินค้าอื่นๆ ได้
        โดยที่มีสินค้าที่เลือกคงอยู่ในรถเข็น
      </div>
      <div class="boxImg">
        <img src="../../assets/help/buy/buy3.png" alt="" />
      </div>
      <div class="textSub">
        หมายเหตุ: หากคุณทำการออกจากหน้าจอนี้โดยที่ไม่มีการกดปุ่ม เพิ่มเข้ารถเข็น
        สินค้าของคุณจะไม่ถูกเก็บอยู่ไว้ในรถเข็น
      </div>
      <div class="textSub">
        4. เมื่อกดปุ่ม เพิ่มไปยังรถเข็น เรียบร้อยแล้ว สินค้าจะถูกไปจัดเก็บใน
        ตะกร้าสินค้าของฉัน
      </div>
      <div class="boxImg">
        <img src="../../assets/help/buy/buy4.png" alt="" />
      </div>
      <hr />
      <div class="boxH">
        <div class="textH">2. การทำการซื้อ</div>
      </div>
      <div class="textSub">
        1. ผู้ซื้อต้องกรอกจำนวนสินค้าที่ต้องการ และกดปุ่ม
        "ดำเนินการสั่งซื้อสินค้า"
      </div>
      <div class="boxImg">
        <img src="../../assets/help/buy/buy5.png" alt="" />
      </div>
      <div class="textSub">
        2. คุณจะมาสู่หน้า ทำการสั่งซื้อ กรุณากด “แก้ไข”
        ที่อยู่ในการจัดส่งเพื่อเพิ่มที่อยู่ในการจัดส่ง และกดปุ่ม
        ดำเนินการสั่งซื้อและชำระเงิน
      </div>
      <div class="boxImg">
        <img src="../../assets/help/buy/buy6.png" alt="" />
      </div>
      <div class="textSub">
        3. กรุณาทำการชำระเงิน จากนั้นแจ้งชำระเงิน
        โดยคุณสามารถเลือกธนาคารที่คุณจะชำระ และกรอกรายละเอียด
        วันที่และเวลาที่โอน จำนวนเงินที่โอน
        <br />
        อัพโหลดรูปภาพหลักฐานการชำระเงิน กรอกเสร็จ กดปุ่ม ส่งหลักฐานการชำระเงิน
        เสร็จสิ้นแล้ว จะขึ้นแจ้งเตือน “แจ้งชำระเงินสำเร็จ”
      </div>
      <div class="boxImg">
        <img src="../../assets/help/buy/buy7.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Buy",

  created() {
    this.$root.$emit("Buy");
  },
};
</script>

<style scoped>
.boxH {
  margin-left: 5rem;
  margin-top: 2rem;
}
.textH {
  font-size: 1.2rem;
  font-weight: 700;
}
.textSub {
  margin-left: 10rem;
  margin-top: 1.5rem;
}
.boxImg {
  width: 50rem;
  height: 25rem;
  margin: 0 auto;
}
.boxImg img {
  width: 100%;
  height: 100%;
}
</style>
