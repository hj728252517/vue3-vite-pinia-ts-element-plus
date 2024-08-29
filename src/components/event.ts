/*
 * @Author: FL 728252517@qq.com
 * @Date: 2024-07-29 18:24:35
 * @LastEditors: FL 728252517@qq.com
 * @LastEditTime: 2024-07-29 18:24:42
 * @FilePath: \vue3\my-vue-app\src\components\event.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}