<template>
  <div id="page-container">
    <step :stepNow="currentStep"></step>
      <room-choosing :enter-room="enterRoom"
                     :step-now="currentStep"
                     class="contents">
      </room-choosing>
      <recording :step-now="this.currentStep"
                 :involved-in-total="this.involvedUid.length"
                 :stop-rec="this.stopRecording"
                 class="contents">
      </recording>
      <lottery :step-now="this.currentStep"
               :involved-in-total="this.involvedUid.length"
               :lucky-dogs="this.luckyDogs"
               :next-step="()=>{this.currentStep ++}"
               :append-luckier="appendUser"
               class="contents">
      </lottery>
      <result :step-now="this.currentStep"
              :lucky-dogs="this.luckyDogs"
              :uids="this.involvedUid"
              :unames="this.involvedUname"
              class="contents">
      </result>
  </div>
</template>

<script>
document.title = 'BiliBili直播弹幕抽奖';

import connect from "./websocketClient/BiliLiveWs";
import Step from "./components/Step";
import RoomChoosing from "./components/RoomChoosing";
import Recording from "./components/Recording";
import Lottery from "./components/Lottery";
import Result from "./components/Result";
import { Loading } from 'element-ui';

export default {
  name: 'App',
  components: { Step, RoomChoosing, Recording, Lottery, Result },
  data: () => ({
    currentStep: 1,
    roomid: 0,
    inRoom: false,
    recording: false,
    involvedUid: [], // 所有参与用户的uid
    involvedUname: {}, // 所有参与用户的用户名
    luckyDogs: [],
    loadingInstance: Object
  }),
  methods: {
    enterRoom: function (rid) {
      this.recording = true;
      this.roomid = parseInt(rid);
      this.connectWs();
      this.currentStep ++;
      this.loadingInstance = Loading.service({target: 'html',
                                                       text: '正在进入直播间'
      });
    },
    stopRecording: function () {
      this.recording = false;
      this.currentStep ++;
    },
    appendUser: function (luckyIndex) {
      this.luckyDogs.push(luckyIndex);
    },
    onDanmu: function (userInfo) {
      if (this.recording && !this.involvedUid.includes(userInfo[2][0])){
        if (!this.inRoom) {
          this.inRoom = true;
          this.loadingInstance.close();
        }
        this.involvedUid.push(userInfo[2][0].toString());
        this.involvedUname[userInfo[2][0]] = userInfo[2][1];
      }
    },
    connectWs: function () {
      connect(this.roomid, this.onDanmu);
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
html {
  height: 100vh; /* 不加的话Loading覆盖不完 */
  width: 100vw;
}

/* 不absolute的话在切换step的时候会因为两个组件一起显示导致后面一步在前一步消失后才闪现到正确位置 */
.contents {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}

@media (min-width: 1024px) {
  #page-container {
    width: 1000px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }

  .contents {
    width: 500px;
  }
}

@media (max-width: 1023px) {
  .contents {
    width: 70vw;
  }
}
</style>
