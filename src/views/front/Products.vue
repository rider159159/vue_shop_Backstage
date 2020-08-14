<template>
  <div>
    <AlertMessage />
    <!-- ##### Contact Area Start ##### -->
    <section class="shop-area section-padding-0-100">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-6 col-lg-4" v-for="item in products" :key="item.id">
            <div class="card border-0 shadow-sm">
              <div
                style="height: 150px; background-size: cover; background-position: center"
                :style="{backgroundImage:`url(${item.imageUrl})`}"
              ></div>
              <div class="single-product-area mb-50">
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                  <h5 class="card-title">
                    <a href="#" class="text-dark">{{ item.title }}</a>
                  </h5>
                  <p class="card-text">{{ item.content }}</p>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                    <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                    <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                  </div>
                  <div class="card-footer d-flex">
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm"
                      @click="toDetail(item.id)"
                    >
                      <!-- <i class="fas fa-spinner fa-spin"></i> -->
                      查看更多
                    </button>

                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm ml-auto"
                      @click.prevent="addtoCart(item.id)"
                    >
                      <!-- <i class="fas fa-spinner fa-spin"></i> -->
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
import AlertMessage from "@/components/back/AlterMessage";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(["getProducts"]),
    toDetail(id) {
      this.$router.push(`/products_detail/${id}`);
    },
    addtoCart(id,qty=1){
        this.$store.dispatch("addtoCart", { id, qty });
    }
  },
  created() {
    this.getProducts();
  },
  computed: {
    ...mapGetters(["isLoading", "categories", "products"]),
  },
  components: {
    AlertMessage,
  },
};
</script>