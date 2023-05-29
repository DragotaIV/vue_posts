<template>
 <navbar>Vue3</navbar>
<div class="app">
  <router-view> </router-view>
</div>
</template>

<script>
import Navbar from "@/components/pages/Navbar"
export default {
components: {
  Navbar
}
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app__btns{
  margin: 15px 0;
display: flex;
justify-content: space-between;
}

.page__wrapper{
  display: flex;
  margin-top: 15px;
}

.page{
  border: 1px solid black;
  padding: 10px;
}

.current_page{
  border: 2px solid teal;
}

/* .observer{
height: 30px;
background: green;
} */
</style>
