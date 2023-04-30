<template>
    <div>
        <h1>Admin Panel</h1>
        <button @click="showFormForCreateProduct">Create New Prouct</button>

        <div v-if="showWarnFlag">
            <h2 style="color: red;">Are you sure want to delete this product with id:{{ productIdToRemove }}?</h2>
            <button @click="deleteProduct">Yes</button>
            <button @click="() => showWarnFlag = false">Cancel</button>
        </div>

        <div v-for="p in products" :key="`item__${p.name}__${p.id}`">
            <div @click="onProductClick(p.id)">
                <img :src="`https://localhost:44322/api/files/${p.image}`" width="200" height="200">
                {{ p.id }} - {{ p.name }} - ${{ p.price }}
                - <button v-on:click="showEditProductFormAndFillIt(p)">Edit</button>
                - <button @click="showWarnText(p.id)">Remove</button>

            </div>
            <input type="file" @change="uploadFile($event)" />

            <div v-show="showAllStockFlag" v-if="p.stocks !== null" v-for="s in p.stocks"
                :key="`stock__${s.stockId}__${s.productId}`">
                <input v-model="s.description" type="text">
                <input v-model="s.count" type="text">
                <button @click="editStock(s)">Update</button>
            </div>
            <p></p>
        </div>

        <div v-if="showCreateNewStockForm">
            <h3>New Stock</h3>
            <input v-model="stock.stockId" type="text">
            <input v-model="stock.description" type="text">
            <input v-model="stock.count" type="text">
            <button @click="addNewStock()">Add</button>
            <button @click="() => showCreateNewStockForm = false">Cancel</button>
        </div>

        <div v-if="showForm">
            ID:
            <input v-model="product.productId" type="text" /> <br>
            Product Name
            <input v-model="product.name" type="text"> <br>
            Description
            <input v-model="product.description" type="text"> <br>
            Price
            <input v-model="product.price" type="number">
            <p></p>
            <button v-if="!showBtnCreateProductFlag" @click="updateProduct">Edit</button>
            <button v-else @click="createProduct">Create</button>
            <button @click="() => showForm = false">Cancel</button>
        </div>
    </div>
</template>


<script>
import { Server } from 'http';
import { UserManager, WebStorageStateStore } from 'oidc-client'

export default {
    name: 'ModerationPanelPage',
    data: () => ({
        products: [],
        product: {
            id: 0,
            name: '',
            description: '',
            price: 0,
            stocks: [],
        },
        stock: {
            stockId: 0,
            description: 'Size',
            count: 0,
            productId: 0,
        },
        showForm: false,
        showWarnFlag: false,
        productIdToRemove: 0,
        showBtnCreateProductFlag: false,
        showCreateNewStockForm: false,
        showAllStockFlag: false,
        userManager: null,
    }),
    created() {
        if (!process.server) {

            this.userManager = new UserManager({
                userStore: new WebStorageStateStore({ store: window.localStorage }),
            });

            this.userManager.getUser().then(user => {
                console.log(user)
            })

            this.$axios.$get("/api/products")
                .then((data) => {
                    this.products = data
                    console.log("products: ", this.products)
                })
        }
    },
    methods: {
        uploadFile(e) {
            console.log('uploading');
            var file = e.target.files[0];
            var formData = new FormData();
            formData.append("file", file);

            this.$axios.post("/api/test", formData).then(res => {
                console.log(res);
            })
                .catch(er => {
                    console.log(er);
                });
        },
        editStock(stock) {
            console.log(stock);
            var i = this.products.findIndex(x => x.productId === stock.productId)

            var stockIndex = this.products[i].stocks.findIndex(s => s.stockId === stock.stockId);

            this.products[i].stocks[stockIndex].description = stock.description;
            this.products[i].stocks[stockIndex].count = stock.count;
        },
        addNewStock() {
            var newStock = {
                stockId: this.stock.stockId,
                description: this.stock.description,
                count: this.stock.count,
                productId: this.stock.productId,
            };
            var i = this.products.findIndex(x => x.productId === newStock.productId)

            console.log(i);
            if (this.products[i].stocks === null) {
                this.products[i].stocks = []
            }
            this.products[i].stocks.push(newStock)

            console.log(newStock);
        },
        onProductClick(id) {
            this.showAllStockFlag = true;
            this.stock.description = ''
            this.stock.count = 0
            this.stock.productId = id
            this.showCreateNewStockForm = true;
            console.log("click");
        },
        showFormForCreateProduct() {
            this.showBtnCreateProductFlag = true;
            this.showForm = true
            this.product = {
                id: 0,
                name: '',
                description: '',
                price: 0
            }
        },
        createProduct() {
            var p = {
                productId: parseInt(this.product.id),
                name: this.product.name,
                description: this.product.description,
                price: parseInt(this.product.price)
            };

            if (p.name !== '' && p.name !== undefined && p.name !== null &&
                p.description !== '' && p.description !== undefined && p.description !== null &&
                p.price !== '' && p.price !== undefined && p.price !== 0 && p.price !== null) {
                this.$axios.post('/api/admin', p)
                    .then(res => {
                        console.log(res)
                        this.products.push(res.data)
                        this.showForm = false
                    })
                    .catch(er => {
                        console.log(er)
                    })
            }
            else {
                return;
            }

        },
        showWarnText(id) {
            this.showWarnFlag = true;
            this.productIdToRemove = id;
        },
        showEditProductFormAndFillIt({ productId, name, description, price }) {
            this.showBtnCreateProductFlag = false
            this.product = {
                productId,
                name,
                price,
                description,
            }
            console.log(this.product)
            this.showForm = true;
        },
        updateProduct() {
            var index = this.products.findIndex(x => x.productId === this.product.productId);

            this.products[index].name = this.product.name;
            this.products[index].description = this.product.description;
            this.products[index].price = this.product.price;

            this.$axios.$put("/api/admin", this.product)
                .then(res => console.log(res))
                .catch(er => console.log("update product error: ", er));

            console.log("edited product with id=" + this.product.productId + ":\n", this.product)
            this.showForm = false;

        },
        deleteProduct() {
            var id = this.productIdToRemove;
            this.$axios.$delete("/api/admin/" + this.productIdToRemove)
                .then(res => {
                    console.log(res)
                    var index = this.products.findIndex(p => p.productId === id);
                    console.log(index)
                    this.products.splice(index, 1)
                    console.log("remove product with id: ", this.productIdToRemove)
                    this.showWarnFlag = false;
                })
                .catch(error => {
                    console.log("removing product errors: ", error)
                })
        },

        async getProductsFromApi() {
            this.$axios.$get("/api/admin")
                .then((data) => {
                    this.products = data
                    console.log("products: ", this.products)
                })
        }
    }
}
</script>