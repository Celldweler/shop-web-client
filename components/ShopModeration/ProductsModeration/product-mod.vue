<template>
    <div>
        <b-container>
            <b-row align-h="end">
                <b-col cols="2.5" class="">
                    <b-button variant="primary" v-b-modal.modal-xl>Create</b-button>
                    Items: {{AllProducts.length}}
                </b-col>
            </b-row>
            <b-btn v-b-modal.editProductPopup>Show popup</b-btn>
        </b-container>

        <b-table @row-clicked="onRowClicked" responsive :no-border-collapse="true" bordered="bordered" class="mt-2"
            :fields="fields" hover sticky-header="600px" :items="AllProducts" head-variant="light">
            <!-- We are using utility class `text-nowrap` to help illustrate horizontal scrolling -->
            <template #cell(Remove)="data">
                <a @click="removeProduct($event, data.item.id)" href="#">
                    <img alt="Remove" title="Remove Product"
                        src="https://img.icons8.com/sf-ultralight-filled/25/000000/trash.png" />
                </a>
            </template>
            <template #cell(image)="data">
                <img :src="`https://localhost:5001/api/files/${data.item.image}`" width="150px" height="150px" alt="">
            </template>
            <template #head(Remove)="data">
                <span class="text-info">{{ data.key = '' }}</span>
            </template>
        </b-table>

        <editProductPopup/>
        <b-modal title="Edit Product" id="editProductModal" size="xl" centered>
            <b-row>
                <b-col class="col-6">
                    <p>Product Name</p>
                    <b-form-input v-if="selectedProduct!==null" class="" id="selectedProductName"
                        v-model="selectedProduct.name"></b-form-input>

                    <p>Description</p>
                    <b-form-textarea v-if="selectedProduct!==null" v-model="selectedProduct.description" class=""
                        id="textarea" placeholder="Enter product description..." rows="3" max-rows="6" />

                    <p>Price</p>
                    <b-form-input v-if="selectedProduct!==null" v-model="selectedProduct.price" />

                    <div v-if="selectedProduct!==null">
                        <h2>
                            Stock:
                        </h2>
                        <div v-for="(stock, i) in selectedProduct.stocks">
                            <b-row>
                                <b-col>
                                    <div v-if="i===0">Size:</div>
                                    <b-form-input class="mt-2" v-model="stock.description" />
                                </b-col>
                                <b-col>
                                    <div v-if="i===0">QTY:</div>
                                    <b-form-input class="mt-2" type="number" v-model="stock.count"></b-form-input>
                                </b-col>
                            </b-row>
                        </div>
                        <div v-if="showFormForCreateStock">
                            <b-row>
                                <b-col>
                                    <b-form-input placeholder="Enter stock size" class=" mt-2" />
                                </b-col>
                                <b-col>
                                    <b-form-input placeholder="Enter stock qty" class=" mt-2"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-button class="mt-2" @click="() => showFormForCreateStock=false">create</b-button>
                        </div>
                        <b-button v-if="!showFormForCreateStock" class="mt-1"
                            @click="() => showFormForCreateStock=true">new stock</b-button>
                    </div>
                </b-col>

                <b-col>
                    <div>
                        <div v-if="imageData!==null" @click="chooseImage" class="border mb-3 base-image-input"
                            :style="`height: 450px; background-color: rgba(255,0,0,0.1);background-image: url('${imageData}');background-size: 450px 450px;`">
                            <!-- <span v-if="!imageData" class="placeholder">
                                Choose an Image
                            </span> -->
                        </div>
                        <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
                        <div v-if="selectedProduct!==null && imageData===null">
                            <img class="border" :src="`https://localhost:5001/api/files/${selectedProduct.image}`"
                                width="450px" height="450" alt="" srcset="">
                        </div>
                        <b-button class="mt-2" @click="chooseImage">Change Image</b-button>

                    </div>
                </b-col>
            </b-row>

            <template #modal-footer="{ ok, cancel, hide }">
                <div class="d-flex align-items-center">
                    <div class="p-2">
                        <b-button variant="primary" @click="hideEditProductPopUp()">
                            Close
                        </b-button>
                    </div>
                    <div class="p-2">
                        <b-button variant="success" @click="updateProductInfo()">
                            Update
                        </b-button>
                    </div>
                </div>
            </template>
        </b-modal>

        <b-modal scrollable id="modal-xl" size="xl" centered title="Create New Product">
            <CreateProduct></CreateProduct>

            <template #modal-footer>
                <div></div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import CreateProduct from './create-product.vue';
import editProductPopup from './edit-product-popup.vue';

