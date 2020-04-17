<template>
  <transition name="el-fade-in">
    <div v-show="stepNow===2">
      <h1>当前已有</h1>
      <h2>{{ involvedInTotal }}</h2>
      <h1>名观众参与</h1>
      <el-button type="primary" @click="stopRec" round>停止记录</el-button>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Recording",
    props: {
      stepNow: Number,
      involvedInTotal: Number,
      stopRec: Function
    }
  }
</script>
