(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c59331a4"],{"7e15":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"mt-3 min-vh-100 position-relative"},[e("div",{staticClass:"boxraduis"},[e("div",{staticClass:"boxMenu d-flex justify-content-around align-items-center boxfixed"},[e("div",{staticClass:"position-relative",on:{click:function(e){t.activeMenu=1}}},[e("router-link",{staticClass:"rounded-pill",class:[1==t.activeMenu?"activeMenu":""],attrs:{to:"/Profile/OrderMe/Order/All"}},[t._v("ทั้งหมด ")]),0!=t.countAll?e("span",{staticClass:"count"},[t._v(" "+t._s(t.countAll))]):t._e()],1),e("div",{staticClass:"position-relative",on:{click:function(e){t.activeMenu=2}}},[e("router-link",{staticClass:"rounded-pill",class:[2==t.activeMenu?"activeMenu":""],attrs:{to:"/Profile/OrderMe/Order/Pay"}},[t._v("ที่ต้องชำระ ")]),0!=t.countPay?e("span",{staticClass:"count"},[t._v(" "+t._s(t.countPay)+" ")]):t._e()],1),e("div",{staticClass:"position-relative",on:{click:function(e){t.activeMenu=3}}},[e("router-link",{staticClass:"rounded-pill",class:[3==t.activeMenu?"activeMenu":""],attrs:{to:"/Profile/OrderMe/Order/Delivery"}},[t._v("ที่ต้องจัดส่ง ")]),0!=t.countDelivery?e("span",{staticClass:"count"},[t._v(" "+t._s(t.countDelivery)+" ")]):t._e()],1),e("div",{staticClass:"position-relative",on:{click:function(e){t.activeMenu=4}}},[e("router-link",{staticClass:"rounded-pill",class:[4==t.activeMenu?"activeMenu":""],attrs:{to:"/Profile/OrderMe/Order/Confirm"}},[t._v("ที่ต้องได้รับ ")]),0!=t.countConfirm?e("span",{staticClass:"count"},[t._v(" "+t._s(t.countConfirm)+" ")]):t._e()],1),e("div",{staticClass:"position-relative",on:{click:function(e){t.activeMenu=5}}},[e("router-link",{staticClass:"rounded-pill",class:[5==t.activeMenu?"activeMenu":""],attrs:{to:"/Profile/OrderMe/Order/Success"}},[t._v("สำเร็จแล้ว ")]),0!=t.countSuccess?e("span",{staticClass:"count"},[t._v(" "+t._s(t.countSuccess)+" ")]):t._e()],1),e("div",{staticClass:"position-relative",on:{click:function(e){t.activeMenu=6}}},[e("router-link",{staticClass:"rounded-pill",class:[6==t.activeMenu?"activeMenu":""],attrs:{to:"/Profile/OrderMe/Order/Error"}},[t._v("ยกเลิกแล้ว ")]),0!=t.countError?e("span",{staticClass:"count"},[t._v(" "+t._s(t.countError)+" ")]):t._e()],1)])]),e("div",{staticClass:"overflow-hidden"},[e("router-view",{on:{Confirm:t.getCount}})],1)])},a=[],r=s("bc3a"),n=s.n(r),o={name:"MenuOrder",data(){return{activeMenu:1,dataCount:[]}},methods:{getCount(){n.a.post(this.$URL+"/User/profileOrder.php",{action:"countData",id_user:this.$session.get("id_member")}).then(t=>{this.dataCount=t.data})}},created(){this.getCount()},computed:{countAll(){let t=this.dataCount,e=0;return t.forEach(t=>{e+=t.COUNT}),e},countPay(){let t=this.dataCount,e=0,s=t.filter(t=>0==t.status_order||1==t.status_order);return s.forEach(t=>{e+=t.COUNT}),e},countDelivery(){let t=this.dataCount,e=0,s=t.filter(t=>2==t.status_order);return s.forEach(t=>{e+=t.COUNT}),e},countConfirm(){let t=this.dataCount,e=0,s=t.filter(t=>4==t.status_order);return s.forEach(t=>{e+=t.COUNT}),e},countSuccess(){let t=this.dataCount,e=0,s=t.filter(t=>5==t.status_order);return s.forEach(t=>{e+=t.COUNT}),e},countError(){let t=this.dataCount,e=0,s=t.filter(t=>3==t.status_order);return s.forEach(t=>{e+=t.COUNT}),e}}},c=o,u=(s("e863c"),s("2877")),l=Object(u["a"])(c,i,a,!1,null,"d0624b22",null);e["default"]=l.exports},c8a2:function(t,e,s){},e863c:function(t,e,s){"use strict";s("c8a2")}}]);
//# sourceMappingURL=chunk-c59331a4.f26e544e.js.map