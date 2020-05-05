import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import "bootstrap"
import {ValidationObserver, ValidationProvider, extend, localize} from 'vee-validate';
// 將驗證條件引入
import * as rules from 'vee-validate/dist/rules';
// 引入中文化的文件
import TW from 'vee-validate/dist/locale/zh_TW.json';
import App from './App'
import router from './router' //自動找到資料夾中的 index.js 檔案
import './bus'//載入 bus.js這個檔案
import currencyFilter from './filter/currency'
import dateFilter from './filter/date'
// 下四個為 fontAwesome 元件
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { dom } from "@fortawesome/fontawesome-svg-core";

Vue.use(VueAxios, axios)
Vue.filter('currency',currencyFilter)
Vue.filter('date',dateFilter)
Vue.component('Loading',Loading)
// 註冊 vee-validate 全域元件
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
//註冊 fontaAwesome
Vue.component("font-awesome-icon", FontAwesomeIcon);


Vue.config.productionTip = false
// 跨域連結必須添加
axios.defaults.withCredentials = true;
//fontAwesome 設定
dom.watch();
library.add(fas);

// vee-validate 中文化
localize('zh_TW', TW);
//VeeValidate， 將所有驗證條件加入 extend
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 導航首位
// to 是前往哪個網頁，from 是從哪個網頁來，next 是 fn
router.beforeEach((to, from, next) => {
//  是需要驗證的網頁 (to.meta.requiresAuth =true)， post api (確認是否登入)
  if (to.meta.requiresAuth) {
    console.log('是需要驗證的網頁',to)
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then(response => {
    // 驗證成功，進入指定頁面
      if (response.data.success) {
        next()
      }
      // 驗證失敗、沒有驗證，進入 login 頁面
      else{
        next({path:'/login'})
      }
    })
  } else {
    console.log('不需要驗證的網頁',to)
    next()
  }
})
