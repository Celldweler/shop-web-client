<template>
    <div class="">
        <div v-if="wishListIsEmpty" class="d-flex flex-column justify-content-center mt-5 p-3">
            <div class="text-center">Упс! Ваш список желаний пуст</div>
            <div class="text-center">Наполните его товарами</div>
            <div class="text-center mt-5">
                <b-btn @click="$router.push('/')" variant="success">Перейти на главную</b-btn>
            </div>
        </div>

        <div v-else>
            <b-card-group class="">
                <b-card v-for="wishItem in wishList" class="col-3 text-center" :title="wishItem.productName"
                    :img-src="`https://localhost:5001/api/files/${wishItem.image}`">
                    <b-card-text class="text-center"> {{ wishItem.productPrice }} $ </b-card-text>
                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WishList',
    created() {
        if (!process.server) {
            this.$axios.get('customer-wish-list').then(res => {
                console.log(res.data);
                this.wishList = res.data;
                // localStorage.setItem('wish-list', JSON.stringify(this.wishList))
            })
            // var wishListFromLocalStore = localStorage.getItem('wish-list')

            // if (wishListFromLocalStore === null) {
            // }
            // else {
            //     this.wishList = JSON.parse(wishListFromLocalStore)
            //     console.log(this.wishList);
            // }
        }
    },
    data: () => ({
        wishListIsEmpty: false,
        wishList: [],
    })
}
</script>
