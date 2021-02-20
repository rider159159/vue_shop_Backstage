import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
export default new Vuex.Store({
  // 嚴警模式
  strict: true,
  state: {
    isLoading: false,
    cart: {
      carts: [],
    },
    products: [],

  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getCart(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      axios.get(url).then((response) => {
        console.log(response);
        if (response.data.data) {
          context.commit('CARTS', response.data.data);
          context.commit('LOADING', false);
        }
      });
    },
    removeCart(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true);
      axios.delete(url).then((response) => {
        context.commit('LOADING', false);
        context.dispatch('getCart');
        console.log('刪除購物車項目', response);
      });
    },
    // 使用物件傳，使用物件取解構取值
    addtoCart(context, { id, qty = 1 }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const item = {
        product_id: id,
        qty,
      };
      // context.commit('LOADING', true);
      axios.post(url, { data: item }).then((response) => {
        context.dispatch('getCart');
        // context.commit('LOADING', false);
      });
    },
    getProducts(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      // 因為開啟 namespaced ，所有方法都變區域變數，要讓城市知道現在使用的是全域變數必須添加 root:true
      context.commit('LOADING', true);
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        context.commit('CATEGORIES', response.data.products);
        context.commit('LOADING', false);
      });
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    CARTS(state, payload) {
      state.cart = payload;
    },
    PRODUCTS(state, payload) {
      // 把資料倒在 vuex 上
      state.products = payload;
    },
    CATEGORIES(state, payload) {
      // const categories = new Set();
      // console.log(categories)
      // payload.forEach((item) => {
      //   categories.add(item.category);
      // });
      // state.categories = Array.from(categories);
      state.categories = payload;
    },
  },
  getters: {
    categories: (state) => state.categories,
    isLoading: (state) => state.isLoading,
    cart: (state) => state.cart,
    products: (state) => state.products,

  },
});
