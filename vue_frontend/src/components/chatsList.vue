<script setup>
import { useSocketStore } from '../stores/socketStore';
import { RouterLink } from 'vue-router';

const socketStore = useSocketStore();
</script>
<template>
    <RouterLink to="/chat/group" class="d-flex flex-row align-items-center btn btn-dark chat border-bottom-dark w-100" role="button" @click="socketStore.selectChat('group')">
        <img :src="require(/assets/whatsapp.png)" alt="group_image" class="profilePic w-25">
        <div class="d-flex flex-column w-75 ps-2">
            <div class="d-flex justify-content-between w-100">
                <p class="h6">Group</p>
                <div class="message_time text-end">{{ socketStore.getGroupLastMessageTime() }}</div>
            </div>
            <div class="d-flex justify-content-between w-100">
                <div class="text-start align-self-start message_preview w-75">
                    <span v-if="socketStore.getGroupLastMessage().from == socketStore.userId">
                        <svg viewBox="0 0 18 18" height="18" width="18" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 18 18" xml:space="preserve"><path fill="#FFFFFF" d="M17.394,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-0.427-0.388c-0.171-0.167-0.431-0.15-0.578,0.038L7.792,13.13 c-0.147,0.188-0.128,0.478,0.043,0.645l1.575,1.51c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C17.616,5.456,17.582,5.182,17.394,5.035z M12.502,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-2.614-2.556c-0.171-0.167-0.447-0.164-0.614,0.007l-0.505,0.516 c-0.167,0.171-0.164,0.447,0.007,0.614l3.887,3.8c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C12.724,5.456,12.69,5.182,12.502,5.035z"></path></svg>
                    </span>
                    <span v-if="socketStore.getGroupLastMessage() && socketStore.getGroupLastMessage().from == socketStore.userId">
                        You:
                    </span>
                    <span v-else-if="socketStore.getGroupLastMessage()">
                        {{ socketStore.users[socketStore.getGroupLastMessage().from].username }}:
                    </span>
                    <span>
                        {{ socketStore.getGroupLastMessage().text }}
                    </span>
                </div>
                <span v-if="socketStore.messagesNotRead['group']" class="badge rounded-pill text-bg-success">1</span>
            </div>
        </div>
    </RouterLink>
    <div id="user_list h-100 w-100">
        <template :key="user" v-for="user in socketStore.users">
            <RouterLink :to="'/chat/' + user.username" class="d-flex flex-row align-items-center btn btn-dark chat border-bottom-dark w-100" role="button" v-if="user.id != socketStore.userId" @click="socketStore.selectChat(user.id)">
                <img :src="require('src/assets/' + user.img + '.svg')" :alt="user.id + '_image'" class="profilePic w-25">
                <div class="d-flex flex-column w-75 ps-2">
                    <div class="d-flex justify-content-between w-100">
                        <p class="h6">{{ user.username }}</p>
                        <div class="message_time">{{ socketStore.getUserLastMessageTime(user.id) }}</div>
                    </div>
                    <div class="d-flex justify-content-between w-100">
                        <div class="d-flex gap-1 w-75">
                            <div v-if="socketStore.getUserLastMessage(user.id).from == socketStore.userId">
                                <span v-if="socketStore.getUserLastMessage(user.id).seen == true">
                                    <svg viewBox="0 0 18 18" height="18" width="18" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 18 18" xml:space="preserve"><path fill="#53BDEB" d="M17.394,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-0.427-0.388c-0.171-0.167-0.431-0.15-0.578,0.038L7.792,13.13 c-0.147,0.188-0.128,0.478,0.043,0.645l1.575,1.51c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C17.616,5.456,17.582,5.182,17.394,5.035z M12.502,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-2.614-2.556c-0.171-0.167-0.447-0.164-0.614,0.007l-0.505,0.516 c-0.167,0.171-0.164,0.447,0.007,0.614l3.887,3.8c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C12.724,5.456,12.69,5.182,12.502,5.035z"></path></svg>
                                </span>
                                <span v-else>
                                    <svg viewBox="0 0 18 18" height="18" width="18" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 18 18" xml:space="preserve"><path fill="#FFFFFF" d="M17.394,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-0.427-0.388c-0.171-0.167-0.431-0.15-0.578,0.038L7.792,13.13 c-0.147,0.188-0.128,0.478,0.043,0.645l1.575,1.51c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C17.616,5.456,17.582,5.182,17.394,5.035z M12.502,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-2.614-2.556c-0.171-0.167-0.447-0.164-0.614,0.007l-0.505,0.516 c-0.167,0.171-0.164,0.447,0.007,0.614l3.887,3.8c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C12.724,5.456,12.69,5.182,12.502,5.035z"></path></svg>
                                </span>
                            </div>
                            <div class="text-start align-self-start message_preview w-100">{{ socketStore.getUserLastMessage(user.id).text }}</div>
                        </div>
                        <span v-if="socketStore.messagesNotRead[user.id]" class="badge rounded-pill text-bg-success">1</span>
                    </div>
                </div>
                
            </RouterLink>
        </template>   
    </div>
</template>

<style>
.chat{
    background-color:#202C33;
}
</style>