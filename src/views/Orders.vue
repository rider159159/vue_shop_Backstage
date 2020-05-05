<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <table class="table mt-4">
      <thead>

        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in sortOrder" :key="key">
          <td>{{ item.create_at | date }}</td>
          <td>
            <span v-text="item.user.email" v-if="item.user"></span>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未起用</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :childPaginations="pagination" @emitPagination="getOrders"></Pagination>
  </div>
</template>
<script>
import $ from "jquery";
import Pagination from "../components/Pagination";

export default {
  data() {
    return {
      orders: {},
      pagination: {},
      isNew: false,
      isLoading: false
    };
  },
  methods: {
  // 獲得訂單列表
   getOrders(page = 1) {
      const vm = this;
     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
     this.$http.get(api).then(response => {
             console.log(response)
        // 將獲得的訂單傳遞給 order物件
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    }
  },
  computed: {
    // 整理 order 物件排序，將整理後的排序放置 newOrder，sortOrder 取用 newOrder 的值
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
       newOrder = vm.orders.sort((a, b) => {
            // .is_paid = 有無付款，使用有無付款排序 十
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    }
  },
  created() {
    this.getOrders();
  },
  components: {
    Pagination,
  }
};
</script>