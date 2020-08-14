<template>
  <div>
    <TopArea></TopArea>
    <Navbar></Navbar>
    <div class="my-5 row justify-content-center">
      <!-- 商品資訊 -->
      <form class="col-md-6" @submit.prevent="payOrder">
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
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="1" class="text-right">總計</td>
              <td class="text-right">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
    <div class="my-5 row justify-content-center">
      <ValidationObserver ref="form">
        <form class="col-md-12" @submit.prevent="createOrder">
          <!-- name 錯誤提示顯示的名稱， v-slot 為提供的資訊 ，rules 有哪些驗證方法  -->
          <ValidationProvider name="name" v-slot="{ failed, errors }" rules="required">
            <div class="form-group">
              <label for="username">*收件人姓名</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="form.user.name"
                name="name"
                :class="{ 'is-invalid': failed }"
                placeholder="輸入姓名"
              />
              <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="email" v-slot="{ failed, errors }" rules="required|email">
            <div class="form-group">
              <label for="username">Email</label>
              <input
                type="email"
                class="form-control"
                name="email"
                id="useremail"
                v-model="form.user.email"
                :class="{ 'is-invalid': failed }"
                placeholder="請輸入 Email"
              />
              <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="收件人電話" v-slot="{ failed,errors }" rules="required|numeric">
            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                type="tel"
                class="form-control"
                id="usertel"
                v-model="form.user.tel"
                :class="{ 'is-invalid': failed }"
                placeholder="請輸入電話"
              />
              <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider name="收件人地址" v-slot="{ failed }" rules="required">
            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                type="text"
                class="form-control"
                name="address"
                id="useraddress"
                v-model="form.user.address"
                :class="{ 'is-invalid': failed }"
                placeholder="請輸入地址"
              />
              <span v-if="failed" class="text-danger">地址欄位不得留空</span>
            </div>
          </ValidationProvider>
          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-block btn-lg btn-primary text-white my-3 rounded-0">送出訂單</button>
          </div>
        </form>
      </ValidationObserver>
    </div>

    <Footer></Footer>
    <Scrolltop></Scrolltop>
  </div>
</template>
<script>
import TopArea from "@/components/front/TopArea";
import Navbar from "@/components/front/Navbar";
import Footer from "@/components/front/Footer";
import Scrolltop from "@/components/front/Scrolltop";

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      pagination: {},
      product: {},
      cart: {
        carts: {
          product: {}
        }
      },

      tempCart: {
        product: {
          title: ""
        }
      },
      coupon_code: "",
      status: {
        loadingItem: "" //存放的值就是產品 id
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    // 獲得購物車商品的資料
    getOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        // this.$set(vm, "cart", response.data.data);
        vm.cart = response.data.data;
        console.log(vm.cart);
      });
    },
    // 送出購物訂單
    createOrder() {
      const vm = this;
      const order = vm.form;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      // VeeValidate 表單驗證功能，如果 input 都成功，success 回傳 true ，反之不通過回傳 false
      this.$refs.form.validate().then(success => {
        if (success) {
          //  表單驗證通過才執行 post api 的動作
          this.$http.post(api, { data: order }).then(response => {
            console.log("訂單建立", response);
            // 回傳訊息正確，跳轉至購物完成頁面
            if (response.data.success) {
              vm.$router.push(`/customer_checkorder/${response.data.orderId}`);
            }
            vm.isLoading = false;
          });
        } else {
          console.log("欄位不完整");
          vm.isLoading = false;
        }
      });
    }
  },
  created() {
    this.getOrder();
  },
  components: {
    Navbar,
    TopArea,
    Footer,
    Scrolltop
  }
};
</script>