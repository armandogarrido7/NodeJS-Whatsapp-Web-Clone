import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/appLogin.vue';
import chats from '../components/chats.vue';
import { useSocketStore } from '../stores/socketStore';

const routes = [{
        path: '/',
        component: login,
        beforeEnter: (to, from) => {
        }
    },
    {
        path: '/chats',
        component: chats,
        beforeEnter: (to, from) => {
            if (useSocketStore().username == ""){
                router.push('/');
            }
        }
    },
    {
        path: '/chat/group',
        component: chats,
        beforeEnter: (to, from) => {
            if (useSocketStore().username == ""){
                router.push('/');
            }
        }
    },
    {
        path: '/chat/:id',
        component: chats,
        beforeEnter: (to, from) => {
            if (useSocketStore().username == ""){
                router.push('/');
            }
        }
    }


]

export const router = createRouter({
    history: createWebHistory(),
    routes
})