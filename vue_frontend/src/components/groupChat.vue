<script setup>
import { useSocketStore } from '../stores/socketStore';

const socketStore = useSocketStore()
</script>
<template>
    <div class="chat_part chat">
        <div class="group_info text-light d-flex align-items-center justify-content-start p-2 gap-3">
            <img src="/src/assets/group.svg" alt="group_image" class="profilePic">
            <h6 class="h6 text-center">Group</h6>
        </div>
        <div class="card p-3 w-100" id="messages">
          <template v-for="msg in socketStore.groupMessages" :key="msg.id">
            <template v-if="!msg['from']">
              <div class="card bg-primary text-light d-flex justify-content-center align-items-center p-2 m-1">
                <h6 class="text-center">{{ msg.text }}</h6>
              </div>
            </template>
            <template v-else-if="msg['from'] == socketStore.userId">
              <div class="message user_message p-2 m-1 align-self-end">
                <!-- <h6 class="h6 text-end" :style="'color:' + socketStore.userColor">{{ socketStore.users[msg.id].username }}</h6> -->
                <div class="text-start">{{ msg.text }}</div>
                <div class="d-flex ms-auto message_status gap-1">
                  <div class="text-end message_time">{{ socketStore.getMessageTime(msg)}}</div>
                  <i class="fa-solid fa-check"></i>
                 </div> 
              </div>
            </template>
            <template v-else>
              <div class="message p-2 m-1 align-self-start">
                <h6 class="h6 text-start" :style="'color:' + socketStore.users[msg.from].color">{{ socketStore.users[msg.from].username }}</h6>
                <div class="text-start">{{ msg.text }}</div>
                <div class="text-end message_time">{{ socketStore.getMessageTime(msg)}}</div>
              </div>
            </template>
          </template>
        </div>
        <div class="w-100 msg_bar py-1 mt-2 d-flex">
          <input type="text" class="form-control me-2" autocomplete="off" placeholder="Enter your message..."  @keydown.enter="socketStore.sendGroupMessage" id="msg_input" v-model="socketStore.msgToSendText">
          <button class="btn btn-success w-25" id="send_msg_btn" :disabled="socketStore.msgToSendText.trim() == ''" @click="socketStore.sendGroupMessage">Send</button>
        </div>
      </div>
</template>
<style>
.group_info{
  background-color:#202C33;
  height: 10vh;
}
</style>