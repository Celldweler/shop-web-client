<template>
    <!--  style="background-color: #d2c9ff;" -->
    <div>
        <b-container class="">
            <div class="d-flex justify-content-center">
                <h1 style="color: blue;">RAIME SHOP</h1>
            </div>
            <b-row>
                <b-col>
                   <product-item-swiper :images="images"/>
                    <!-- <img :src="`https://localhost:5001/api/files/${product.imagePath}`" height="500" width="500"> -->
                </b-col>
                <b-col class="mt-5">
                    <h3>
                        {{ product.name }}
                    </h3>

                    <h4 class="text-secondary">
                        ${{ product.price }}
                    </h4>
                    <label for="formSelect">Size:</label>
                    <b-form-select  id="formSelect" class="col-2" v-model="addToCartProductModel.stockDescription"
                        :options="product.stocks.map(x => x.description).reverse()" />
                    <!-- <option v-for="stock in product.stocks.reverse()" :key="`size--${stock.stockId}`"
                        @value="`stockId:${stock.stockId};productId:${stock.id}`">
                        {{ stock.description }}
                    </option>
                </select> -->

                    <!-- <p></p> -->
                    <!-- Qty: <input v-model="addToCartProductModel.qty" type="number"> -->
                    <div class="mt-2">
                        <label for="sb-inline">Qty: </label>
                        <b-form-spinbutton min="1" class="" id="sb-inline" v-model="addToCartProductModel.qty" inline>
                        </b-form-spinbutton>
                    </div>

                    <div class="d-flex justify-content-center align-items-center mt-2">
                        <div>
                            <b-button variant="warning" size="lg" @click="addToCart">
                                <img src="https://img.icons8.com/cotton/30/000000/shopping-cart--v2.png" />
                                ADD TO CART
                            </b-button>
                        </div>
                        <div class="ml-3">
                            <a href="" @click="addToWishList($event)">
                                <img src="https://img.icons8.com/material-outlined/40/000000/filled-like.png" />
                            </a>
                        </div>
                    </div>
                    <hr>
                    PRODUCT DESCRIPTION
                    <h5 class="text-muted">
                        {{ product.description }}
                    </h5>
                    <hr>
                    <a href="" @click="redirectToChatWithSeller($event)">
                        <img src="https://img.icons8.com/ios/23/000000/ask-question.png" />
                        Написать продавцу
                    </a>
                </b-col>
            </b-row>

            <!-- <button @click="checkout()">Checkout</button> -->
            <div class="d-flex justify-content-center">
                <nuxt-link to="/">BACK TO SHOP</nuxt-link>
            </div>
            <nuxt-link to="/cart">Check Your Cart </nuxt-link>
            <hr>
            <div class="">
                <h1> Comments </h1>
            </div>
            <b-form-input class="" placeholder="Enter text of comment" v-model="content"></b-form-input>
            <b-btn @click="send" class="mt-2" variant="success">LEAVE COMMENT</b-btn>
            <hr>
            <div v-if="comments.length === 0">
                <h2>No comments yet</h2>
            </div>
            <div v-if="comments.length > 0" class="customer-comments">
                <div class="parent-comments ml-1">
                    <Comment v-for="comment in comments" :comment="comment" @replyToComment="replyToComment"
                        :key="comment.commentId"></Comment>
                </div>
            </div>

            <b-modal id="product-added-to-cart-modal">
                Product Added To Cart
            </b-modal>
            <b-modal id="write-to-seller-modal" title="Написать продавцу" centered>
                <small class="text-muted">Вопрос о товаре</small>
                <b-form-textarea v-model="message" id="textarea" placeholder="Введите свой вопрос..." rows="6" max-rows="6">
                </b-form-textarea>

                <template #modal-footer>
                    <div class="d-flex  flex-row align-items-center" style="width: 500px;">
                        <b-btn @click="sendMessageToSeller()" variant="primary">Отправить</b-btn>
                        <a @click="closeSendMessageToSellerPopup()" href="#" onfocus="" class="ml-2">Закрыть</a>
                    </div>
                </template>
            </b-modal>
        </b-container>
    </div>
</template>

<script>
import Comment from '../../components/comments/comment.vue';
import wishListVue from '../../components/CustomerProfile/wish-list.vue';
import productItemSwiper from '../../components/product-item-swiper.vue';

