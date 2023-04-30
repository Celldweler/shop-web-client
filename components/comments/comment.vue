<template>
    <div class="comment p-3" style="width: 800px;">
        <div class="border p-3">
            <div class="d-flex flex-row justify-content-between">
                <div>
                    <h6>{{ comment.userName }}</h6>
                </div>
                <small class="text-muted">
                    {{ comment.created }}
                    <!-- 25 сентября 2022 -->
                </small>
            </div>
            <hr>
            {{ comment.content }} - <a @click="toggle($event)" href="">reply</a> - 
            <a @click="hideReply($event)" href="">hide reply</a>
        </div>

        <div v-if="replying" class="create-reply-form ml-3">
            <b-form-textarea class="" id="textarea" v-model="content" placeholder="Enter reply..." rows="3"
                max-rows="6" />
            <div class="mt-1">
                <b-btn size="sm" @click="replying=false">cancel</b-btn>
                <b-btn size="sm" @click="replyTo(comment.id)">reply</b-btn>
            </div>
        </div>
        <div 
            v-for="reply in comment.replies"
            v-if="hideRepliesFlag" class="replies border-left ml-3 pl-2" 
            >
            <hr>
            <div class="d-flex flex-row justify-content-between">
                <div>
                    <h6>{{reply.userName}}</h6>
                </div>
                <small class="text-muted">
                    {{ reply.created }}
                    <!-- 25 сентября 2022 -->
                </small>
            </div>
            {{ reply.content }}
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    name: "comment",
    props: {
        comment: Object,
        index: Number,
        commentType: String
    },
    created() {
        console.log(this.$props);
    },
    computed: {
        classObject() {
            if (this.$props.commentType === "PARENT") {
                return `border ml-3`
            }
            if (this.$props.commentType === "CHILD") {
                return `border ml-5`
            }
        }
    },
    data() {
        return {
            // classObject: `border ml-3`,
            replies: [],
            content: '',
            replying: false,
            hideRepliesFlag: true,
        };
    },
    methods: {
        hideReply(e) {
            e.preventDefault();
            this.hideRepliesFlag = !this.hideRepliesFlag;
        },
        toggle(e, c) {
            e.preventDefault();
            this.replying = true
            this.selectedComment = c
        },
        showReply() {
            this.$emit('showReply', this.comment.id, this.index)
        },
        createComment() {
            var comment = {
                content: this.content
            };
            this.$emit('create', comment)
            this.content = ''
        },
        replyTo(id) {
            console.log('re');
            this.replying = false
            console.log('in comment commponents id', id);
            this.$emit('replyToComment', id, this.content)
            this.content = ''
        },
    },
}
</script>