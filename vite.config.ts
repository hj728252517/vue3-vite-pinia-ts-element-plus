/*
 * @Author: FL 728252517@qq.com
 * @Date: 2024-07-26 15:22:35
 * @LastEditors: FL 728252517@qq.com
 * @LastEditTime: 2024-07-31 10:22:28
 * @FilePath: \vue3\my-vue-app\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite' // 按需自动加载API插件
import postCssPxToRem from 'postcss-pxtorem'
import autoprefixer from 'autoprefixer'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);  // 加载不同环境下的环境变量
  return {
    root: process.cwd(), // 项目根目录（index.html 文件所在的位置）
    base: env.VITE_MODE === 'production' ? './' : '/', // 开发或生产环境服务的公共基础路径。
    // 插件配置
    plugins: [
      VueDevTools(),
      vue(),
      AutoImport({ imports: ["vue", "vue-router"] }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // 开发服务配置
    server: {
      host: '0.0.0.0', // 默认localhost
      port: 9527,
      open: true,
      proxy: {
        // 简写（字符串）
        '/mock': env.VITE_BASE_API,
        // 带选项写法（对象）
        '/api': {
          target: env.VITE_BASE_API,                      // 从环境变量文件取值
          changeOrigin: true,                             // 支持跨域
          rewrite: (path) => path.replace(/^\/api/, ''),  // 路径重写
        },
        // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
        '/socket.io': {
          target: 'ws://localhost:5174',
          // 支持 websocket
          ws: true,  
        },
      }
    },
    resolve: {
      // 文件路径别名，当使用文件系统路径的别名时，请始终使用绝对路径。
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@style': path.resolve(__dirname, './src/assets/style'),
        '@images': path.resolve(__dirname, './src/assets/images'),
      },
      // 导入时想要省略的扩展名列表。 vite官方不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
    },
    css: {
      // 内联的 PostCSS 配置，格式同 postcss.config.js，也可以单独在根目录创建 postcss.config.js 进行配置
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 16, 	 // 1rem的大小
            propList: ['*'], // 需要转换的属性，*代表全部转换
          }),
          autoprefixer({
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8"
            ],
          }),
        ]
      },
    },
    build: {
      outDir: "dist",      // 默认dist，打包后输出文件
      assetsDir: "assets", // 默认assets，指定静态资源存放路径
      sourcemap: true,    // 默认false，是否构建sourcemap文件（生产不需要）
      minify: 'terser',     // vite默认构建是esbuild,需安装terser npm i -D terser
      terserOptions: {
        // 生产环境移除console、debugger
        compress: {
          drop_console: true,   // 默认false
          drop_debugger: true,  // 默认true
        },
      },
    }
  }
})

