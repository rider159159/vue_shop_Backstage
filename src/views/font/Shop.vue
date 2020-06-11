<template>
  <div>
    <Navbar></Navbar>
    <!-- ##### Contact Area Start ##### -->
    <section class="shop-area section-padding-0-100">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-6 col-lg-4" v-for="item in products" :key="item.id">
            <div class="single-product-area mb-50">
              <!-- Product Thumbnail -->
              <div class="product-thumbnail">
                <div
                  style="height: 150px; background-size: cover; background-position: center"
                  :style="{backgroundImage:`url(${item.imageUrl})`}"
                ></div>
                <!-- Product Tags -->
                <span class="product-tags">Hot</span>
                <!-- Product Meta Data -->
                <div class="product-meta-data">
                  <a href="#" data-toggle="tooltip" data-placement="top" title="Favourite">
                    <i class="icon_heart_alt"></i>
                  </a>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="Add To Cart">
                    <i class="icon_cart_alt"></i>
                  </a>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="Compare">
                    <i class="arrow_left-right_alt"></i>
                  </a>
                </div>
              </div>
              <!-- Product Description -->
              <div class="product-desc text-center pt-4">
                <a href="#" class="product-title">Strawberry</a>
                <h6 class="price">$17.99</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ##### Contact Area End ##### -->
  </div>
</template>

<script>
import Navbar from "@/components/font/Navbar";

export default {
  data() {
    return {
      // 用來儲存遠端資料
      products: [],
      //用來儲存本地 modal 中 input 資料
      tempProduct: {},
      pagination: {}
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    }
  },
  created() {
    this.getProducts();
  },
       components: {
    Navbar,
  }
};
</script>