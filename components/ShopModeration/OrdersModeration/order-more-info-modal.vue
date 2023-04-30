<template>
    <div>
        <b-modal size="xl" centered id="order-mor-info-modal">
            <h1 class="text-center">Order More Info</h1>

            <b-row class="">
                <b-col class="col-7">
                    <div v-if="order.products!==null" v-for="p in order.products">
                        <img :src="`https://localhost:44322/api/files/${p.product.image}`" width="200px" height="200px" alt="">
                        {{  p.product.name }} - QTY: {{ p.qty }} - ${{ p.product.price }}
                    </div>
                    <hr>
                    Amount: $ {{ order.products.reduce((initValue, p) => initValue + (p.product.price * p.qty), 0) }}
                </b-col>
                <b-col class="border text-center">
                    <div class="mt-2">
                        <h1 class="">
                            Customer Info
                        </h1>
                        <h3>
                            {{ order.customer }}
                        </h3>

                        <h1>Customer Shipping</h1>
                        <div>
                            Change Order Status
                            <b-form-select class="col-5" v-model="selectedStatus" :options="orderStatuses">
                            </b-form-select>
                            <div v-if="selectedStatus!==null">
                                Current order status: {{ selectedStatus }}
                            </div>
                            <b-button @click="changeOrderStatus()">change</b-button>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <!-- {{order}} -->
        </b-modal>
    </div>
</template>

<script>
export default {
    props: {
        order: Object
    },
    created() {
    },
    methods: {
        changeOrderStatus() {
            console.log('changeOrderStatus');
            console.log(this._props.order.id);
            var formData = new FormData()

            formData.append('orderId', this._props.order.id)
            formData.append('status', this.selectedStatus)

            this.$axios.put('api/moderation-orders', formData).then(res => {
                console.log(res);
                this.$bvModal.msgBoxOk('Order status was changed successfully', {
                    // title: 'Change order status',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    bodyClass: 'text-center',
                    // headerClass: 'p-2 border-bottom-0',
                    footerClass: 'p-2 border-top-0',
                    centered: true
                })
                    .then(value => {
                    })
                    .catch(err => {
                        // An error occurred
                    })
            })
                .catch(er => {
                    console.log(er);
                })
        }
    },
    data: () => ({
        customer: null,
        selectedStatus: 0,
        orderStatuses: [
            { value: 0, text: 'Pending' },
            { value: 1, text: 'Awaiting Payment' },
            { value: 2, text: 'Awaiting Fulfillment' },
            { value: 3, text: 'Awaiting Shipment' },
            { value: 4, text: 'Shipped' },
            { value: 5, text: 'Delivered' },
            { value: 6, text: 'Awaiting Pickup' },
            { value: 7, text: 'Completed' },
            // { value: 'Pending', text: 'Pending' },
            // { value: 'AwaitingPayment', text: 'Awaiting Payment' },
            // { value: 'AwaitingFulFillment', text: 'Awaiting Fulfillment' },
            // { value: 'AwaitingShipment', text: 'Awaiting Shipment' },
            // { value: 'Shipped', text: 'Shipped' },
            // { value: 'Delivered', text: 'Delivered' },
            // { value: 'Awaiting Pickup', text: 'Awaiting Pickup' },
            // { value: 'Completed', text: 'Completed' },
        ]
    })
}
</script>

<style>

</style>