<template>
    <div>
        <div v-if="order!==null">
            <h2>
                Customer Info:

            </h2>
            <h5>
                -{{ order.customerInformation.customerName }} - {{ order.customerInformation.email }} -
                {{order.customerInformation.phoneNumber}}
            </h5>
            <hr>
            <h2>
                Shipping details:
            </h2>
            <h5>
                {{ order.customerInformation.adress }}
            </h5>
            <hr>
            <h3>
                Order:
            </h3>
            <div v-for="p in order.cartProducts">
                <img :src="`https://localhost:44322/api/files/${p.image}`" width="200" height="200">
                <br>
                {{ p.productTitle }}
                Price: ${{ p.price }} <br>
                Qty: {{ p.qty }}
                <br>
            </div>
            <p></p>
            <select>
                <option 
                    v-for="(status, i) in orderStatuses" :key="`${status.value}--${i}`"
                    :value="`${status.value}`">
                        {{ status.item }}
                </option>
            </select>
            <p></p>
            <p></p>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        order: null,
        orderStatuses: [
            { item: 'Pending', value: 'Pending' },
            { item: 'Awaiting Payment', value: 'AwaitingPayment' },
            { item: 'Awaiting FulFillment', value: 'AwaitingFulFillment' },
            { item: 'Awaiting Shipment', value: 'AwaitingShipment' },
            { item: 'Awaiting Pickup', value: 'AwaitingPickup' },
            { item: 'Completed', value: 'Completed' },
        ],
    }),
    created() {
        var id = parseInt(this.$route.params.orders)
        console.log(id);
        this.$axios.get('/api/orders/' + id)
            .then(res => {
                this.order = res.data
                console.log(this.order);
            })
    }
}
</script>