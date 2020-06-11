<template>
  <div>
    <div  id="counter"  class="counter"  data-count="2200">0</div>
    <button @click="run" class="gg">start</button>
    <img src="https://imgur.com/palH4sy" alt="">
  </div>
</template>

<script >
import $ from "jquery";
export default {
  name: "demo",
  methods: {
    run() {
      $(".counter").each(function() {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({ countNum: $this.text() }).animate(
          {
            countNum: countTo
          },
          {
            duration: 3000,
            easing: "linear",
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
              //alert('finished');
            }
          }
        );
      });
    }
  }
};
</script>

<style scoped>
.iCountUp {
  font-size: 12em;
  margin: 0;
  color: #4d63bc;
}
</style>