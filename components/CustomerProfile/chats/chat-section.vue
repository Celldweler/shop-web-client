<template>
    <div class="d-flex flex-row border" style="height: 500px;">
        <div class="chats-list border d-flex flex-column" style="height: 500px; width: 305px; overflow: auto">
            <ChatList v-for="chat in chats" :chat="chat" @selectChat="selectChat"></ChatList>
        </div>
        <div v-if="selectedChat===null" class="chating-section border d-flex justify-content-center align-items-center"
            style="height: 500px; width: 600px">
            Select chat to start messaging
        </div>

        <div v-else class="d-flex flex-column" style="width: 900px;">
            <div class="border p-1 pl-3">
                <h5>{{ selectedChat.recipientName }}</h5>
            </div>
            <div id="chat-body" class="chat-body border d-flex flex-column " style="height: 459px;">
                <div class="border m-4 d-flex flex-row align-items-center"
                    style="height: 75px; position: sticky; top: 20px; background-color: whitesmoke">
                    <div>
                        <img :src="`https://localhost:44322/api/files/Img__GLOCKS__JEANS.png`" width="70" height="70"
                            alt="">
                    </div>
                    <div class="ml-2">
                        Вопрос о товаре <a href=""> Цепочка на шею с пистолетом UZI One Size Золотая XS1111 </a>
                        <p>170 ₴</p>
                    </div>
                </div>

                <div class="d-flex flex-row justify-content-center  mb-1 mt-5" style="position: ;">
                    <!-- 31.08.2022 -->
                    {{ selectedChat.created }}
                </div>

                <div v-for="message in selectedChat.messages" :class="message.className" style="position: ;">
                    <div class="border rounded "
                        style="width: 300px;height: ; padding-left: 5px; max-height: 300px; max-width: ; background-color:gainsboro">
                        <h6>{{ message.userName }}: </h6> <span> {{ message.content }} </span>
                        <hr>
                        <small>
                            {{message.created}}
                        </small>
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <div class="d-flex flex-row border">
                    <b-btn>
                        <img
                            src="https://img.icons8.com/external-basicons-line-edtgraphics/30/000000/external-Clip-office-stationery-basicons-line-edtgraphics.png" />
                    </b-btn>
                    <b-form-input v-model="message" placeholder="Напишите сообщение" style="height: 45px;">
                    </b-form-input>
                    <b-btn variant="" @click="addNewMessage()">
                        <img src="https://img.icons8.com/small/24/000000/filled-sent.png" />
                    </b-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChatList from './chat-list.vue';
