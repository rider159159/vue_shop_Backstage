<template>
  <div>
    <section class="shop-area section-padding-0-100">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card border-0 shadow-sm">
              <div
                style="height: 150px; background-size: cover; background-position: center"
                :style="{backgroundImage:`url(${product.imageUrl})`}"
              ></div>
              <div class="single-product-area mb-50">
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{ product.category }}</span>
                  <h5 class="card-title">
                    <a href="#" class="text-dark">{{ product.title }}</a>
                  </h5>
                  <p class="card-text">{{ product.content }}</p>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
                    <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                    <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
                  </div>
                  <div class="card-footer d-flex">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm ml-auto"
                      @click.prevent="addToCart(product.id)"
                    >
                      <i class="fas fa-spinner fa-spin"></i>
                      加到購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import $ from 'jquery';

export default {
  data() {
    return {
      Cart: [],
      itemID: '',
      product: {},
    };
  },
  methods: {
    getProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.$http.get(api).then((response) => {
        vm.product = response.data.product;
      });
    },
    addToCart(id, qty = 1) {
      console.log(123);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((respose) => {
        console.log(respose);
      });
      this.getCart();
    },
  },
  created() {
    const vm = this;
    vm.itemID = vm.$route.params.id; 
    vm.getProduct(vm.itemID);
    $('.tooltip').tooltip('hide');
  },
};
</script>
