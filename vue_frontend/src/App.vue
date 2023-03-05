<script setup>
import { RouterView } from "vue-router";
import appFooter from './components/appFooter.vue';
import appHeader from "./components/appHeader.vue";
</script>

<script setup>
</script>
<template>
    <appHeader class="header"></appHeader>
    <RouterView class="router_view"></RouterView>
    <appFooter class="footer"></appFooter>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
body{
  font-family: 'Inter', sans-serif;
}
.header{
  height: 5vh !important;
}
.footer{
  height: 5vh !important;
}
.router_view{
  height: 90vh !important;
  width: 100vw !important;
}
body{
  background-color:#111B21;
}
</style>



