<template>
  <div>
    <TopArea></TopArea>
    <Navbar></Navbar>
    <router-view></router-view>
    <Footer></Footer>
    <Scrolltop></Scrolltop>
  </div>
</template>
<script>
import TopArea from "@/components/front/TopArea";
import Navbar from "@/components/front/Navbar";
import Footer from "@/components/front/Footer";
import Scrolltop from "@/components/front/Scrolltop";
import $ from "jquery";

export default {
  data() {
    return {
      Cart: [],
      itemID: "",
      product: {}
    };
  },
  methods: {
    getProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.$http.get(api).then(response => {
        console.log(response);
        vm.product = response.data.product;
        // vm.$set(vm.product, "buyNum", 1);
      });
    },
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response.data);
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        // this.$set(vm, "cart", response.data.data);
        vm.cart = response.data.data;
        console.log(vm.cart);
      });
    }
  },
  components: {
    Navbar,
    TopArea,
    Footer,
    Scrolltop
  },
  mounted() {
    // 對應 top 的
    $(".tooltip").tooltip("hide");
  }
};
</script>