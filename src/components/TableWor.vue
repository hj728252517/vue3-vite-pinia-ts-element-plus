<template>
  <div class="itxst">
    <button @click="aaa">{{ postFontSize }}</button>
    <button @click="submitForm(88, '')">submit</button>
    <span>My input</span> <input v-model="firstName">
    <div>Mouse position is at: {{ x }}, {{ y }}</div>
    <button @click="store.increment()">
      From B: {{ store.count }}
    </button>
    <div>
      <draggable :list="state.list" ghost-class="ghost" chosen-class="chosenClass" animation="300" @start="onStart"
        @end="onEnd">
        <template #item="{ element }">
          <div class="item">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
    <div>{{ state.list }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useMouse } from './mouse.ts'
import { store } from './store.ts'
import draggable from "vuedraggable";

/*
draggable 对CSS样式没有什么要求万物皆可拖拽
:list="state.list"         //需要绑定的数组
ghost-class="ghost"        //被替换元素的样式
chosen-class="chosenClass" //选中元素的样式
animation="300"            //动画效果
@start="onStart"           //拖拽开始的事件
@end="onEnd"               //拖拽结束的事件
*/
defineProps({
  postFontSize: Number,
})
const { x, y } = useMouse()
const firstName = defineModel('firstName')
const emit = defineEmits({
  // 没有校验
  'enlarge-text': null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      console.log(email)
      console.log(password)
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})
const state = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  list: [
    { name: "www.itxst.com", id: 0 },
    { name: "www.baidu.com", id: 1 },
    { name: "www.google.com", id: 2 },
  ],
});

//拖拽开始的事件
const onStart = () => {
  console.log("开始拖拽");
};

const aaa = () => {
  emit('enlarge-text')
}
const submitForm = (email: any, password: any) => {
  emit('submit', { email, password })
}

//拖拽结束的事件
const onEnd = () => {
  console.log("结束拖拽");
};
onMounted(() => {
  console.log(`the component is now mounted.`)
})
onUnmounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
<style scoped>
.itxst {
  width: 600px;
  display: flex;
}

.itxst>div:nth-of-type(1) {
  flex: 1;
}

.itxst>div:nth-of-type(2) {
  width: 270px;
  padding-left: 20px;
}

.item {
  border: solid 1px #eee;
  padding: 6px 10px;
  text-align: left;
}

.item:hover {
  cursor: move;
}

.item+.item {
  margin-top: 10px;
}

.ghost {
  border: solid 1px rgb(19, 41, 239);
}

.chosenClass {
  background-color: #f1f1f1;
}
</style>