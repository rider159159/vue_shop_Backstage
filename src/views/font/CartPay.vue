<template>
  <div>
    <TopArea></TopArea>
    <Navbar></Navbar>
    <Footer></Footer>
    <Scrolltop></Scrolltop>
  </div>
</template>
<script>
import TopArea from "@/components/font/TopArea";
import Navbar from "@/components/font/Navbar";
import Footer from "@/components/font/Footer";
import Scrolltop from "@/components/font/Scrolltop";

export default {
  components: {
    Navbar,
    TopArea,
    Footer,
    Scrolltop
  }
};
</script>