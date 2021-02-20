 <style scoped>
.swiper-slide {
  position: relative;
}
.swiper-slide:after {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
}
</style>
<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide class="swiper-item1">
      <div class="text" data-aos="fade-down">
        <p class="text-white swiper-title">農產嘉年華滿500送50！</p>
        <h3 class="text-white">降低農漁牧業受疫情衝擊，更強健您的健康！</h3>
      </div>
    </swiper-slide>
    <swiper-slide class="swiper-item2">
      <div class="text" data-aos="fade-up">
        <p class="text-white swiper-title">農產嘉年華滿500送50！</p>
        <h3 class="text-white">降低農漁牧業受疫情衝擊，更強健您的健康！</h3>
      </div>
    </swiper-slide>
    <swiper-slide class="swiper-item3">
      <div class="text" data-aos="fade-down">
        <p class="text-white swiper-title">農產嘉年華滿500送50！</p>
        <h3 class="text-white">降低農漁牧業受疫情衝擊，更強健您的健康！</h3>
      </div>
    </swiper-slide>
    <div class="swiper-button-next swiper-button-white" slot="button-next" ></div>
    <div class="swiper-button-prev swiper-button-white"  slot="button-prev"></div>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import $ from 'jquery';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
// You can also use <link> for styles
AOS.init({
  duration: 2000, // 動畫時間
});
export default {
  name: 'carrousel',
  data() {
    return {
      product: {
        category: 'carousel', // 自訂名稱
      },
      swiperOptions: {
        keyboard: true,
        speed: 1500, // 切換圖片滑動的速度
        loop: true, // 是否循環撥放
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
        },
        // 自動撥放
        autoplay: {
          delay: 30000,
          disableOnInteraction: false,
        },
        on: {
          slideChangeTransitionStart() {
            $('.text').hide(0);
            $('.text')
              .removeClass('aos-init')
              .removeClass('aos-animate');
          },
          slideChangeTransitionEnd() {
            $('.text').show(0);
            AOS.init();
          },
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
