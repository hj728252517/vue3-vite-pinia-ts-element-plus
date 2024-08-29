/*
 * @Author: FL 728252517@qq.com
 * @Date: 2024-07-31 10:24:50
 * @LastEditors: FL 728252517@qq.com
 * @LastEditTime: 2024-07-31 10:26:51
 * @FilePath: \vue3d:\VUE\vue\vue\vue3-vite-pinia-element\src\components\mouse.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event:any) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}