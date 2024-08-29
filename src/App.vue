<!--
 * @Author: FL 728252517@qq.com
 * @Date: 2024-07-26 15:22:35
 * @LastEditors: FL 728252517@qq.com
 * @LastEditTime: 2024-07-31 15:27:07
 * @FilePath: \vue3\my-vue-app\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: FL 728252517@qq.com
 * @Date: 2024-07-26 15:22:35
 * @LastEditors: FL 728252517@qq.com
 * @LastEditTime: 2024-07-30 11:25:13
 * @FilePath: \vue3\my-vue-app\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <HelloWorld />
  <TableWor :postFontSize @enlarge-text="postFontSize += 1" v-model:first-name="msg" />
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
  {{ msg }}
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
import HelloWorld from './components/HelloWorld.vue'
import TableWor from './components/TableWor.vue'
const postFontSize = ref(1)
const msg = ref('Hello World!')
const routes: { [key: string]: any } = {
  '/': Home,
  '/about': About
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>
<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