export default {
    data: () => ({  
        images: [
            "Img__GLOCKS__JEANS.png",
            "PIC_PREDATOR_VEST.png",
            "PIC_BELTS_DISTRESSED_JEANS_DARK.png",
            "666-TEE WH.jfif",
            "D.O.C.-FULL ZIP PUFFER JKT BL.jpeg",
            "W.O.F.-FULL ZIP HOODIE BL.jpeg",
            "XCROSS-T WASHED HOODIE DARK GR.jfif",
        ],      
        message: '',
        content: '',
        comments: [],
        product: {
            id: 0,
            name: "",
            description: "",
            price: 0,
            image: "",
            stocks: []
        },
        addToCartProductModel: {
            id: 0,
            price: 0,
            productName: "",
            qty: 1,
            stockId: 0,
            stockDescription: "XS",
            image: "",
        },
        customerProductInCart: []
    }),
    created() {
        this.getAllComments()

        var id = parseInt(this.$route.params.product);
        this.$axios.get("/api/products/" + id).then(res => {
            this.product = res.data;
            console.log(this.product);
        });
        console.log(this.$route.params.product);
    },
    methods: {
        sendMessageToSeller() {
            var messageRequest = {
                content: this.message, // text message
                chatRoomName: 'Вопрос о товаре ' + this.product.name,
                productId: this.product.id,
            }

            this.$axios.post('chats/createMessage', messageRequest).then(res => {
                console.log(res);
                this.message = ''
                this.$bvModal.hide('write-to-seller-modal')
            })
                .catch(er => {
                    console.log('create message error', er);
                })
        },
        closeSendMessageToSellerPopup() {
            this.$bvModal.hide('write-to-seller-modal')
        },
        redirectToChatWithSeller(e) {
            if (e !== null) {
                e.preventDefault();
            }

            this.$bvModal.show('write-to-seller-modal')
            return;
            var profileMode = {
                mode: 'CHATS', product: {
                    id: this.product.id,
                    name: this.product.name,
                    price: this.product.price,
                    image: this.product.image
                }
            }
            localStorage.setItem('user-profile-session', JSON.stringify(profileMode))

            this.$router.push('/profile')
        },
        addToWishList(e) {
            e.preventDefault();

            var wishItemRequest = { productId: this.product.id };
            this.$axios.post('customer-wish-list', wishItemRequest).then(res => {
                console.log(res);
                console.log('product added to wish list');
                if (res.ok === false) return;
                var listFromLocalStore = localStorage.getItem('wish-list')
                if (listFromLocalStore === null) {
                    listFromLocalStore = []
                    listFromLocalStore.push(res.data)
                }
                else {
                    listFromLocalStore = JSON.parse(listFromLocalStore)
                    listFromLocalStore.push(res.data)
                }
                localStorage.setItem('wish-list', JSON.stringify(listFromLocalStore))
            })
                .catch(er => {
                    console.log(er);
                })

        },
        cancelReply(e) {
            e.preventDefault();
            this.replying = false
            this.selectedComment = null
        },
        toggle(e, c) {
            e.preventDefault();
            this.replying = true
            this.selectedComment = c
        },
        showReply(parentCommentId, index) {
            this.$axios.get(`comments/${parentCommentId}/replies`).then(res => {
                this.comments.splice(index + 1, 0, ...res.data)
            })
        },
        replyToComment(commentId, content) {
            this.replying = false;
            var reply = {
                content: content
            }
            console.log(commentId, content, reply);
            this.$axios.post(`comments/${commentId}/replies`, reply).then(res => {
                this.getAllComments()
            })
                .catch(er => {
                    console.log(er);
                })
        },
        send() {
            var comment = {
                content: this.content,
                productId: parseInt(this.$route.params.product)
            }
            this.$axios.post('comments', comment)
                .then(res => {
                    console.log(res);
                    this.content = ''
                    this.getAllComments()
                })
                .catch(er => {
                    console.log(er);
                })
        },
        getAllComments() {
            return this.$axios.get('comments/' + this.$route.params.product).then(res => {
                this.comments = res.data;
                console.log("comments: ", res);
            })
        },
        // comments end
        checkout() {
        },
        addToCart() {
            this.addToCartProductModel.id = this.product.id;
            var i = this.product.stocks.findIndex(s => s.description === this.addToCartProductModel.stockDescription);
            this.addToCartProductModel.stockId = this.product.stocks[i].stockId;
            this.addToCartProductModel.productName = this.product.name;
            this.addToCartProductModel.price = this.product.price;
            this.addToCartProductModel.image = this.product.image;

            var oldCart = localStorage.getItem("cart");
            if (oldCart === null) {
                this.customerProductInCart.push(this.addToCartProductModel);
                const cart = JSON.stringify(this.customerProductInCart);
                localStorage.setItem("cart", cart);
                console.log("product added to cart");
                return;
            }
            else {
                var tempCart = JSON.parse(oldCart);
                var newCartItem = this.addToCartProductModel;
                var index = -1;
                tempCart.forEach((item, i) => {
                    if (item.id === newCartItem.id && item.stockId === newCartItem.stockId) {
                        index = i;
                        return;
                    }
                });
                if (index !== -1) {
                    tempCart[index].qty = parseInt(newCartItem.qty) + parseInt(tempCart[index].qty);
                }
                else {
                    tempCart.push(newCartItem);
                }
                localStorage.setItem("cart", JSON.stringify(tempCart));
                console.log("product added to cart");
            }
            // this.$bvModal.show('product-added-to-cart-modal');
            this.$bvModal.msgBoxOk("Product Added To Cart");
            // window.setTimeout(() =>  this.$bvModal.hide('product-added-to-cart-modal'), 2000);
        },
        clearCart() {
            localStorage.clear();
        },
        chooseSize() {
            console.log("you choose size: ", this.addToCartProductModel.stockDescription);
        },
    },
    components: { Comment, productItemSwiper }
}
</script>


<style>

</style>