<template>
    <div>
        <!-- <h2>My Orders</h2> -->

        <!-- start container for all orders -->
        <div class="container-xxl  d-flex flex-column align-items-center border">
            <!-- container for one customer order card -->
            <div class="order-card d-flex flex-column" style="height: ; width: 1114.2px;">
                <!-- start header  -->
                <div class="order-card-header d-flex flex-row align-items-center border"
                    style="height: 74px; padding: 16px;">
                    <div class="header-item" style="width: 10px; height: 60px;">

                    </div>

                    <div class="header-item d-flex flex-column  " style="width: 604.82px">
                        <div class="labels-container  d-flex flex-row justify-content-between">
                            <div class="order-heading__label" style="">
                                № 249 043 188 от 08.07.19
                            </div>
                            <div v-if="!show" class="order-heading__label">
                                Сумма заказа
                            </div>
                        </div>
                        <div class="values-container  d-flex flex-row justify-content-between">
                            <div class="order-heading__value">
                                выполнен
                            </div>
                            <div v-if="!show" class="order-heading__value" style="width: 99.29px;">
                                2 266 ₴
                            </div>
                        </div>
                    </div>

                    <div class="header-item d-flex flex-row justify-content-end" style="width: 413.28px;">
                        <div v-if="!show">
                            <img :src="`https://localhost:5001/api/files/Img__GLOCKS__JEANS.png`" width="70px"
                                height="70px" alt="" srcset="">
                            <img :src="`https://localhost:5001/api/files/Img__GLOCKS__JEANS.png`" width="70px"
                                height="70px" alt="" srcset="">
                            <img :src="`https://localhost:5001/api/files/Img__GLOCKS__JEANS.png`" width="70px"
                                height="70px" alt="" srcset="">
                            <img :src="`https://localhost:5001/api/files/Img__GLOCKS__JEANS.png`" width="70px"
                                height="70px" alt="" srcset="">
                            <img :src="`https://localhost:5001/api/files/Img__GLOCKS__JEANS.png`" width="70px"
                                height="70px" alt="" srcset="">
                        </div>
                    </div>
                    <div class="header-item d-flex justify-content-end align-items-center ml-2" style="width: 30px">
                        <div>
                            <a @click="moreInfo($event)" href="">
                                <img
                                    src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/24/000000/external-down-arrows-dreamstale-lineal-dreamstale.png" />
                            </a>
                        </div>
                    </div>
                </div>
                <!-- end header  -->
                <div v-if="show" class="border d-flex justify-content-center" style="height: 427.6px; width: 1114.2px;">
                    <div class="order-details-card-body border d-flex flex-row"
                        style="height: 427.6px;width: 1080.2px;">
                        <div class="order-details-summary border d-flex flex-column" style="width: 369.66px;">
                            <div>
                                Информация о заказе
                            </div>
                            <div class="delivery-info">
                                <!-- Shipping Adress -->
                                {{profile.adress}}
                                <!-- Одесская обл., Болградский р-н., Арциз, 2, пер. Больничный, д.4 -->
                            </div>
                            <div class="personal-info">
                                <div>
                                    Бужылов Фёдор Иллич
                                </div>
                                <div>
                                    380953088537
                                </div>
                                <div>
                                    0961120962fb@gmail.com
                                </div>
                            </div>
                            <div>
                                <a href="">История Заказа</a>
                            </div>
                        </div>
                        <div class="order-details-goods d-flex flex-column" style="width: 686.53px;">
                            <div>
                                Товары
                            </div>
                            <div class="orders-goods d-flex flex-column">
                                <div class="one-good d-flex flex-row align-items-center " style="padding:;">
                                    <div class="d-flex flex-row align-items-center ">
                                        <div class="">
                                            <img :src="`https://localhost:44322/api/files/Img__GLOCKS__JEANS.png`"
                                                width="100px" height="100px" alt="" srcset="">
                                        </div>
                                        <div style="width:202.6px;height: 51px;" class=" text-center">
                                            GLOCKS A312 JEANS D GR
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row justify-content-between  w-100" style="width:;">
                                        <div class="d-flex flex-column align-items-center">
                                            <div class="text-muted">
                                                Price
                                            </div>
                                            <div>
                                                2 266 ₴
                                            </div>
                                        </div>
                                        <div class="d-flex flex-column align-items-center">
                                            <div class="text-muted">
                                                Qty
                                            </div>
                                            <div>
                                                1
                                            </div>
                                        </div>
                                        <div class="d-flex flex-column align-items-center">
                                            <div class="text-muted">
                                                Amount
                                            </div>
                                            <div>
                                                2 266 ₴
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div class="payment-info">
                                Опалата - Оплата при получении товара
                                <hr>
                                Доставака - 50 ₴
                                <hr>
                                Итого - 2 316 ₴
                            </div>
                            <div class="orders-details-actions">
                                <div>
                                    <b-button>Оставаить отзыв</b-button>
                                    <b-button>Повторить заказ</b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end container for one customer order card -->
        </div>

    </div>
</template>

<script>
// import { UserManager, WebStorageStateStore } from 'oidc-client';

export default {
    name: "CustomerOrders",
    components: {},
    props: {
        profile: Object,
    },
    data: () => ({
        // userManager: null,
        customerOrders: [],
        show: false,
    }),
    methods: {
        moreInfo(e) {
            e.preventDefault();
            this.show = !this.show
        },
        toggle() {
            this.show = !this.show;
        }
    },
    created() {
        if (!process.server) {
            // this.userManager = new UserManager({
            //     userStore: new WebStorageStateStore({ store: window.localStorage }),
            //     authority: "https://localhost:44322",
            //     client_id: "web-client",
            //     redirect_uri: "https://localhost:3000/oidc/signin-callback.html",
            //     response_type: "code",
            //     scope: "openid profile email IdentityServerApi role",
            //     post_logout_redirect_uri: "https://localhost:3000",
            //     silent_redirect_uri: "https://localhost:3000/oidc/signin-silent-callback.html",
            // });
            // this.$auth.getUser().then(user => {
            //     console.log("user:", user);
            //     this.$axios.get("api/orders/userOrderHistory/" + user.profile.sub)
            //         .then(res => {
            //         console.log(res.data);
            //         this.customerOrders = res.data;
            //     });
            // });

            console.log(this.$options.propsData.orders);
            console.log(this);
        }
    },
}
</script>

<style >
/* .container {
    margin-top: 10px;
}

.progress-bar-vertical {
    width: 20px;
    min-height: 100px;
    display: flex;
    align-items: flex-end;
    margin-right: 20px;
    float: left;
}

.progress-bar-vertical .progress-bar {
    width: 100%;
    height: 0;
    -webkit-transition: height 0.6s ease;
    -o-transition: height 0.6s ease;
    transition: height 0.6s ease;
} */
</style>
