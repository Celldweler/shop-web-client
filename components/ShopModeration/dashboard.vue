<template>
    <div>
        <div class="d-flex justify-content-center">
            <b-card-group>
                <div v-for="i in 8" :key="i" class="mr-3">
                    <b-card body-bg-variant="color_body" title="" img-src="" img-alt="Image" img-top tag="article"
                        style="max-width: 20rem;" class="mb-2">
                        <b-card-body>
                            <b-container>
                                <b-row>
                                    <b-col class="">
                                        <img :src="icons[i-1]" />
                                    </b-col>
                                    <b-col>
                                        <h1>
                                            {{ statisticsData[i-1] }}
                                        </h1>
                                        <p>
                                            {{ dashboardCategory[i-1] }}
                                        </p>
                                    </b-col>
                                </b-row>
                            </b-container>
                            <!-- <b-card-title>Card Title</b-card-title>
                        <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>
                        <b-card-text>
                            Some quick example text to build on the card title and make up the bulk of the card's
                            content.
                        </b-card-text> -->
                        </b-card-body>

                        <template #footer>
                            <b-card-text @click="() => setAdminMode(allMode.Products)">
                                <nuxt-link to="">
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            View Deatails
                                        </div>
                                        <div>
                                            <img width="24px" height="24px"
                                                src="https://img.icons8.com/color/48/000000/circled-right--v1.png" />
                                        </div>
                                    </div>
                                </nuxt-link>
                            </b-card-text>
                        </template>
                    </b-card>
                </div>
            </b-card-group>
        </div>

        <!-- Orders List -->
        <div>
            <h1>
                New Orders
            </h1>
            <b-container class="">
                <b-row class="mb-2" align-h="end">
                    <b-col class="" cols="5">
                        Order By:
                        <b-form-select @change="sortOrdersBy()" class="col-5" v-model="selectedOrderStatus"
                            :options="orderStatuses"></b-form-select>
                    </b-col>
                </b-row>
            </b-container>
            <OrderMoreInfoModal v-if="selectedOrder!==null" :order="selectedOrder"></OrderMoreInfoModal>
            <b-table v-if="orders!==null" @row-clicked="onOrdersTableRowCLick" :items="orders" outlined>
                <template #cell(products)="data">
                    <div @click="onProductsCellClick">
                        <div v-for="p in data.item.products">
                            <nuxt-link :to="``">
                                {{ p.product.name }} - QTY: {{ p.qty }}
                            </nuxt-link>
                        </div>
                    </div>
                </template>
            </b-table>
        </div>

    </div>
</template>

<script>
import OrderMoreInfoModal from "./OrdersModeration/order-more-info-modal.vue";
import { mapState, mapMutations } from "vuex";
export default {
    //Order -- Customer -- Products -- status -- data
    computed: {
        ...mapState('admin', {
            adminMode: state => state.mode,
            allMode: state => state.ADMINMODE_ENUMS
        })
    },
    methods: {
        ...mapMutations('admin', ['setAdminMode', 'resetAdminMode']),
        sortOrdersBy() {
            if (this.selectedOrderStatus === 8) {
                this.$axios.get("api/orders").then(res => {
                    this.orders = res.data.map(x => {
                        return {
                            id: x.id,
                            customer: x.customerInformation.email,
                            products: x.cartProducts,
                            created: x.createdDateViewModel,
                            status: x.orderStatus,
                            total: x.cartProducts.map(x => {
                                return (parseInt(x.price) * parseInt(x.qty));
                            }).reduce((a, b) => a + b, 0)
                        };
                    });
                    console.log(res.data);
                });
                return;
            }
            this.$axios(`api/moderation-orders/filteredByStatus/${this.selectedOrderStatus}`)
                .then(res => {
                    console.log(res.data);
                    this.orders = res.data.map(x => {
                        return {
                            id: x.id,
                            customer: x.customerInformation.email,
                            products: x.cartProducts,
                            created: x.createdDateViewModel,
                            status: x.orderStatus,
                            total: x.cartProducts.map(x => {
                                return (parseInt(x.price) * parseInt(x.qty));
                            }).reduce((a, b) => a + b, 0)
                        };
                    });
                })
                .catch(er => {
                    console.log(er);
                })
        },
        onOrdersTableRowCLick(item, index, event) {
            // this.selectedProduct.name = item.products;
            this.selectedOrder = item
            console.log(item);
            console.log('index', index);
            this.$bvModal.show("order-mor-info-modal");

        },
        onProductsCellClick(event) {

            // this.$bvModal.show("order-mor-info-modal");
            console.log(event);
        }
    },
    created() {
        this.$axios.get("api/orders-moderation").then(res => {
            this.orders = res.data.map(x => {
                return {
                    id: x.id,
                    customer: x.customerInfo.email,
                    products: x.products,
                    created: x.created,
                    status: x.status,
                    total: x.products.map(x => {
                        return (parseInt(x.product.price) * parseInt(x.qty));
                    }).reduce((a, b) => a + b, 0)
                };
            });
            console.log(res.data);
        });
    },
    data: () => ({
        selectedOrderStatus: 0,
        orderStatuses: [
            { value: 8, text: 'All Orders' },
            { value: 0, text: 'Pending' },
            { value: 1, text: 'Awaiting Payment' },
            { value: 2, text: 'Awaiting Fulfillment' },
            { value: 3, text: 'Awaiting Shipment' },
            { value: 4, text: 'Shipped' },
            { value: 5, text: 'Delivered' },
            { value: 6, text: 'Awaiting Pickup' },
            { value: 7, text: 'Completed' },
        ],
        statisticsData: [7, 5, 6, 9, 765, 3, 6, 2],
        selectedOrder: null,
        ordersVm: [],
        orders: [],
        allColors: [
            "primary",
            "secondary",
            "success",
            "warning",
            "danger",
            "info",
            "light",
            "dark",
        ],
        icons: [
            "https://img.icons8.com/ios/90/000000/product--v1.png", // product
            //customers
            "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/90/000000/external-customers-sewing-flaticons-lineal-color-flat-icons-4.png",
            // cart
            "https://img.icons8.com/ios-glyphs/90/000000/shopping-cart--v1.png",
            // orders
            "https://img.icons8.com/external-itim2101-lineal-color-itim2101/90/000000/external-order-online-shopping-itim2101-lineal-color-itim2101.png",
            // earning
            'https://img.icons8.com/external-filled-outline-berkahicon/90/000000/external-Earning-market-analytics-filled-outline-berkahicon.png',
            // pending
            'https://img.icons8.com/ios-filled/90/000000/loading.png',
            //complete
            "https://img.icons8.com/emoji/90/000000/check-mark-emoji.png", // complete icon
            // percent
            'https://img.icons8.com/external-filled-outline-02-chattapat-/90/000000/external-percent-sales-filled-outline-02-chattapat-.png'
        ],
        dashboardCategory: [
            "Products",
            "Customers",
            "Products Category",
            "Orders",
            "Earnings",
            "Pending Orders",
            "Completed Orders",
            "Total Coupons",
        ]
    }),
    components: { OrderMoreInfoModal }
}
</script>

<style scoped>
.color_body {
    color: blue;
}
</style>