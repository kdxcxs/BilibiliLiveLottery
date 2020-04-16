<template>
  <div>
    <v-stepper-step :rules="[accessRule]" step="4">
      开奖
      <small>{{ stepErrorMsg }}</small>
    </v-stepper-step>
    <v-stepper-content step="4">
      <p class="display-1 text-center purple--text">中奖名单</p>
      <p class="headline text-center orange--text"
         v-for="uid in this.luckyDogs"
         :key="uid"
         @click="openUserSpace(uids[uid])">
        {{ unames[uids[uid]] }}({{ uids[uid] }})
      </p>
    </v-stepper-content>
  </div>
</template>

<script>
export default {
  name: "Result",
  computed: {
    stepErrorMsg: function () {
      return this.stepNow===4 ? '' : '请先抽奖';
    }
  },
  methods: {
    accessRule: function () {
      return this.stepNow === 4;
    },
    openUserSpace: function (uid) {
      window.open('https://space.bilibili.com/' + uid);
    }
  },
  props: {
    stepNow: Number,
    luckyDogs: Array,
    uids: Array,
    unames: Object
  }
}
</script>

<style scoped>

</style>