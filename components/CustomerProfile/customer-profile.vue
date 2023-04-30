<template>
    <div>
        <b-row class="mt-5 mr-4 ml-2">
            <b-col cols="2" class="border-right" style="height: 600px">
                <a @click="toggleToPersonalData($event)" href="#">
                    <b-avatar></b-avatar>
                    {{ email }}
                </a>
                <hr>
                <a @click="toggleToMyOrder($event)" href="#">
                    <img src="https://img.icons8.com/ios/40/000000/purchase-order.png" />
                    My orders
                </a>
                <hr>
                <a @click="toggleToWishList($event)" href="#">
                    <img src="https://img.icons8.com/material-outlined/40/000000/filled-like.png" />
                    Wish list
                </a>
                <hr>
                <a @click="toggleToChats($event)" href="#">
                    <img src="https://img.icons8.com/ios/40/000000/messages-mac.png"/>
                    My chats
                </a>
                <hr>
            </b-col>
            <b-col class="">
                <div v-if="currentMode===mode.personalData">
                    <h1>
                        Personal Information
                    </h1>
                    <PersonalSection>
                        <template v-slot:header-icon>
                            <b-avatar></b-avatar>
                        </template>
                        <template v-slot:header-title>
                            Personal Information
                        </template>
                        <template v-slot:body-data-labels>
                            <div class="col-4"> Фамилия </div>
                            <div class="col-4">
                                Имя
                            </div>
                            <div class="col-4">
                                Отчество
                            </div>
                        </template>
                        <template v-slot:body-data-values>
                            <div class="col-4">
                                {{ profile.name }}
                                <!-- Игнатов -->
                            </div>
                            <div class="col-4">
                                {{ profile.surname }}
                                <!-- Дмитрий -->
                            </div>
                            <div class="col-4">
                                Сергеевич
                            </div>
                        </template>
                    </PersonalSection>

                    <PersonalSection>
                        <template v-slot:header-icon>
                            <img src="https://img.icons8.com/ios/37/000000/email-open.png" />
                        </template>
                        <template v-slot:header-title>
                            Сontacts
                        </template>
                        <template v-slot:body-data-labels>
                            <div class="col-4"> Телефон </div>
                            <div class="col-4">
                                Электронная почта
                            </div>
                        </template>
                        <template v-slot:body-data-values>
                            <div class="col-4">
                                {{ profile.phoneNumber }}
                                <!-- +38 098 969 74 93 -->
                            </div>
                            <div class="col-4">
                                {{ profile.email }}
                                <!-- 0961120962fb@gmail.com -->
                            </div>
                        </template>
                    </PersonalSection>

                    <PersonalSection>
                        <template v-slot:header-icon>
                            <img src="https://img.icons8.com/ios-filled/38/000000/truck.png" />
                        </template>
                        <template v-slot:header-title>
                            Shipping Address
                        </template>
                        <template v-slot:body-data-values>
                            <div class="col-7">
                                {{ profile.adress }}
                                <!-- Одесская обл., Болградский р-н., Арциз, Интернациональная ул., д.35 -->
                            </div>
                        </template>
                    </PersonalSection>

                    <PersonalSection>
                        <template v-slot:header-icon>
                            <img src="https://img.icons8.com/ios-filled/38/000000/lock.png" />
                        </template>
                        <template v-slot:header-title>
                            Login
                        </template>
                    </PersonalSection>
                </div>
                <div v-if="currentMode===mode.myOrders">
                    <h1>
                        My orders
                    </h1>
                    <!-- {{ profile.orders }} -->
                    <OrderHistory></OrderHistory>
                    <div v-if="profile!==null && profile.orders!==null" v-for="order in profile.orders">
                        <OrderSection :customerInfo="customerInfo" :order="order"></OrderSection>
                    </div>
                    <!-- <CustomerOrders :profile="profile"></CustomerOrders> -->
                </div>
                <div v-if="currentMode===mode.wishList">
                    <h1>Wish List</h1>
                    <WishList></WishList>
                </div>
                <div v-if="currentMode===mode.chats">
                    <h1>My chats</h1>
                    <ChatSection></ChatSection>
                </div>
            </b-col>
        </b-row>
    </div>
</template>


<script>
import PersonalSection from './personal-section.vue';
import OrderSection from './customer-orders-section/order-section.vue';
import OrderHistory from './customer-orders-section/order-history.vue';
import WishList from './wish-list.vue';
import ChatSection from './chats/chat-section.vue';
export default {
    created() {
        if (!process.server) {
            var session = localStorage.getItem('user-profile-session')
            if (session !== null) {
                this.currentMode = JSON.parse(session).mode;
            }
            else {
                console.log('user-profile-session is empty');
            }
        }
        this.$axios.get('api/user-profile').then(res => {
            this.profile = res.data;
            this.customerInfo = {
                userId: this.profile.id,
                adress: this.profile.adress,
                city: this.profile.city,
                country: this.profile.country,
                postCode: this.profile.postCode,

                email: this.profile.email,
                name: this.profile.name,
                surname: this.profile.surname,
                secondName: this.profile.secondName,
                phoneNumber: this.profile.phoneNumber,
            }
            console.log(res);
        })
        if (!process.server) {
            this.$auth.getUser().then(user => {
                console.log(user);
                this.email = user.profile.email;
            });
        }
    },
    data: () => ({
        profile: {},
        customerInfo: {},
        dynamicHeight: "88px",
        showMoreinfoFlag: false,
        email: "",
        currentMode: "MY_ORDERS",
        mode: {
            personalData: "PESONAL_DATA",
            myOrders: "MY_ORDERS",
            wishList: "WISH_LIST",
            chats: "CHATS",
        }
    }),
    methods: {
        toggleToChats(e) {
            e.preventDefault();
            this.currentMode = this.mode.chats
        },
        toggleToWishList(e) {
            e.preventDefault()
            this.currentMode = this.mode.wishList
        },
        toggleToPersonalData(e) {
            e.preventDefault();
            this.currentMode = this.mode.personalData;
        },
        toggleToMyOrder(e) {
            e.preventDefault();
            this.currentMode = this.mode.myOrders;
        },
        showMoreInfo(e) {
            e.preventDefault();
            this.showMoreinfoFlag = true;
            this.dynamicHeight = "210px";
        },
        hideInfo(e) {
            e.preventDefault();
            this.showMoreinfoFlag = false;
            this.dynamicHeight = "88px";
        }
    },
    components: { PersonalSection, OrderSection, OrderHistory, WishList, ChatSection }
}
</script>