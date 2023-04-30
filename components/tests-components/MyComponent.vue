<template>
    <button @click="createNewPost">click me</button>
</template>

<script>
export default {
    methods: {
        createNewPost() {
            this.$emit('create', this.post, 'second param', 'third param')
        }
    },
    data: () => ({
        post: {
            title: 'title post',
            body: 'body'
        }
    })
}
</script>