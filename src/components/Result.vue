<template>
  <transition el-fade-in>
    <div v-show="stepNow===4">
      <h1>中奖名单</h1>
      <el-table :data="awardList"
                stripe
                style="width: 100%">
        <el-table-column prop="uid"
                         label="uid"
                         width="100">
        </el-table-column>
        <el-table-column prop="uname"
                         label="昵称">
        </el-table-column>
        <el-table-column label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="primary"
                       @click="sendMessage(scope.row.uid)">
              发送私信
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Result",
  computed: {
    awardList: function () {
      let theList = [];
      this.luckyDogs.forEach((uIndex) => {theList.push({'uid': this.uids[uIndex],
                                                        'uname': this.unames[this.uids[uIndex]]})});
      return theList
    }
  },
  methods: {
    sendMessage: function (uid) {
      window.open('https://message.bilibili.com/#/whisper/mid' + uid);
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
