<template>
  <div class="nav-wrap bg-white">
    <!-- 上方 nav -->
    <nav class="navbar container my-4">
      <router-link to="/index" class="logo"></router-link>
      <ul class="ml-auto top-menu">
        <li class>
          <router-link to="/index" class="nav-link">首頁</router-link>
        </li>
        <li class>
          <router-link to="/shop" class="nav-link">商品</router-link>
        </li>
        <li class>
          <router-link to="/about" class="nav-link">關於我們</router-link>
        </li>
        <li>
          <router-link to="/news" class="nav-link">最新消息</router-link>
        </li>
        <div class="cartIcon">
          <a href="#" class>
            <i class="fas fa-shopping-cart"></i>
          </a>
        </div>
      </ul>
      <div class="classy-navbar-toggler">
        <span class="navbarToggler" v-on:click="sideNavbarActive">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <!-- 左側 nav -->
      <div class="side-menu">
        <!-- Close Button -->
        <div class="side-close" v-on:click="sideNavbarActive">
          <div class="cross-wrap">
            <span class="top"></span>
            <span class="bottom"></span>
          </div>
        </div>
        <div class="sidenav">
          <ul>
            <li class="active">
              <router-link to="/index" class="nav-link">首頁</router-link>
            </li>
            <li>
              <router-link to="/shop" class="nav-link">商品</router-link>
            </li>
            <li>
              <router-link to="/about" class="nav-link">關於我們</router-link>
            </li>
            <li>
              <router-link to="/news" class="nav-link">最新消息</router-link>
            </li>
          </ul>
          <!-- Search Icon -->
          <!-- Cart Icon -->
          <div class="cartIcon">
            <a href="#">
              <i class="fas fa-shopping-cart"></i>
              <span>{{Cart.length}}</span>
            </a>
          </div>
        </div>
        <!-- Navbar End -->
      </div>
    </nav>
  </div>
</template>
<script>
import $ from "jquery";
// import "@/navChange";
export default {
  data() {
    return {
      Cart: []
    };
  },
  methods: {
    sideNavbarActive() {
      // $(".navbarToggler").click(function() {
      // console.log(123)
      $(".navbar").toggleClass("active");
      //   event.preventDefault();
      // });
      // $(".close").click(function() {
      // });
    },
    // 添加 fixed-top
    scrollClass() {
      if ($(window).scrollTop() > 50) {
        $(".nav-wrap").addClass("fixed-top");
        $(function() {
          $('[data-toggle="tooltip"]').tooltip();
        });
      } else {
        $(".nav-wrap").removeClass("fixed-top");
      }
    },
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then(response => {
        vm.Cart = response.data.data.carts
        console.log(vm.Cart)

      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollClass);
    this.getCart();
  }
};
</script>