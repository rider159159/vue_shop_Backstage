<template>
  <div>
      <Navbar></Navbar>
      <div class="test "></div>
            <a href="#" class="testBtn" @click.prevent="addBlock">123</a>

<Footer></Footer>
  </div>
</template>
<script>
import Navbar from "@/components/font/Navbar";
import Footer from "@/components/font/Footer";

import $ from "jquery";

export default {
    methods: {
      addBlock(){
$('.gg').addClass('d-block')
$('.gg').removeClass()('d-none')

      }
 },
     components: {
    Navbar,
    Footer,
  }
}
</script>