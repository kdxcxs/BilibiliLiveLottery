<template>
  <transition name="el-fade-in">
    <div v-show="stepNow===1">
      <h1>请输入房间号</h1>
      <el-input
              v-model="roomid"
              type="number"
              placeholder="请输入房间号"
      ></el-input>
      <el-button type="primary"
                 @click="enterRoom(roomid)"
                 round>
        进入房间
      </el-button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RoomChoosing",
  data: () => ({
    roomid: ''
  }),
  props: {
    enterRoom: Function,
    stepNow: Number
  }
}
</script>

<style rel="stylesheet" scoped>
button {
  margin-top: 8px;
}
</style>
