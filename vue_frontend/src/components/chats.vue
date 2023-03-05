<script setup>
import { useSocketStore } from '../stores/socketStore';
import profileBar from './profileBar.vue';
import chatsList from './chatsList.vue';
import groupChat from './groupChat.vue';
import userChat from './userChat.vue';

const socketStore = useSocketStore();
socketStore.startSocket();
</script>
<template>
    <div class="d-flex px-3">
      <div class="d-flex flex-column chat left_part">
        <profileBar></profileBar>
        <chatsList></chatsList>
      </div>
      <div class="no_chat p-2 chat" v-if="socketStore.selectedChat == ''"></div>
      <groupChat v-else-if="socketStore.selectedChat == 'group'"></groupChat>
      <userChat v-else></userChat>
    </div>
</template>
<style>
.profilePic{
  width: 64px !important;
  /*border-radius: 100%;*/
}
.wrapper{
  width: 100%;
  height: 100%;
}
.msg_bar{
  height: 3vh;
  min-height: 48px;
}
i{
  color:white;
}
.wrapper{
  width: 100%;
}
.message{
  background-color:#202C33;
  color:white;
  font-size:small;  
  width: fit-content;
  border-radius: 5px;
  font-size: 16;
  max-width: 80%;
  overflow-wrap: break-word;
}
.user_message{
  background-color: #005C4B !important;
}
.message_preview{
  display: inline-block;
    overflow: hidden;
    white-space: nowrap;
  text-overflow: ellipsis !important;
}
.message_status{
  width: fit-content;
}
#messages{
  background-image: url('../assets/black_background.webp') !important;
  background-size: contain;
  overflow-y: scroll !important;
  height: 70vh !important;
  font-size: 14px;
  font-weight: 400;
  scrollbar-color: rgba(0, 0, 0, .5) rgba(0, 0, 0, 0);
  scrollbar-width: thin;
}
#messages::-webkit-scrollbar {
  -webkit-appearance: none;
  height: 32px;
}

#messages::-webkit-scrollbar:vertical {
  width:10px;
}

#messages::-webkit-scrollbar-button:increment,#messages::-webkit-scrollbar-button {
  display: none;
} 

#messages::-webkit-scrollbar:horizontal {
  height: 5px;
}

#messages::-webkit-scrollbar-thumb {
  background-color: #323A3F;
}

#messages::-webkit-scrollbar-track {
  border-radius: 10px;  
}
.message_time{
  font-size: 10px;
}
.user_part{
  width: 25%;
}
.chat_part{
  width: 75%;
  height: 100%;
}
.no_chat{
  background-image: url('../assets/bg_dark.jpg') !important;
  background-size: contain;
  height: 100%;
  width: 75%;
}
.router-link-active{
  background-color: #2A3942 !important;
}
.left_part{
  width: 30% !important;
}
.right_part{
  width: 70% !important;
}
</style>