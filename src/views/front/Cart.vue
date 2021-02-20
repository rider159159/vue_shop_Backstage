<template>
  <div>
    <div class="container">
      <div class="row justify-content-center mt-4 d-flex" v-if="cart.carts.length!==0">
        <!--  -->
        <h3>購物車內容</h3>
        <table class="table mt-4">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th width="80">數量</th>
              <th width="120">單價</th>
            </tr>
          </thead>
          <tbody>
            <!-- cart 下有 carts 、 total、final_total ，carts 是購物車中產品 -->
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button class="btn btn-outline-danger" @click="openDelModal(item)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
              <td>
                {{item.product.title}}
                <div class="text-success" v-if="item.coupon">以套用優惠卷</div>
              </td>
              <td class="text-right">{{item.qty}}/{{item.product.unit}}</td>
              <td class="text-right">{{item.total | currency}}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{cart.total | currency}}</td>
            </tr>
            <tr v-if="cart.final_total!==cart.total">
              <td colspan="3" class="text-right text-success">折扣後價格</td>
              <td class="text-right text-success">{{cart.final_total | currency}}</td>
            </tr>
          </tbody>
        </table>
        <!-- 套用優惠卷 -->
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" 
            @click="addCouponCode">
            套用優惠卷
            </button>
          </div>
        </div>

        <h3>結帳表單</h3>
        <!--添加 slim 不會渲染成 span 標籤 -->
        <ValidationObserver slim ref="form">
          <form class="col-md-12" @submit.prevent="createOrder">
            <!--name 錯誤提示顯示的名稱， v-slot 為提供的資訊 ，rules 有哪些驗證方法  -->
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
              <button class="btn btn-block btn-lg btn-primary text-white my-3 rounded-0">
                送出訂單
                </button>
            </div>
          </form>
        </ValidationObserver>
        <!-- 刪除訂單 modal -->
        <div
          class="modal fade"
          id="delCartModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  <span>刪除產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                是否刪除
                <!-- 無法直接使用 {{tempCart.product.title}} -->
                <strong class="text-danger">{{tempCart.product.title}}</strong> 商品(刪除後將無法恢復)。
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="removeCart">確認刪除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      products: [],
      coupon_code: "",
      tempCart: {
        product: {
          title: "",
        },
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    ...mapActions(["getCart"]),
    // 開啟刪除 Modal
    openDelModal(item) {
      this.$set(this, "tempCart", item);
      $("#delCartModal").modal("show");
    },
    // 確認刪除
    removeCart() {
      const vm = this;
      // 刪除的檔案 存在 temCart
      const { id } = vm.tempCart;
      this.$store.dispatch("removeCart", id);
      $("#delCartModal").modal("hide");
    },
    // 套用優惠卷
    addCouponCode() {
      const vm = this;
      // 刪除的檔案 存在 temCart
      const { id } = vm.tempCart;
      const coupon = {
        code: vm.coupon_code,
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log(response);
        this.getOrder();
      });
    },
    // 送出購物訂單
    createOrder() {
      const vm = this;
      const order = vm.form;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      // VeeValidate 表單驗證功能，如果 input 都成功，success 回傳 true ，反之不通過回傳 false
      this.$refs.form.validate().then((success) => {
        if (success) {
          //  表單驗證通過才執行 post api 的動作
          this.$http.post(api, { data: order }).then((response) => {
            console.log("訂單建立", response);
            // 回傳訊息正確，跳轉至購物完成頁面
            if (response.data.success) {
              vm.$router.push(`/cart_over/${response.data.orderId}`);
              console.log(response.data.orderId);
              // vm.$router.push(`/cart_over`);
            }
            vm.isLoading = false;
          });
        } else {
          console.log("欄位不完整");
          vm.isLoading = false;
        }
      });
    },
  },
  computed: {
    ...mapGetters(["isLoading", "cart"]),
  },
  created() {
    this.getCart();
  },
};
</script>
