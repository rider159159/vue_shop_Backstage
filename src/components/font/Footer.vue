<template>
  <footer class="footer-area">
    <div class="bg-img">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="footer-widget">
              <a href="#">
                <img src="../../../img/core-img/logo2.png" alt />
              </a>
              <p>選擇健康的食材，也可以吃的很美味</p>
              <div class="contact-info">
                <p>
                  <i class="fas fa-map-marker-alt"></i>
                  <span>269宜蘭縣冬山鄉新寮二路</span>
                </p>
                <p>
                  <i class="fas fa-envelope"></i>
                  <span>info.deercreative@gmail.com</span>
                </p>
                <p>
                  <i class="fas fa-phone"></i>
                  <span>0913200133</span>
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-sm-6 col-lg-4">
            <div class="footer-widget">
              <h5>加入我們的社群</h5>
              <div class="footer-social-info">
                <a href="#">
                  <i class="fab fa-facebook-f"></i>
                  <span>Facebook</span>
                </a>
                <a href="#">
                  <i class="fab fa-twitter"></i>
                  <span>Twitter</span>
                </a>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 d-lg-block d-none">
            <div class="footer-widget">
              <h5>最新消息</h5>
              <div class="single-recent-news d-flex">
                <div class="shrink-image">
                  <img src="../../../img/bg-img/5.jpg" alt />
                </div>
                <div class="shrink-content d-flex">
                  <div class="shrink-title">
                    <a href="#">
                      <font>美國牛肉零售價創歷史新高</font>
                    </a>
                  </div>
                  <div class="shrink-date">2020/5/15</div>
                </div>
              </div>
              <div class="single-recent-news d-flex">
                <div class="shrink-image">
                  <img src="../../../img/bg-img/4.jpg" alt />
                </div>
                <div class="shrink-content d-flex">
                  <div class="shrink-title">
                    <a href="#">
                      <font>小農投入有機栽種 田間看到褐頭鷦鶑</font>
                    </a>
                  </div>
                  <div class="shrink-date">2020/5/15</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center py-3 copyright">
      <p>© Copyright 2020 僅為作品無任何商業用途</p>
    </div>
  </footer>
</template>
<script>
export default {
  methods: {
    //  啟動的該提示的函式，最後方會執行移除該提示的函式
    //手動增加的訊息需要自己案 xx 才會消失，若由外部呼叫的 alter 5 秒後會消失
  // 此函示會藉由 event bus 觸發
   updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    // 5秒到了自動移除
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            console.log(item,timestamp)
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    }
  },
}
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>