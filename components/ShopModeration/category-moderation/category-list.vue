<template>
    <div>
        <CreateCategory></CreateCategory>
        <h2 class="text-center mt-1">
            ALL CATEGORIES:
        </h2>
        <hr>
        <b-row class="mt-3">
            <b-col class="mt-2" v-for="category in categories" :key="`category--${category.id}-${category.name}`">
                <b-badge class="p-3" pill variant="dark">{{ category.name }}</b-badge>
                <!-- {{ category.id }} - {{ category.name }} -->
            </b-col>
        </b-row>
    </div>
</template>


<script>
import CreateCategory from './create-category.vue';
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    components: { CreateCategory },
    computed: mapState('categories', ['categories']),
    methods: {
        ...mapActions('categories', ['fetchCategories',])
    },
    created() {
        this.fetchCategories()
    }
}
</script>