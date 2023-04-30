<template>
    <div class="container-xxl  d-flex flex-column align-items-center mb-2">
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
                            <!-- выполнен -->
                            {{ order.status }}
                        </div>
                        <div v-if="!show" class="order-heading__value" style="width: 99.29px;">
                            <!-- 2 266 ₴ -->
                            {{ order.products.reduce((sum, current) => sum + (current.price * current.qty), 0) }}
                        </div>
                    </div>
                </div>

                <div class="header-item d-flex flex-row justify-content-end" style="width: 413.28px;">
                    <div v-if="!show">
                        <img :src="`https://localhost:44322/api/files/Img__GLOCKS__JEANS.png`" width="70px"
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
            <div v-if="show" class=" d-flex justify-content-center border" style="height: 427.6px; width: 1114.2px;">
                <div class="order-details-card-body d-flex flex-row" style="height: 427.6px;width: 1080.2px;">
                    <div class="order-details-summary d-flex flex-column" style="width: 369.66px;">
                        <div>
                            Информация о заказе
                        </div>
                        <div class="delivery-info">
                            <!-- Shipping Adress -->
                            {{customerInfo.adress}}
                            <!-- Одесская обл., Болградский р-н., Арциз, 2, пер. Больничный, д.4 -->
                        </div>
                        <div class="personal-info">
                            <div>
                                {{ customerInfo.name + ' ' + customerInfo.surname }}
                                <!-- Бужылов Фёдор Иллич -->
                            </div>
                            <div>
                                {{ customerInfo.phoneNumber }}
                                <!-- 380953088537 -->
                            </div>
                            <div>
                                {{ customerInfo.email }}
                                <!-- 0961120962fb@gmail.com -->
                            </div>
                        </div>
                        <div>
                            <a @click="showHistoryOrderModal($event)" href="">История Заказа</a>
                        </div>
                    </div>
                    <div class="order-details-goods d-flex flex-column" style="width: 686.53px;">
                        <div>
                            Товары
                        </div>
                        <div class="orders-goods d-flex flex-column">
                            <div v-for="p in order.products" class="one-good d-flex flex-row align-items-center">
                                <div class="d-flex flex-row align-items-center ">
                                    <div class="">
                                        <img :src="`https://localhost:44322/api/files/${p.image}`"
                                            width="100px" height="100px" alt="" srcset="">
                                    </div>
                                    <div style="width:202.6px;height: 51px;" class=" text-center">
                                        <!-- GLOCKS A312 JEANS D GR -->
                                        {{ p.productTitle }}
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-between  w-100" style="width:;">
                                    <div class="d-flex flex-column align-items-center">
                                        <div class="text-muted">
                                            Price
                                        </div>
                                        <div>
                                            <!-- 2 266 ₴ -->
                                            {{ p.price }}
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column align-items-center">
                                        <div class="text-muted">
                                            Qty
                                        </div>
                                        <div>
                                            {{ p.qty }}
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column align-items-center">
                                        <div class="text-muted">
                                            Amount
                                        </div>
                                        <div>
                                            {{ p.qty * p.price }}
                                            <!-- 2 266 ₴ -->
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
                            Итого - {{ order.products.reduce((sum, curr) => sum + (curr.qty*curr.price) ,0) }} ₴
                        </div>
                        <div class="orders-details-actions">
                            <div>
                                <b-button variant="">Оставаить отзыв</b-button>
                                <b-button variant="success">Повторить заказ</b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end container for one customer order card -->
    </div>
</template>

<script>
export default {
    props: {
        profile: Object,
        customerInfo: Object,
        order: Object,
    },
    created() {
        if (!process.server) {
            this.$auth.getUser().then(user => {
                console.log(user);
                this.email = user.profile.email;
            });
            console.log(this.$options.propsData);
        }
    },
    data: () => ({
        // userManager: null,
        customerOrders: [],
        show: false,
    }),
    methods: {
        showHistoryOrderModal(e) {
            e.preventDefault();

            this.$bvModal.show('order-history-modal')
        },
        moreInfo(e) {
            e.preventDefault();
            this.show = !this.show;
        },
        toggle() {
            this.show = !this.show;
        }
    },
}
</script>