export default {
    components: { CreateProduct, editProductPopup },
    props: {
        products: Array
    },
    methods: {
        updateProductInfo() {
            this.selectedProduct.stocks = this.selectedProduct.stocks.map(x => {
                return {
                    description: x.description,
                    count: parseInt(x.count),
                    productId: x.productId,
                    stockId: x.stockId,
                }
            })
            this.selectedProduct.price = parseInt(this.selectedProduct.price);

            console.log('product edited', this.selectedProduct);
            // console.log(this.selectedProduct);
            // console.log(this.selectedProduct.image);
            const filename = this.selectedProduct.name.replace(' ', '-');
            var formData = new FormData();
            var productImage = { productId: this.selectedProduct.id, formFile: this.selectedProduct.image, newFileName: filename };

            formData.append("productImageUpdate.productId", productImage.productId);
            formData.append("productImageUpdate.formFile", productImage.formFile);
            formData.append("productImageUpdate.newFileName", productImage.newFileName);

            this.$axios.put("api/files", formData)
                .then(res => {
                    this.selectedProduct.image = res.data;
                    console.log(this.selectedProduct);
                    this.$axios.put('api/admin', this.selectedProduct).then(res => {
                        console.log(res);
                    })
                        .catch(er => {
                            console.log(er)
                        });
                    console.log(res.data);
                })
                .catch(er => {
                    console.log('updateProductInfo Errors: ', er);
                })
                .finally(() => {
                    this.$bvModal.hide("editProductModal")
                })
        },
        hideEditProductPopUp() {
            this.imageData = null;
            this.$bvModal.hide("editProductModal")
        },
        chooseImage() {
            this.$refs.fileInput.click()
        },
        onSelectFile() {
            const input = this.$refs.fileInput
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader()
                reader.onload = e => {
                    this.selectedProduct.image = files[0]
                    this.imageData = e.target.result
                }
                reader.onerror = er => {
                    console.log('FileReader Errors: ', er);
                };
                reader.readAsDataURL(files[0])
                // this.$emit('input', files[0])
            }
        },
        //
        removeProduct(e, id) {
            e.preventDefault();
            var i = this.AllProducts.findIndex(x => x.id === id)
            var p = this.AllProducts[i]
            this.AllProducts.splice(i, 1);
            this.$axios.delete('api/admin/' + id)
            console.log(p);
            console.log(id);

            this.$bvModal.msgBoxConfirm('Are you sure you want to permanently delete this product?', {
                title: 'Please Confirm',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'YES',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
                .then(value => {
                    this.$bvModal.msgBoxOk('Product was removed successfully', {
                        title: 'Confirmation',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                    }).then(res => {
                        console.log(res);
                    })
                })
                .catch(err => {
                    // An error occurred
                })
            console.log('remove product func called');
        },
        onRowClicked(item, index, event) {
            console.log('item', item);
            console.log('index', index);
            console.log('event', event);
            this.$axios.$get(`api/products/${item.id}`).then(res => {
                this.selectedProduct = {
                    id: res.id,
                    image: res.image,
                    name: res.name,
                    description: res.description,
                    price: res.price,
                    stocks: res.stocks
                }
            })
            // this.selectedProduct = item;

            // this.imageData =  item.image;
            this.$bvModal.show("editProductModal")
        }
    },
    created() {
        this.$axios.get('api/products').then(res => {
            this.AllProducts = res.data;
            // for (let j = 0; j < 10; j++) {
            //     for (let index = 0; index < 3; index++) {
            //         this.AllProducts.push(res.data[index])
            //     }
            // }
            this.AllProducts = this.AllProducts.map(x => { return { id: x.id, image: x.image, name: x.name, description: x.description, price: x.price, } })
            console.log(res.data);
        })
    },
    data: () => ({
        showFormForCreateStock: false,
        imageData: null,
        AllProducts: [],
        selectedProduct: null,
        fields: [
            {
                key: 'id',
                sortable: false
            },
            {
                key: 'image',
                sortable: false
            },
            {
                key: 'name',
                sortable: false
            },
            {
                key: 'description',
                sortable: false
            },
            {
                key: 'price',
                sortable: false
            },
            {
                key: 'Remove',
                sortable: false
            },
        ],
    })
}
</script>

<style scoped>
.base-image-input {
    display: block;
    /* width: 300px; */
    height: 250px;
    cursor: pointer;
    background-size: cover;
    background-position: center center;
}

.placeholder {
    background: #F0F0F0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 18px;
    font-family: Helvetica;
}

.placeholder:hover {
    background: #E0E0E0;
}

.file-input {
    display: none;
}
</style>