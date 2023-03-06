<script setup>
import { useSocketStore } from '../stores/socketStore';

const socketStore = useSocketStore();
</script>
<template>
    <div class="d-flex profile_bar justify-content-between align-items-center p-2">
        <img :src="'/assets/' + socketStore.userImage + '.svg'" alt="user_image" class="profilePic">
        <i class="fa-solid fa-gear fa-xl" role="button" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content bg-dark text-light">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Update Profile</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="d-flex flex-column justify-content-center align-items-center mx-5 p-2 text-light" @submit.prevent="socketStore.login">
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
                                <img src='../assets/html.svg' class="icon">
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
                                <img :src="'../assets/python.svg'" class="icon">
                                <input class="form-check-input" type="radio" name="imgRadio" value="python" v-model="socketStore.userImage">
                            </label>
                        </div>
                    </div>    
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" @click="socketStore.updateProfile">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<style>
.profile_bar{
  background-color: #202C33;
  height: 10vh;
}
</style>