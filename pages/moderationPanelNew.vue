<template>
    <div>
        <button @click="callAdminAPi()">call admin api</button>
        <h1 class="text-center mt-2">Moderation Panel</h1>
        <b-row class="">
            <b-col class="col-2">
                <div class="d-flex flex-column">
                    <div class="p-2">
                        <a @click="() => setAdminMode('Dashboard')" href="#">Dashboard</a>
                    </div>
                    <div class="p-2">
                        <a @click="() => setAdminMode(ADMINMODE.Products)" href="#">Products</a>
                    </div>
                    <div class="p-2">
                        <a @click="() => setAdminMode(ADMINMODE.Orders)" href="#">Orders</a>
                    </div>
                    <div class="p-2">
                        <a @click="() => setAdminMode(ADMINMODE.Stock)" href="#">Stock</a>
                    </div>
                    <div class="p-2">
                        <a @click="() => setAdminMode(ADMINMODE.Customers)" href="#">Customers</a>
                    </div>
                    <div class="p-2">
                        <a @click="() => setAdminMode(ADMINMODE.Categories)" href="#">
                            Categories
                        </a>
                    </div>
                    <div class="p-2">
                        <a @click="() => setAdminMode(ADMINMODE.Chats)" href="#">
                            Customer Questions
                        </a>
                    </div>
                </div>
            </b-col>
            <b-col>
                <h3> {{adminMode}} </h3>

                <ProductMod :products="products" v-if="adminMode===ADMINMODE.Products"></ProductMod>
                <CustomersList v-if="adminMode===ADMINMODE.Customers"></CustomersList>
                <CategoryList v-if="adminMode===ADMINMODE.Categories"></CategoryList>
                <Dashboard v-if="adminMode==='Dashboard'"></Dashboard>
                <CustomerQuestions v-if="adminMode===ADMINMODE.Chats"></CustomerQuestions>
            </b-col>
        </b-row>
    </div>
</template>


<script>
import { Server } from 'http';
import { UserManager, WebStorageStateStore } from 'oidc-client'
import CreateProduct from '../components/ShopModeration/ProductsModeration/create-product.vue';
import ProductMod from '../components/ShopModeration/ProductsModeration/product-mod.vue';
import Dashboard from '../components/ShopModeration/dashboard.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';
import CustomersList from '../components/ShopModeration/customers-admin/customers-list.vue';
import CategoryList from '../components/ShopModeration/category-moderation/category-list.vue';
import CustomerQuestions from '../components/ShopModeration/moderation-questions/customer-questions.vue';

export default {
    name: "ModerationPanelPage",
    computed: mapState('admin', {
        adminMode: state => state.mode
    }),
    data: () => ({
        testModel: '',
        // ...mapState('admin/index', ['mode']),
        ADMINMODE: {
            Products: "PRODUCTS",
            Orders: "ORDERS",
            Stock: "STOCK",
            Customers: "CUSTOMERS",
            Categories: "Categories",
            Chats: 'chats'
        },
        CurrentAdminMode: "PRODUCTS",
        products: [],
        product: {
            id: 0,
            name: "",
            description: "",
            price: 0,
            stocks: [],
        },
        stock: {
            stockId: 0,
            description: "Size",
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
            window.onpopstate = function (e) {
                if (e.state !== null) {
                }
                else {
                    if (window.location.href.substr(window.location.href.length - 1) != "#") {
                        location.reload();
                    }
                }
            };
            this.CurrentAdminMode = this.ADMINMODE.Products;
            this.userManager = new UserManager({
                userStore: new WebStorageStateStore({ store: window.localStorage }),
            });
            this.userManager.getUser().then(user => {
                console.log(user);
            });
            this.$axios.$get("/api/products")
                .then((data) => {
                    this.products = data;
                    console.log("products: ", this.products);
                });
        }
    },
    methods: {
        callAdminAPi () {
            var product =  {
                name: 'test',
                description: "test desc",
                price: 10,
                image: 'kaskfkas.png',
                stocks: [
                    { description: 'xl', count: 10 }
                ]
            }
            this.$axios.post('api/admin', product).then(res => {
                console.log(res);
            })
            .catch(er => {
                console.log(er);
            })
        },  
        ...mapMutations('admin', ['setAdminMode', 'resetAdminMode']),
        uploadFile(e) {
            console.log("uploading");
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
            var i = this.products.findIndex(x => x.productId === stock.productId);
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
            var i = this.products.findIndex(x => x.productId === newStock.productId);
            console.log(i);
            if (this.products[i].stocks === null) {
                this.products[i].stocks = [];
            }
            this.products[i].stocks.push(newStock);
            console.log(newStock);
        },
        onProductClick(id) {
            this.showAllStockFlag = true;
            this.stock.description = "";
            this.stock.count = 0;
            this.stock.productId = id;
            this.showCreateNewStockForm = true;
            console.log("click");
        },
        showFormForCreateProduct() {
            this.showBtnCreateProductFlag = true;
            this.showForm = true;
            this.product = {
                id: 0,
                name: "",
                description: "",
                price: 0
            };
        },
        createProduct() {
            var p = {
                productId: parseInt(this.product.id),
                name: this.product.name,
                description: this.product.description,
                price: parseInt(this.product.price)
            };
            if (p.name !== "" && p.name !== undefined && p.name !== null &&
                p.description !== "" && p.description !== undefined && p.description !== null &&
                p.price !== "" && p.price !== undefined && p.price !== 0 && p.price !== null) {
                this.$axios.post("/api/admin", p)
                    .then(res => {
                        console.log(res);
                        this.products.push(res.data);
                        this.showForm = false;
                    })
                    .catch(er => {
                        console.log(er);
                    });
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
            this.showBtnCreateProductFlag = false;
            this.product = {
                productId,
                name,
                price,
                description,
            };
            console.log(this.product);
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
            console.log("edited product with id=" + this.product.productId + ":\n", this.product);
            this.showForm = false;
        },
        deleteProduct() {
            var id = this.productIdToRemove;
            this.$axios.$delete("/api/admin/" + this.productIdToRemove)
                .then(res => {
                    console.log(res);
                    var index = this.products.findIndex(p => p.productId === id);
                    console.log(index);
                    this.products.splice(index, 1);
                    console.log("remove product with id: ", this.productIdToRemove);
                    this.showWarnFlag = false;
                })
                .catch(error => {
                    console.log("removing product errors: ", error);
                });
        },
        async getProductsFromApi() {
            this.$axios.$get("/api/admin")
                .then((data) => {
                    this.products = data;
                    console.log("products: ", this.products);
                });
        }
    },
    components: { CreateProduct, ProductMod, Dashboard, CustomersList, CategoryList, CustomerQuestions }
}
</script>