<template>
  <transition name="el-fade-in">
    <div v-show="stepNow===3">
      <h1>请选择人抽取人数</h1>
      <el-input
              v-model="goal"
              type="number"
              placeholder="请输入抽取人数"
              max="involvedInTotal"
      ></el-input>
      <el-button type="primary"
                 @click="this.doLottery"
                 round>
        随机抽奖
      </el-button>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Lottery",
    data: () => ({
      goal: 1
    }),
    methods: {
      randomNum: function (minNum, maxNum) {
        // https://www.cnblogs.com/starof/p/4988516.html
        switch (arguments.length) {
          case 1:
            return parseInt(Math.random() * minNum + 1, 10);
          case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          default:
            return 0;
        }
      },
      doLottery: function () {
        this.nextStep();
        let count = 0;
        let randomIndex = 0;
        while (count < this.goal) {
          randomIndex = this.randomNum(0, this.involvedInTotal-1);
          if (!this.luckyDogs.includes(randomIndex)) {
            this.appendLuckier(randomIndex);
            count ++;
          }
        }
      }
    },
    props: {
      stepNow: Number,
      involvedInTotal: Number,
      luckyDogs: Array,
      nextStep: Function,
      appendLuckier: Function
    }
  }
</script>

<style rel="stylesheet" scoped>
  button {
    margin-top: 8px;
  }
</style>