import Chat from './chat.vue';
// import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr'
export default {
    components: { ChatList, Chat },
    mounted() {
        if (!process.server) {
            // var chatBody = document.getElementById('chat-body');
            // this.chatBodyScrollHeight = chatBody.scrollHeight;
            // console.log(this.chatBodyScrollHeight);
        }
    },
    created() {
        this.$axios.get('chats').then(res => {
            console.log(res);
            this.chats = res.data;

            new Promise((resolve, reject) => {
                this.chats = this.chats.map(x => {
                    return {
                        id: x.id,
                        created: x.created,
                        recipientName: "Администратор",
                        isAdmin: false,
                        messages: x.messages,
                        name: x.name,
                        productId: x.productId,
                        users: x.users,
                        isOpenChatRoom: false,
                        chatClassName: 'white',
                    }
                })

                for (let index = 0; index < this.chats.length; index++) {
                    this.chats[index].messages = this.chats[index].messages.map(x => {
                        if (x.userName === 'Администратор') {
                            return {
                                className: 'mt-2 ml-3 mb-4',
                                id: x.id,
                                content: x.content,
                                userName: x.userName,
                                chatId: x.chatId,
                                created: x.created,
                                productId: x.productId,
                                // edit: x.edit,
                                // isEdit: x.isEdit,
                            }
                        }
                        else {
                            return {
                                className: 'd-flex flex-row justify-content-end mr-3 mb-4',
                                id: x.id,
                                content: x.content,
                                userName: x.userName,
                                chatId: x.chatId,
                                created: x.created,
                                productId: x.productId,
                                // edit: x.edit,
                                // isEdit: x.isEdit,
                            }
                        }
                    })
                }
                // console.log(this.chats[1].messages)

                resolve()
            })
                .then(() => {
                    var chatBody = document.getElementById('chat-body');
                    this.chatBodyScrollHeight = chatBody.scrollHeight;
                    chatBody.scrollTo(0, this.chatBodyScrollHeight)
                    console.log(this.chatBodyScrollHeight);
                })
                .catch(er => {
                    console.log(er);
                })
        })
        if (!process.server) {

        }
        // this.connection = new HubConnectionBuilder()
        //     .configureLogging(LogLevel.Information)
        //     .withUrl('https://localhost:44322/chatHub', {
        //         skipNegotiation: true,
        //         transport: HttpTransportType.WebSockets
        //     })
        //     .build()
        // this.connection.on('recieveMessage', data => {
        //     console.log(data);
        //     this.messages.push(data)
        // })
        // console.log(this.connection);
        // this.connection.start()
        //     .then(() => {
        //         this.connection.invoke('GetConnetionId').then(connectionId => {
        //             this._connectionId = connectionId
        //             console.log(connectionId);
        //             this.joinRoom()
        //         })
        //     })
        //     .catch(er => {
        //         console.log('get connection id error: ', er)
        //     });
    },
    data: () => ({
        selectedChat: null,
        chatBodyScrollHeight: 0,
        connection: null,
        _connectionId: '',
        message: '',

        chatRoom: {},
        chats: []
    }),
    watch: {
        chatBodyScrollHeight(newValue, oldValue) {
            console.log('old value', oldValue);
            console.log('newValue', newValue);
            // var chatBody = document.getElementById('chat-body');
            // chatBody.scrollTo(0, newValue)
        }
    },
    methods: {
        selectChat(chat) {
            console.log('selectChat called: ', chat);

            new Promise((resolve, reject) => {
                for (let index = 0; index < this.chats.length; index++) {
                    if (chat.id === this.chats[index].id) {
                        this.chats[index].chatClassName = 'gainsboro';
                        this.chats[index].isOpenChatRoom = true;
                        console.log(this.chats[index]);
                    }
                    else {
                        this.chats[index].chatClassName = 'white';
                        this.chats[index].isOpenChatRoom = false;
                    }
                }
                this.selectedChat = chat

                resolve()
            }).then(() => {
                var chatBody = document.getElementById("chat-body");
                // this.chatBodyScrollHeight = chatBody.scrollHeight;
                chatBody.scrollTo(0, chatBody.scrollHeight);
            })
        },
        addNewMessage() {
            new Promise((resolve, reject) => {
                var messageRequest = { content: this.message, chatRoomName: this.selectedChat.name, }

                this.$axios.post('/chats/createMessage', messageRequest).then(res => {
                    console.log(res.data);
                    var messageResponse = res.data
                    messageResponse.userName = "Вы";
                    messageResponse.className = "d-flex flex-row justify-content-end mr-3 mb-4";

                    this.selectedChat.messages.push(messageResponse);
                    this.message = "";
                    resolve()
                }).catch(er => { console.log(er) })
            })
                .then(() => {
                    var chatBody = document.getElementById('chat-body')
                    var newScrolHeight = chatBody.scrollHeight
                    console.log(newScrolHeight);
                    chatBody.scrollTo(0, newScrolHeight)
                })
        },
        sendMessage() {
            var messageReq = {
                message: this.message,
                roomName: 'testChatRoom',
                chatId: 1
            }

            this.$axios.post('/chats/sendMessage', messageReq)
                .then(res => {
                    console.log('message sent', res)
                })
                .catch(er => console.log(er))
        },
        joinRoom() {
            var url = 'chats/join-to-room/' + this._connectionId + '/testChatRoom';

            this.$axios.post(url, null)
                .then(res => {
                    console.log('room joined', res)
                    this.chatRoom = res.data
                })
                .catch(err => {
                    console.log('failed to join room: ', err)
                })
        }
    }
}
</script>

<style>
.chat-body {
    /* position: fixed; */
    height: 459px;
    overflow: auto;

}
</style>