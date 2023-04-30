<template>
    <div @click="selectChatRoom()"  class="select-chat-item border d-flex flex-column"
        :style="`width: 300px; height: 90px; padding: 5px; background-color: ${chat.chatClassName}`">
        <div class="d-flex flex-row justify-content-between " style="padding: ;">
            <div>
                <h6 v-if="chat.customerName">{{ chat.customerName }}</h6>
                <h6 v-else>{{ chat.recipientName }}</h6>
            </div>  
            <div class="text-muted"> <small> {{ chat.created }} </small></div>
        </div>
        <div class="" style="min-height:; padding:;">
            <small>
                {{ chat.name }}
            </small>
        </div>
    </div>   
</template>

<script>
export default {
    props: {
        chat: Object,
    },
    data: () => ({
    }),
    methods: {
        selectChatRoom() {
            this.$emit('selectChat', this.chat)
        }
    },
}
</script>