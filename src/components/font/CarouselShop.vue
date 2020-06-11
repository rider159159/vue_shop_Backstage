 <style scoped>
.swiper-slide {
  position: relative;
}
.product-meta-data {
  position: absolute;
  bottom: 25%;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
}
.product-meta-data a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 16px;
  margin: 0 10px;
  line-height: 42px;
  opacity: 0;
  transition: all 0.5s;
}
.product-meta-data a:hover {
  background-color: #90ac10;
  color: #fff;
}
.card {
  border: 0;
  margin: 0 10px;
}
.card:hover a {
  opacity: 1;
}
</style>
<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in products" :key="index">
        <div class="card">
          <img :src="item.imageUrl" class="card-img-top" alt />
          <div class="product-meta-data">
            <a href="#" data-toggle="tooltip" data-placement="top" title="詳細資訊">
              <i class="fas fa-search"></i>
            </a>
            <button @click.prevent="addToCart(item.id)">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text">$ {{item.price}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import $ from "jquery";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
// import AOS from "aos";
// import "aos/dist/aos.css"; // You can also use <link> for styles
// AOS.init({
//   duration: 2000 //動畫時間
// });
export default {
  name: "carrousel",
  data() {
    return {
      products: {},
      product: {
        category: "carousel" //自訂名稱
      },
      // swiper 設定
      swiperOption: {
        autoplay: {
          // 自動撥放
          delay: 3000,
          disableOnInteraction: false
        },
        speed: 1000, // 切換速度
        loop: false, // 是否循環撥放
        slidesPerView: 3, // 預設 slider 數量
        spaceBetween: 60, // slider 間隔
        breakpoints: {
          // 斷點
          576: {
            spaceBetween: 30
          }
        },
        pagination: {
          // 頁籤
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true
        },
        navigation: {
          nextEl: ".swiper-button-next", // 下一個按鈕
          prevEl: ".swiper-button-prev" // 上一個按鈕
        }
      }
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page${page}`;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    addToCart(id, qty = 1) {
      console.log(123);
      // const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      // const vm = this;
      // const cart = {
      //   product_id: id,
      //   qty
      // };
      // this.$http.post(api, { data: cart }).then(response => {
      //   console.log(response);
      // });
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  created() {
    this.getProducts();
  },
  mounted() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
};
</script>