<template>
    <div>
        <h1>Orders Moderation Panel</h1>
        <div v-for="(o, index) in orders" :key="`${o.customerInformation.phoneNumber}--${o.customerInformation.email}--index`">
            <nuxt-link :to="`orders/${o.id}`">
                <div>
                    {{ o.customerInformation.customerName }} - {{ o.customerInformation.email }} - {{ o.customerInformation.phoneNumber }}
                    - {{ o.customerInformation.adress }} - {{ o.customerInformation.country }} - {{ o.customerInformation.postCode}}
                </div>
            </nuxt-link>
            <!-- <div v-if="showOrderProductsFlag">
                <div v-for="(p, i) in o.cartProducts" :key="`${p.productTitle}--i`">
                    <img :src="`https://localhost:44322/api/files/${p.image}`" width="200" height="200">
                    <br>
                    {{ p.productTitle }}
                    Price: ${{ p.price }} <br>
                    Qty: {{ p.qty }}
                    <br>
                </div>
            </div> -->
            <!-- <button v-if="showOrderProductsFlag" @click="toggle()">Turn</button> -->
        </div>

    </div>
</template>

<script>
export default {
    name: 'orderAdminPage',
    data: () => ({
        orders: [],
        order: {

        },
        showOrderProductsFlag: false,
    }),
    created() {
        this.$axios.get("api/orders")
            .then(res => {
                 this.orders = res.data
            })
    },
    methods: {
        showOrderProducts() {
            this.showOrderProductsFlag = true;
            // console.log(this.orders);
        },
        toggle() {
            this.showOrderProductsFlag = false;
        }
    }
}
</script>