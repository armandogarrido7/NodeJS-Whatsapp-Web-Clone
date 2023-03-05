import { defineStore } from "pinia";
import io from "socket.io-client";
import { router } from '../router/router.js';

export const useSocketStore = defineStore("SocketStore", {
    state: () => {
        return {
            socket : "",
            userId : "",
            userColor : "",
            username:"",
            user_state:"",
            userImage:"html",
            users : [],
            groupMessages : [],
            privateMessages:{},
            msgToShow: {},
            msgToSendText: "",
            selectedChat: "",
            messagesNotRead: {}
        }
    },
    getter:{
        getSocket(){
            return this.socket;
        }
    },
    actions:{
        startSocket(){
            this.socket = io('http://127.0.0.1:3001');
            this.socket.on('setUserParams', ( user_id, color ) =>{
                this.userId = user_id;
                this.userColor = color;
            });

            this.socket.emit('userLogin', this.username, this.userImage, this.user_state);

            this.socket.on('updateUsers', (userList) => {
                if (this.selectedChat){
                    if (!userList[this.selectedChat]){
                        this.selectedChat = '';
                    }
                }
                this.users = userList;
                console.log(this.users);
            });
            this.socket.on('userConnected', (user_id, message) => {
                this.groupMessages.push(
                    {
                        text:message,
                        time: Date.now()
                    }
                );
            });
            this.socket.on('userDisconnected', (user_id, message) => {
                this.groupMessages.push(
                    {
                        text:message,
                        time: Date.now()
                    }
                );
            });
            this.socket.on('newGroupMessage', ( message ) => {
                this.groupMessages.push( message );
                if (this.selectedChat != 'group'){
                    this.messagesNotRead['group'] = true;
                }            
                });
            this.socket.on('messageToUser', (user_id, message) => {
                if (user_id == this.selectedChat){
                    this.socket.emit('msgRead', this.selectedChat);
                }
                if(this.privateMessages[user_id]){
                    this.privateMessages[user_id].push( message );
                } else {
                    this.privateMessages[user_id] = [ message ];
                }
                if (this.selectedChat != user_id){
                    this.messagesNotRead[user_id] = true;
                }
            });
            this.socket.on('msgRead', (user_id) => {
                for (let msg of this.privateMessages[user_id]){
                    if (msg.from == this.userId){
                        msg.seen = true;
                    }
                }
            });
            this.socket.on('isUserTyping', (user_id, state) => {
                console.log('el otro usuario esta escribiendo');
                this.users[user_id].typing = state;
                console.log(this.users[user_id]);
            });
        },
        sendGroupMessage(){
            let message = {
                to:this.selectedChat,
                from:this.userId,
                text:this.msgToSendText,
                time:Date.now(),
                seen: false
            }
            this.socket.emit('sendGroupMessage', message);
            this.msgToSendText = '';
        },
        sendMessage(){
            let message = {
                to:this.selectedChat,
                from:this.userId,
                text:this.msgToSendText,
                time:Date.now(),
                seen: false
            }
            if(this.privateMessages[this.selectedChat]){
                this.privateMessages[this.selectedChat].push( message );
            } else {
                this.privateMessages[this.selectedChat] = [ message ];
            }
            this.socket.emit('messageToUser', message, this.selectedChat);
            this.msgToSendText = '';
        },
        login(){
            router.push('/chats')
        },
        updateProfile(){
            this.socket.emit('updateProfile', this.username, this.userImage);
        },
        selectChat(chat){
            this.selectedChat = chat;
            this.messagesNotRead[chat] = false;
            if (this.privateMessages[this.selectedChat]){
                this.socket.emit('msgRead', this.selectedChat);
            }
        },
        getUserLastMessage(user_id){
            let message = '';
            let user_messages = this.privateMessages[user_id];
            if (user_messages) {
                message = user_messages[user_messages.length-1];
            }
            return message;
        },
        getUserLastMessageTime(user_id){
            let date_text = '';
            let user_messages = this.privateMessages[user_id];
            if (user_messages){
                let date = new Date(user_messages[user_messages.length-1].time);
                // date_text = date.getHours() + ':' + date.getMinutes();
                date_text = ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2)
            }
            return date_text;
        },
        getGroupLastMessage(){
            let message = '';
            let group_messages = this.groupMessages.filter((msg) => {
                if ( msg.to ) return true
            });
            if ( group_messages.length > 0){
                message = group_messages[ group_messages.length - 1 ]
            }
            return message;
        },
        getGroupLastMessageTime(){
            let date_text = '';
            let message = this.getGroupLastMessage();
            if ( message ){
                let date = new Date( message.time );
                date_text = ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);
            }
            return date_text;
        },
        isUserTyping(state){
            this.socket.emit('isUserTyping', this.selectedChat, state);
            console.log('usuario escribiendo');
        },
        getMessageTime(message){
            let date = new Date( message.time );
            return ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);
        }
    }
})