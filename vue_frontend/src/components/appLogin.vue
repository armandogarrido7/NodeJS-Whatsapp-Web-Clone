<script setup>
import { useSocketStore } from '../stores/socketStore';
const socketStore = useSocketStore();
useSocketStore.startSocket;
</script>
<template>
    <form class="d-flex flex-column justify-content-center align-items-center p-2 bg-dark text-light" @submit.prevent="socketStore.login">
            <div class="form-group d-flex flex-column">
                <label class="d-flex flex-column gap-2">
                    <span class="text-center">Username</span>
                    <input type="text" class="form-control" v-model="socketStore.username" required>
                </label>
            </div>
            <div class="d-flex flex-column justify-content-center form-group">
                <label class="d-flex flex-column gap-2 mt-3">
                    <span class="text-center">State</span>
                    <input type="text" class="form-control" v-model="socketStore.user_state" required>
                </label>
            </div>
            <div class="form-group d-flex flex-column gap-2 mt-3">
                <span class="text-center">Photo</span>
                <div class="form-group d-flex gap-3 mb-3 flex-wrap">
                    <label class="form-check-label d-flex flex-column ms-2 align-items-center">
                        <img src="../assets/html.svg" class="icon">
                        <input class="form-check-input" type="radio" name="imgRadio" value="html" v-model="socketStore.userImage" checked>
                    </label>
                    <label class="form-check-label d-flex flex-column align-items-center">
                        <img src="../assets/css.svg" class="icon">
                        <input class="form-check-input" type="radio" name="imgRadio" value="css" v-model="socketStore.userImage">
                    </label>
                    <label class="form-check-label d-flex flex-column align-items-center">
                        <img src="../assets/js.svg" class="icon">
                        <input class="form-check-input" type="radio" name="imgRadio" value="js" v-model="socketStore.userImage">
                    </label>
                    <label class="form-check-label d-flex flex-column align-items-center">
                        <img src="../assets/php.svg" class="icon">
                        <input class="form-check-input" type="radio" name="imgRadio" value="php" v-model="socketStore.userImage">
                    </label>
                    <label class="form-check-label d-flex flex-column align-items-center">
                        <img src="../assets/python.svg" class="icon">
                        <input class="form-check-input" type="radio" name="imgRadio" value="python" v-model="socketStore.userImage">
                    </label>
                </div>
            </div>
            <button class="btn btn-success">Login</button>
        </form>
</template>
<style>
.icon{
    width: 64px;
}
</style>
