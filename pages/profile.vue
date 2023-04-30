<template>
    <div>
        <CustomerProfile></CustomerProfile>
        <!-- <h1>
            User Profile
        </h1>
        <hr>
        <div>
            <h3>
                Identity Data
            </h3>
            <div v-if="user!==null">
                {{ user.profile.name }} - {{ user.profile.email }}
                <a @click="editIdentityDataOfUser($event, user)" href="#">Edit</a>
            </div>
            <hr>
            <h5>Shipping Adress</h5>
            <div v-if="userOrderHistory!==null">
                {{ userOrderHistory[0].customerInformation.adress }}
            </div>
        </div>

        <hr>
        <customer-orders :orders="userOrderHistory"></customer-orders>

        <div>
            <h3 @click="() => showOrderHistoryFlag=true">Orders History</h3>
            <a v-show="showOrderHistoryFlag" @click="hiddeOrderHistory($event)" href="#">hide</a>
            <div v-show="showOrderHistoryFlag" v-for="(order, index) in userOrderHistory" :key="`order--${order.id}`">
                <div>
                    <h5>Order №{{index+1}}</h5>

                    <div v-for="p in order.cartProducts" :key="`product--${p.productId}`">
                        <nuxt-link :to="`product/${p.productId}`">
                            <img :src="`https://localhost:44322/api/files/${p.image}`" width="200" height="200">
                            {{ p.productTitle }} - {{ p.qty }} - {{ p.price }}
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <button @click="logout()">logout</button>
        <p></p> -->
    </div>
</template>

<script>
import CustomerOrders from '@/components/CustomerProfile/customer-orders.vue'
import CustomerProfile from '../components/CustomerProfile/customer-profile.vue';
// import userMgr from '../services/security';
export default {
    name: "ProfilePage",
    comments: {
        CustomerOrders
    },    
    data: () => ({
        showOrderHistoryFlag: false,
        profile: {},
        user: null,
        userOrderHistory: null,
        // userManager: null,
    }),
    methods: {
        editIdentityDataOfUser(e, customer) {
            e.preventDefault();
            console.log(customer);
        },
        hiddeOrderHistory(e) {
            e.preventDefault();
            this.showOrderHistoryFlag = false;
        },
        logout() {
            return this.$auth.signoutRedirect();
        }
    },
    created() {
        if (!process.server) {
            this.$axios.get('api/user-profile').then(res => {
                this.profile = res.data
                console.log(res);
            })
            // this.$auth.getUser().then(user => {
            //     var userId = user.profile.sub;
            //     this.user = user;
            //     this.$axios.get("api/orders/userOrderHistory/" + userId)
            //         .then(res => {
            //         console.log(res.data);
            //         this.userOrderHistory = res.data;
            //     });
            // });
        }
        //if (!process.server) {
        //    this.userManager = userMgr
        // new UserManager({
        //     userStore: new WebStorageStateStore({ store: window.localStorage }),
        //     authority: "https://localhost:44322",
        //     client_id: "web-client",
        //     redirect_uri: "https://localhost:3000/oidc/signin-callback.html",
        //     response_type: "code",
        //     scope: "openid profile email IdentityServerApi role",
        //     post_logout_redirect_uri: 'https://localhost:3000',
        //     silent_redirect_uri: 'https://localhost:3000/oidc/signin-silent-callback.html',
        //     // loadUserInfo: true,
        // })
        //}
    },
    components: { CustomerProfile }
}   
</script>