<template>
    <div>
        <!-- {{ customers }} -->
        {{ status }}
        <p></p>
        <button @click="changeOrderStatus()">change status</button>
    </div>
</template>

<script>
import { ORDER_STATUS } from '../../../services/shop-constants/order-status.js'
export default {
    data: () => ({
        customers: [],
        status: {},
    }),
    methods: {  
        changeOrderStatus() {
            var formData = new FormData()
            formData.append('status', this.status.AwaitingFulFillment)
            this.$axios.put('api/moderation-orders', formData).then(res => {
                console.log(res);
            })
                .catch(er => {
                    console.log(er);
                })
        },
    },
    created() {
        this.$axios.get('api/customers-moderation').then(res => {
            this.customers = res.data
            console.log(ORDER_STATUS);
        })
        this.status = ORDER_STATUS;
    },
}
</script>