<template>
    <div>
        <b-button v-b-modal.create-category-modal variant="success">Create New Category</b-button>
        <b-modal centered size="lg" id="create-category-modal" title="Create Category">
            <b-form-input ref="categoryNameInput" :value="category.name" placeholder="Enter category name"></b-form-input>
            <template #modal-footer>
                <div>
                    <b-button @click="createCategory()" variant="primary">Create</b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';


export default {
    methods: {
        ...mapMutations('categories', ['addNewCategory', 'setCategories', 'removeCategory']),
        createCategory() {
            // this.$store.commit('categories/addNewCategory', this.category);
            var name = this.$refs.categoryNameInput.$el._value;
            this.addNewCategory({name})
            // this.addNewCategory(this.category)
            this.category.id = 0;
            this.category.name = ''
            this.$bvModal.hide('create-category-modal')
        },
    },
    data: () => ({
        listofCategory: [],
        category: {
            name: ''
        }
    }),
}
</script>