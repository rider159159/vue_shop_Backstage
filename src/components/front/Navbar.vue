<template>
  <div>
    <div class="nav-wrap bg-white">
      <!-- 上方 nav -->
      <nav class="navbar container my-4">
        <a href="#" @click.prevent="routerLink('')" class="logo"></a>
        <ul class="ml-auto top-menu">
          <li class>
            <a href="#" @click.prevent="routerLink('')" class="nav-link">首頁</a>
          </li>
          <li class>
            <a href="#" @click.prevent="routerLink('products')" class="nav-link">商品</a>
          </li>
          <li class>
            <a href="#" @click.prevent="routerLink('about')" class="nav-link">關於我們</a>
          </li>
          <li>
            <a href="#" @click.prevent="routerLink('news')" class="nav-link">最新消息</a>
          </li>
          <div class="cartIcon" @click="showModal()">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="cart.carts">{{cart.carts.length}}</span>
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
                <a href="#" @click.prevent="routerLink('index')" class="nav-link">首頁</a>
              </li>
              <li>
                <a href="#" @click.prevent="routerLink('products')" class="nav-link">商品</a>
              </li>
              <li>
                <a href="#" @click.prevent="routerLink('about')" class="nav-link">關於我們</a>
              </li>
              <li>
                <a href="#" @click.prevent="routerLink('news')" class="nav-link">最新消息</a>
              </li>
            </ul>
            <div class="cartIcon" @click="showModal()">
              <span>{{cart.carts.length}}</span>
              <i class="fas fa-shopping-cart"></i>
            </div>
          </div>
          <!-- Navbar End -->
        </div>
      </nav>
    </div>
    <!--有購物車 modal 視窗 -->
    <div
      class="modal fade"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cartModalLabel">有 modal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- 商品資訊 -->
            <table class="table">
              <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="1" class="text-right">總計</td>
                  <td class="text-right">{{ cart.total | currency }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <!-- <router-link class="btn btn-primary" to="/cart">結帳</router-link> -->
            <button type="button" @click="toCart()" class="btn btn-primary">結帳</button>
          </div>
        </div>
      </div>
    </div>
    <!--空 modal 視窗 -->
    <div
      class="modal fade"
      id="nullCartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="nullCartModalLabel">空 modal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click.prevent="toProduct()"
            >前往購物</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    ...mapActions(['getCart']),
    routerLink(to) {
      $('.navbar').removeClass('active');
      this.$router.push(`/${to}`);
      $('html,body').animate(
        {
          scrollTop: 0,
        },
        1000,
      );
    },
    // 切換測選單用
    sideNavbarActive() {
      $('.navbar').toggleClass('active');
    },
    // 添加 fixed-top
    scrollClass() {
      if ($(window).scrollTop() > 50) {
        // 顯示上面那層
        $('.nav-wrap').addClass('fixed-top');
        // 順便開啟 tooltip 功能
        $(() => {
          $('[data-toggle="tooltip"]').tooltip();
        });
      } else {
        $('.nav-wrap').removeClass('fixed-top');
      }
    },
    showModal() {
      const vm = this;
      //  如果購物車，沒有東西出現另一個 modal
      if (vm.cart.carts.length > 0) {
        $(' #cartModal').modal('show');
      } else {
        $('#nullCartModal').modal('show');
      }
    },
    toCart() {
      $('#cartModal').modal('hide');
      $('.navbar').removeClass('active');
      this.$router.push('/cart');
    },
    toProduct() {
      $('#nullCartModal').modal('hide');
      $('.navbar').removeClass('active');
      this.$router.push('/products');
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'cart']),
  },
  mounted() {
    window.addEventListener('scroll', this.scrollClass);
    this.getCart();
  },
};
</script>
