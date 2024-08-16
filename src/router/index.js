import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("../views/Home.vue");
const Login = () => import("../views/Login.vue");
const Profile = () => import("../views/Profile.vue");
const ProfileMe = () => import("../components/profile/ProfileMe.vue");
const Repassword = () => import("../components/profile/Repassword.vue");
const Address = () => import("../components/profile/Address.vue");
const Product = () => import("../views/Product.vue");
const ProductInfo = () => import("../views/ProductInfo.vue");
const CartMe = () => import("../views/CartMe.vue");
const ConfirmOrder = () => import("../views/ConfirmOrder.vue");
const MenuOrder = () => import("../components/profile/MenuOrder.vue");
const Order = () => import("../components/profile/profileOrder/Order.vue");
const Pay = () => import("../views/Pay.vue");
const Like = () => import("../views/Like.vue");
const Help = () => import("../views/Help.vue");
const Buy = () => import("../components/Help/Buy.vue");
const Cancel = () => import("../components/Help/Cancel.vue");
const PayHelp = () => import("../components/Help/Pay.vue");
const Register = () => import("../components/Help/Register.vue");
const About = () => import("../views/About.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
    children: [
      {
        path: "/Profile/ProfileMe",
        component: ProfileMe,
      },
      {
        path: "/Profile/Address",
        component: Address,
      },
      {
        path: "/Profile/Repassword",
        component: Repassword,
      },
      {
        path: "/profile/OrderMe",
        component: MenuOrder,
        children: [
          {
            path: "/Profile/OrderMe/Order/:id",
            component: Order,
          },
        ],
      },
    ],
  },
  {
    path: "/Product/:text/:type/:brand",
    name: "Product",
    component: Product,
  },
  {
    path: "/ProductInfo/:id",
    name: "ProductInfo",
    component: ProductInfo,
  },
  {
    path: "/CartMe",
    name: "CartMe",
    component: CartMe,
  },
  {
    path: "/ConfirmOrder",
    name: "ConfirmOrder",
    component: ConfirmOrder,
  },
  {
    path: "/Pay/:id",
    name: "Pay",
    component: Pay,
  },
  {
    path: "/Like",
    name: "Like",
    component: Like,
  },
  {
    path: "/Help",
    name: "Help",
    component: Help,
    children: [
      {
        path: "/Help/Buy",
        component: Buy,
      },
      {
        path: "/Help/Cancel",
        component: Cancel,
      },
      {
        path: "/Help/Pay",
        component: PayHelp,
      },
      {
        path: "/Help/Register",
        component: Register,
      },
    ],
  },
  {
    path: "/About",
    name: "About",
    component: About,
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
      behavior: "smooth",
    };
  },
});

export default router;
