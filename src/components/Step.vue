<template>
  <el-steps :active="stepNow">
    <el-step title="进入直播间" icon="el-icon-video-camera"></el-step>
    <el-step title="记录参与观众" icon="el-icon-edit"></el-step>
    <el-step title="抽奖" icon="el-icon-medal"></el-step>
    <el-step title="开奖" icon="el-icon-tickets"></el-step>
  </el-steps>
</template>

<script>
  export default {
    name: "Step",
    props: {
      stepNow: Number
    }
  }
</script>
