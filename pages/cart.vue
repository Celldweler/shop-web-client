<template>
    <div>
        <section class="h-100 h-custom" style="background-color: #d2c9ff;">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12">
                        <div class="card card-registration card-registration-2" style="border-radius: 15px;">
                            <div class="card-body p-0">
                                <div class="row g-0">
                                    <div class="col-lg-8">
                                        <div class="p-5">
                                            <div class="d-flex justify-content-between align-items-center mb-5">
                                                <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                <h6 v-show="!isCartEmpty" class="mb-0 text-muted"> {{ cart.length }}
                                                    items</h6>
                                            </div>
                                            <hr class="my-4">

                                            <div v-show="isCartEmpty">
                                                <h2 style="color: red;">Your Cart Is Empty</h2>
                                            </div>

                                            <!-- <cart product item component start> -->
                                            <div v-for="p in cart">
                                                <div class="row mb-4 d-flex justify-content-between align-items-center">
                                                    <div class="col-md-2 col-lg-2 col-xl-2">
                                                        <img :src="`https://localhost:44322/api/files/${p.image}`"
                                                            class="img-fluid rounded-3" alt="Cotton T-shirt">
                                                    </div>
                                                    <div class="col-md-3 col-lg-3 col-xl-3">
                                                        <h6 class="text-muted"> {{ p.productName }} </h6>
                                                        <h6 class="text-black mb-0"> {{ p.stockDescription }} </h6>
                                                    </div>
                                                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                        <button 
                                                            :disabled="p.qty === 1 ? true : false" 
                                                            class="btn btn-link px-2" 
                                                            @click="removeOneFromCart(p)">
                                                            -
                                                            <!-- <i class="fas fa-minus"></i> -->
                                                        </button>
                                                        {{ p.qty }}

                                                        <!-- <input id="form1" min="0" name="quantity" 
                                                            v-model="p.qty" type="number"
                                                            class="form-control form-control-sm" /> -->

                                                        <button class="btn btn-link px-2" @click="addOneToCart(p)">
                                                            <!-- <i class="fas fa-plus"></i> -->
                                                            +
                                                        </button>
                                                    </div>
                                                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                        <h6 class="mb-0"> $ {{ p.price * p.qty }} </h6>
                                                    </div>
                                                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                        <a href="#!" class="text-muted"
                                                            @click="removeOneCartProduct($event, p)">
                                                            x
                                                            <!-- <i class="fas fa-times"></i> -->
                                                        </a>
                                                    </div>
                                                </div>
                                                <hr class="my-4">

                                            </div>
                                            <div class="pt-5">
                                                <h6 class="mb-0"><a href="/" class="text-body"><i
                                                            class="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-show="!isCartEmpty" class="col-lg-4 bg-grey">
                                        <div class="p-5">
                                            <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                            <hr class="my-4">

                                            <div class="d-flex justify-content-between mb-4">
                                                <h5 class="text-uppercase">items {{ cart.length }} </h5>
                                                <h5>$ {{ totalPrice() }}</h5>
                                            </div>

                                            <h5 class="text-uppercase mb-3">Shipping</h5>

                                            <div class="mb-4 pb-2">
                                                <select class="select">
                                                    <option value="1">Standard-Delivery- $5.00</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                    <option value="4">Four</option>
                                                </select>
                                            </div>

                                            <!-- <h5 class="text-uppercase mb-3">Give code</h5>

                                            <div class="mb-5">
                                                <div class="form-outline">
                                                    <input type="text" id="form3Examplea2"
                                                        class="form-control form-control-lg" />
                                                    <label class="form-label" for="form3Examplea2">Enter your
                                                        code</label>
                                                </div>
                                            </div> -->

                                            <hr class="my-4">

                                            <div class="d-flex justify-content-between mb-5">
                                                <h5 class="text-uppercase">Total price</h5>
                                                <h5>$ {{ totalPrice() }}</h5>
                                            </div>

                                            <button type="button" class="btn btn-dark btn-block btn-lg"
                                                @click="() => this.$router.push('checkout')"
                                                data-mdb-ripple-color="dark">Checkout</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!-- <div>
        <h1> Cart </h1>
        <div v-show="isCartEmpty">
            <h2 style="color: red;">Your Cart Is Empty</h2>
        </div>

        <div v-show="!isCartEmpty">
            <a href="#" @click="removeAll($event)">Remove All</a>
            <p></p>

            <div v-for="(p, i) in cart">
                <p> {{i+1}} </p>
                <img :src="`https://localhost:44322/api/files/${p.image}`" height="270" width="270">
                <br>
                {{ p.productName }} <br>
                ${{ p.price }} <br>
                Qty:
                <button :disabled="p.qty === 1 ? true : false" @click="removeOneFromCart(p)">
                    -
                </button>
                {{ p.qty }}
                <button @click="addOneToCart(p)">+</button> <br>
                <a style="color: red;" href="#" @click="removeOneCartProduct($event, p)">Remove</a>
                <p></p>
            </div>
        </div>

        <div v-show="!isCartEmpty">
            Total: {{ totalPrice() }}
        </div>
        <P>
            <h2 v-show="!isCartEmpty">
                <nuxt-link to="/checkout">Checkout</nuxt-link>
            </h2>
        </P>
        <p></p>
        <p></p>
        <nuxt-link to="/">RETURN TO SHOP</nuxt-link>
    </div> -->
</template>


<script>
import { parse } from 'path';

export default {
    created() {
        if (!process.server) {

            var cartFromLocalStorage = localStorage.getItem('cart')
            console.log(cartFromLocalStorage);
            if (cartFromLocalStorage === null || cartFromLocalStorage === '[]') {
                this.isCartEmpty = true
                return;
            }
            else {
                this.cart = JSON.parse(cartFromLocalStorage)
            }
        }
    },
    data: () => ({
        cart: [],
        proudctImage: '',
        isCartEmpty: false,
    }),
    methods: {
        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },
        removeAll(event) {
            event.preventDefault()
            this.cart = [];
            localStorage.clear()
            this.isCartEmpty = true
        },
        removeOneCartProduct(e, product) {
            e.preventDefault()
            var i = this.cart.findIndex(p => {
                if (p.productId === product.productId && p.stockId === product.stockId) {
                    return true;
                }
            })
            this.cart.splice(i, 1)
            if(this.cart.length === 0) {
                this.isCartEmpty = true
            }
            console.log('click', product);
            this.updateLocalStorage()
        },
        removeOneFromCart(product) {
            var i = this.cart.findIndex(p => {
                if (p.productId === product.productId && p.stockId === product.stockId) {
                    return true;
                }
            })
            this.cart[i].qty = parseInt(this.cart[i].qty) - 1
            console.log('remove 1 from cart');
            this.updateLocalStorage()
        },
        addOneToCart(product) {
            var i = this.cart.findIndex(p => {
                if (p.productId === product.productId && p.stockId === product.stockId) {
                    return true;
                }
            })
            this.cart[i].qty = parseInt(this.cart[i].qty) + 1
            console.log('add one to cart');
            this.updateLocalStorage()
        },
        totalPrice() {
            var totalAmount = 0;
            this.cart.forEach(p => {
                totalAmount += parseInt(p.qty) * parseInt(p.price);
            });
            return totalAmount
        }
    }
}
</script>