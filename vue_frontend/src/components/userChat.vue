<script setup>
import { useSocketStore } from '../stores/socketStore';

const socketStore = useSocketStore()
</script>
<template>
    <div class="chat_part chat">
        <div class="user_profile text-light d-flex align-items-center justify-content-start p-2 gap-3 btn" data-bs-toggle="modal" data-bs-target="#userInfoModal">
          <div class="modal fade" id="userInfoModal" tabindex="-1" aria-labelledby="userInfoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content bg-dark">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="userInfoModal">User Info</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body card bg-dark d-flex flex-column align-items-center">
                  <img :src="require('/src/assets/' + socketStore.users[socketStore.selectedChat].img + '.svg')" alt="user_image" class="card-img-top round_img">
                    <div class="card-body">
                      <h3 class="card-title text-light">{{ socketStore.users[socketStore.selectedChat].username }}</h3>
                      <p class="card-text text-light">{{ socketStore.users[socketStore.selectedChat].state }}</p>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
            <img :src="require('/src/assets/' + socketStore.users[socketStore.selectedChat].img + '.svg')" alt="group_image" class="profilePic">
            <div class="d-flex flex-column justify-content-around h-100 p-1">
              <h6 class="h6 h-50">{{ socketStore.users[socketStore.selectedChat].username }}</h6>
              <p class="h-50 typing" v-if="socketStore.users[socketStore.selectedChat].typing"> Typing...</p>
            </div>
        </div>
        <div class="card p-3 w-100" id="messages">
          <template v-for="msg in socketStore.privateMessages[socketStore.selectedChat]" :key="msg.id">
            <template v-if="msg['from'] == socketStore.userId">
              <div class="message user_message p-2 m-1 align-self-end">
                <div class="text-start">{{ msg.text }}</div>
                <div class="d-flex ms-auto message_status gap-1 align-items-center">
                  <div class="text-end message_time">{{ socketStore.getMessageTime(msg) }}</div>
                  <svg v-if="msg.seen == true" viewBox="0 0 18 18" height="18" width="18" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 18 18" xml:space="preserve"><path fill="#53BDEB" d="M17.394,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-0.427-0.388c-0.171-0.167-0.431-0.15-0.578,0.038L7.792,13.13 c-0.147,0.188-0.128,0.478,0.043,0.645l1.575,1.51c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C17.616,5.456,17.582,5.182,17.394,5.035z M12.502,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-2.614-2.556c-0.171-0.167-0.447-0.164-0.614,0.007l-0.505,0.516 c-0.167,0.171-0.164,0.447,0.007,0.614l3.887,3.8c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C12.724,5.456,12.69,5.182,12.502,5.035z"></path></svg>
                  <svg v-else viewBox="0 0 18 18" height="18" width="18" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 18 18" xml:space="preserve"><path fill="#FFFFFF" d="M17.394,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-0.427-0.388c-0.171-0.167-0.431-0.15-0.578,0.038L7.792,13.13 c-0.147,0.188-0.128,0.478,0.043,0.645l1.575,1.51c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C17.616,5.456,17.582,5.182,17.394,5.035z M12.502,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-2.614-2.556c-0.171-0.167-0.447-0.164-0.614,0.007l-0.505,0.516 c-0.167,0.171-0.164,0.447,0.007,0.614l3.887,3.8c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C12.724,5.456,12.69,5.182,12.502,5.035z"></path></svg>
                </div> 
              </div>
            </template>
            <template v-else>
              <div class="message p-2 m-1 align-self-start">
                <div class="text-start">{{ msg.text }}</div>
                <div class="text-end message_time">{{ socketStore.getMessageTime(msg) }}</div>
              </div>
            </template>
          </template>
        </div>
        <div class="w-100 msg_bar py-1 mt-2 d-flex">
          <input type="text" class="form-control me-2 input" autocomplete="off" placeholder="Type your message here"  @keydown.enter="socketStore.sendMessage" @keydown="socketStore.isUserTyping(true)" @blur="socketStore.isUserTyping(false)" id="msg_input" v-model="socketStore.msgToSendText">
          <button class="btn btn-success d-flex align-items-center justify-content-center"  id="send_msg_btn" :disabled="socketStore.msgToSendText.trim() == ''" @click="socketStore.sendMessage">
            <i class="text-light fa-solid fa-paper-plane" ></i>
          </button>
        </div>
      </div>
</template>
<style>
.user_profile{
  background-color:#202C33;
  height: 10vh;
}
.typing{
  font-size: 0.75rem;
}
.modal_content{
  height: 80vh !important;
}
.card-img-top{
  width: 20vw !important;
}
.round_img{
  border-radius: 100% !important;
}
#msg_input{
  background-color: #2A3942 !important;
  border:0 !important;
  color:white !important;
  font-size: 16px;
}
#msg_input:focus{
  box-shadow: none !important;
  outline: none !important;
}
</style>