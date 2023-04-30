<template>
    <div style="background-color: #d2c9ff;">
        <b-container class="">
            <b-row align-h="between">
                <b-col>
                    <h1 class="text-center">CHECKOUT</h1>
                    <div>
                        <h2>Contact</h2>
                        <p>
                            <!-- <label>Name</label> -->
                            <b-form-input placeholder="Enter your name" v-model="orderForm.customerName"></b-form-input>
                        </p>
                        <p>
                            <!-- <label>Email</label> -->
                            <b-form-input v-model="orderForm.email" placeholder="Enter email" />
                        </p>
                        <p>
                            <!-- <label>Phone Number</label> -->
                            <b-form-input v-model="orderForm.phoneNumber" placeholder="Enter phone number" />
                        </p>
                        <hr>
                        <h2>Shipping Adress</h2>
                        <p>
                            <!-- <label>Street Adress</label> -->
                            <b-form-input v-model="orderForm.adress" placeholder="Street Adress" />
                        </p>
                        <p>
                            <!-- <label>City</label> -->
                            <b-form-input v-model="orderForm.city" placeholder="City" />
                        </p>
                        <p>
                            <!-- <label>Country</label> -->
                            <b-form-input v-model="orderForm.country" placeholder="Country" />
                        </p>
                        <p>
                            <!-- <label> Post Code </label> -->
                            <b-form-input v-model="orderForm.postCode" placeholder="Post Code" />
                        </p>
                        <div class="d-flex justify-content-center">
                            <b-button variant="success" @click="checkout()">
                                Checkout
                            </b-button>
                        </div>
                        <div class="pt-5">
                            <h6 class="mb-0"><a href="/" class="text-body"><i
                                        class="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a>
                            </h6>
                        </div>
                        <!-- <button @click="login()">login</button> -->
                        <!-- <b-col>
                            <b-button @click="fillFormTestData()">Quick Fill Form</b-button>
                        </b-col> -->
                    </div>
                </b-col>

                <!-- <hr>

            <div class="payment__item">
                <h2>Payment</h2>
            </div> -->

                <hr>
                <b-col>
                    <div class="cart__item">
                        <!-- <nuxt-link to="/cart">Edit</nuxt-link> -->
                        <h3>{{ cart.length }} ITEM</h3>
                        <div v-for="cartProduct in cart" :key="`cart--item--${cartProduct.id}--${cartProduct.stockId}`">
                            <hr>
                            <b-row>
                                <b-col cols="4">
                                    <img :src="`https://localhost:44322/api/files/${cartProduct.image}`" height="100"
                                        width="100">
                                </b-col>
                                <b-col>
                                    <div>
                                        {{ cartProduct.productName }} <br>
                                        Price: {{ cartProduct.price }} <br>
                                        Size: {{ cartProduct.stockDescription }} <br>
                                        Qty: {{ cartProduct.qty }} <br>
                                        <a href="/cart">Edit</a>
                                        <a @click="remove($event, cartProduct)" href="">Remove</a>
                                    </div>
                                </b-col>
                            </b-row>
                            <hr>
                        </div>
                        <div class="mb-5">
                            <h5>
                                TOTAL TO PAY: $ {{ totalPrice() }}
                            </h5>
                        </div>
                    </div>
                </b-col>

            </b-row>
        </b-container>
    </div>

</template>


<script>
import { UserManager, WebStorageStateStore } from 'oidc-client';

export default {
    data: () => ({
        userManager: null,
        orderForm: {
            // Contact
            customerName: '',
            // surname: '',
            email: '',
            phoneNumber: '',
            // Shipping
            adress: '',
            city: '',
            country: '',
            postCode: '',
        },
        testOrderFormData: {
            // Contact
            customerName: 'Artem',
            // surname: 'Naumov',
            email: 'test@femail.com',
            phoneNumber: '+380 962986591',
            // Shipping
            adress: "Kanatna St, 98, Odesa, Odes'ka oblast, 65000",
            city: 'Odessa',
            country: 'Ukraine',
            postCode: '65000'
        },
        cart: [],
        stocksOnHoldFromLocalStore: [],
        cartProduct: {
            productId: 0,
            stockId: 0,
            productTitle: '',
            price: 0,
            stockDescription: '',
            qty: 0,
            image: ''
        }
    }),
    created() {
        if (!process.server) {
            this.userManager = new UserManager({
                userStore: new WebStorageStateStore({ store: window.localStorage }),
                authority: "https://localhost:44322",
                client_id: "web-client",
                redirect_uri: "https://localhost:3000/oidc/signin-callback.html",
                response_type: "code",
                scope: "openid profile IdentityServerApi role",
                post_logout_redirect_uri: 'https://localhost:3000',
                silent_redirect_uri: 'https://localhost:3000/oidc/signin-silent-callback.html',
            })
            // this.stocksOnHoldFromLocalStore = localStorage.getItem('stocks-to-hold')
            this.cart = JSON.parse(localStorage.getItem('cart'))
            if (this.cart === null) {
                this.cart = []
            }

            // if (this.stocksOnHoldFromLocalStore === null) {
            //     console.log('stocks on hold in local store empty');
            //     var stocksToHoldRequestObj = {
            //         exist: false,
            //         Id: null,
            //         stocks: this.cart.map(x => {
            //             return {
            //                 stockId: x.stockId,
            //                 qty: x.qty,
            //             }
            //         })
            //     }
            //     localStorage.setItem('stocks-to-hold', JSON.stringify(stocksToHoldRequestObj))
            // }
            // this.$axios.post('api/put-stocks-on-hold', stocksToHoldRequestObj).then(res => {

            // })
            console.log(this.cart);
        }
    },
    methods: {
        remove(e, product) {
            e.preventDefault()
            var i = this.cart.findIndex(p => {
                if (p.productId === product.productId && p.stockId === product.stockId) {
                    return true;
                }
            })
            this.cart.splice(i, 1)
            if (this.cart.length === 0) {
                this.isCartEmpty = true
            }
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },
        totalPrice() {
            var totalAmount = 0;
            this.cart.forEach(p => {
                totalAmount += parseInt(p.qty) * parseInt(p.price);
            });
            return totalAmount
        },
        login() {
            return this.userManager.signinRedirect().then(res => {
                console.log(res);

            });
        },
        fillFormTestData() {
            this.orderForm = this.testOrderFormData
        },
        validateFormModel() {


            return
        },
        checkout() {
            var _userId = '';
            var order = {};
            console.log('form send');
            return this.userManager.getUser().then(user => {
                _userId = user.profile.sub;

                console.log(_userId);
            })
                .then(res => {

                    order = {
                        customerId: _userId,
                        customer: this.orderForm,
                        products: this.cart.map(x => {
                            return {
                                productId: x.id,
                                stockId: x.stockId,
                                productTitle: x.productName,
                                price: x.price,
                                stockDescription: x.stockDescription,
                                qty: x.qty,
                                image: x.image
                            }
                        })
                    };
                    console.log('checkout');
                    console.log('order', order);
                    localStorage.clear()
                })
                .then(res => {
                    this.$axios.post("/api/orders", order).then(res => {
                        console.log(res);
                        this.$router.push("success")
                    })
                })
        }
    }
}
</script>