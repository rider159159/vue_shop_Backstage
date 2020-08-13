<template>
  <div>
    <button
      type="button"
      class="btn btn-secondary"
      data-toggle="tooltip"
      data-placement="top"
      title="Tooltip on top"
      @click="test()"
    >123</button>
              <div class="d-block my-3">
            <div class="custom-control custom-radio">
              <input id="method1" name="paymentMethod" type="radio" class="custom-control-input" />
              <label class="custom-control-label" for="method1">Credit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="method2" name="paymentMethod" type="radio" class="custom-control-input" />
              <label class="custom-control-label" for="method2">Debit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="method3" name="paymentMethod" type="radio" class="custom-control-input" />
              <label class="custom-control-label" for="method3">Paypal</label>
            </div>
              </div>
  </div>

</template>
<script>
import $ from "jquery";

export default {
  methods: {
    test() {
      const vm = this;
      vm.$store.dispatch("getProducts");
    },
    addBlock() {
      $(".gg").addClass("d-block");
      $(".gg").removeClass()("d-none");
    },
  },
  mounted() {},
};
</script>