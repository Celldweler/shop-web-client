<template>
    <div>
        <div class="card-style">
            <b-progress :value="progress" variant="success"></b-progress>
        </div>
            <!-- step 1 fill information about new product -->
        <b-card v-if="current_step==1" class="card-style" title="1 Info about new product:">
            <b-form-input v-model="testProduct.name" placeholder="Enter product name" />
            <b-form-textarea v-model="testProduct.description" class="mt-2" id="textarea"
                placeholder="Enter product description..." rows="3" max-rows="6" />

            <b-form-input v-model="testProduct.price" class="mt-2" placeholder="Enter product price" />
            <b-form-select class="mt-2" v-model="selectedCategory" :options="selectCategoryOptions"></b-form-select>

            <b-button class="float-right mt-2" variant="primary" @click="onClickNext">Next</b-button>
        </b-card>

        <b-card v-if="current_step==2" class="card-style" title="Step 2">
            <div @click="chooseImage" class="border mb-3 base-image-input"
                :style="`height: 600px; background-color: rgba(255,0,0,0.1);background-image: url(${imageData});background-size: 670px 500px;`">
                <span v-if="!imageData" class="placeholder">
                    Choose an Image
                </span>
                <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
            </div>

            <b-button class="float-left" variant="secondary" @click="onClickBack">Back</b-button>
            <b-button class="float-right" variant="primary" @click="onClickNext">Upload Product Image</b-button>
        </b-card>

        <b-card v-if="current_step===3" class="card-style" title="Stock">
            <b-container>
                Default Stock Value:

                <div v-for="(stock, index) in defaultStock"
                    :key="`create-product-modal-stock--${stock.stockSize}--${index+1}`">
                    <b-row class="mb-3">
                        <!-- XS S M L XL -->
                        <b-col cols="4">
                            <b-form-input :ref="`stockSize-Input-${index}`" :value="stock.stockSize"></b-form-input>
                        </b-col>
                        <b-col cols="4">
                            <b-form-input type="number" v-model="stock.qty" placeholder="Enter QTY">
                            </b-form-input>
                        </b-col>
                        <b-col cols="1">
                            <div @click="onClickTop(index)">
                                <img
                                    src="https://img.icons8.com/external-those-icons-fill-those-icons/20/000000/external-up-arrows-those-icons-fill-those-icons-1.png" />
                            </div>
                            <div @click="onClickDown(index)">
                                <img
                                    src="https://img.icons8.com/external-those-icons-fill-those-icons/20/000000/external-down-arrows-those-icons-fill-those-icons.png" />
                            </div>
                        </b-col>
                        <b-col cols="1.5" class="mr-2">
                            <a @click="editOneStock($event, stock, index)" href="">Update</a>
                        </b-col>
                        <b-col cols="1.5" class="">
                            <a @click="removeOneStock($event, stock)" href="">Remove</a>
                        </b-col>
                    </b-row>
                </div>

                <b-row class="" align-h="center">
                    <b-col cols="1.5" class="">
                        <b-button @click="newStock()">new stock</b-button>
                        <!-- <b-button v-if="createNewStockMode" @click="addNewStock()">Create</b-button> -->
                    </b-col>
                </b-row>

            </b-container>

            <b-button class="float-left" variant="secondary" @click="onClickBack">Back</b-button>
            <b-button class="float-right mt-2" variant="primary" @click="onClickNext">Next</b-button>
        </b-card>

        <b-card v-if="current_step==4" class="card-style" title="Preview">
            <b-card-text>Finished!</b-card-text>
            <b-row>
                <b-col class="border">
                    <img :src="imageData" width="500px" alt="" srcset="">
                </b-col>
                <b-col class="border">
                    <h2 class="mt-3 mb-3">
                        {{ testProduct.name }}
                    </h2>
                    Description:
                    <h4 class="text-muted">
                        {{ testProduct.description }}
                    </h4>
                    <hr>
                    <h5>
                        Price: ${{ testProduct.price }}
                    </h5>
                    <hr>
                    Stocks:
                    <div v-for="s in testProduct.stocks">
                        {{ s.description }} -- QTY:{{ s.count }}
                    </div>
                </b-col>
            </b-row>

            <b-row align-h="center" class="mt-2">
                <b-col cols="1" class="">
                    <b-button class="float-left" variant="secondary" @click="onClickBack">Back</b-button>
                </b-col>
                <b-col cols="7" class=""></b-col>
                <b-col cols="2" class="">
                    <!-- <b-button class="float-center" variant="success" @click="onClickFirst">Back to first</b-button> -->
                    <b-button class="float-center" variant="success" @click="sendNewProductToServer">Create</b-button>

                </b-col>
            </b-row>
        </b-card>
    </div>
</template>
<script>

export default {
    name: "CreateProduct",
    created() {
        this.$axios.get('api/categories').then(res => {
            this.selectCategoryOptions = res.data.map(x => {
                return {value: x.id, text:  x.name}
            })
            this.selectCategoryOptions.unshift( { value: 1, text: 'Select Product Category', disabled: true })
        })
        this.defaultStock = [
            { stockSize: 'XS', qty: 100, isCreateMode: false },
            // { stockSize: 'S', qty: 100, isCreateMode: false },
            // { stockSize: 'M', qty: 100, isCreateMode: false },
            // { stockSize: 'L', qty: 100, isCreateMode: false },
            // { stockSize: 'XL', qty: 100, isCreateMode: false },
        ];
        this.testProduct.stocks = this.defaultStock.map(x => {
            return {
                description: x.stockSize,
                count: x.qty,
            }
        });
    },
    data() {
        return {
            selectCategoryOptions: [
                { value: 1, text: 'Select Product Category' }
            ],
            selectedCategory: 1,
            createNewStockMode: true,
            imageData: null,
            file: null,
            current_step: 1,
            max_step: 4,
            defaultStock: [],
            testProduct: {
                image: '', //'https://localhost:44322/api/files/Img__GLOCKS__JEANS.png',
                name: '',  //'GLOCKS A312 JEANS D GR',
                description: '',    // 'Rap fit. Water repellent fabric. Glock suede patches + embroidered logo and text. Removable lil bag. Genuine leather branded embossing. YKK zippers. 82% cotton, 18% polyester.',
                price: 0,
                categoryName: null,
                stocks: [],
            }
        };
    },
    computed: {
        progress: function () {
            return Math.round(100 / this.max_step) * this.current_step;
        }
    },
    methods: {
        sendNewProductToServer() {
            console.log('product sended');

            this.testProduct.categoryId = parseInt(this.selectedCategory)
            // console.log(this.selectedCategory);

            const filename = this.testProduct.name.replace(' ', '-');
            var formData = new FormData();
            var productImage = { formFile: this.testProduct.image, fileName: filename };

            formData.append("productImage.formFile", productImage.formFile);
            formData.append("productImage.fileName", productImage.fileName);

            this.$axios.post('api/files', formData).then(res => {
                this.testProduct.image = res.data;
                this.testProduct.price = parseInt(this.testProduct.price)
                this.$axios.post('/api/admin', this.testProduct).then(res => {
                    this.$bvModal.msgBoxOk('Product was submitted successfully', {
                        title: 'Confirmation',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                    }).then(res => {
                        this.$bvModal.hide('modal-xl')
                    })
                })
            })
                .catch(er => {
                    console.log('', er);
                })
        },
        editOneStock(e, stock, index) {
            e.preventDefault();
            console.log('editOneStock called');
            var value = this.$refs[`stockSize-Input-${index}`][0].localValue;
            var i = this.defaultStock.indexOf(stock)
            this.defaultStock[i].stockSize = value;
            console.log(this.defaultStock[i]);
        },
        removeOneStock(e, stock) {
            e.preventDefault();
            console.log('removeOneStock called');
        },
        newStock() {
            this.defaultStock.push({ stockSize: '', qty: 0 })
            this.createNewStockMode = true;
        },
        onClickTop(index) {
            console.log('move top');
            console.log(index);
            if (index === 0)
                return;
            else {
                var tempStock = { stockSize: this.defaultStock[index].stockSize, qty: this.defaultStock[index].qty }

                // change current stock
                this.defaultStock[index].stockSize = this.defaultStock[index - 1].stockSize;
                this.defaultStock[index].qty = this.defaultStock[index - 1].qty;

                // change previous
                this.defaultStock[index - 1].stockSize = tempStock.stockSize;
                this.defaultStock[index - 1].qty = tempStock.qty;
            }
        },
        onClickDown(index) {
            console.log('move down');
            if (this.defaultStock.length - 1 === index) {
                console.log('ky');
                return;
            }
            else {
                console.log('ky');

                var tempStock = { stockSize: this.defaultStock[index].stockSize, qty: this.defaultStock[index].qty }

                // change current stock
                this.defaultStock[index].stockSize = this.defaultStock[index + 1].stockSize;
                this.defaultStock[index].qty = this.defaultStock[index + 1].qty;

                // change next
                this.defaultStock[index + 1].stockSize = tempStock.stockSize;
                this.defaultStock[index + 1].qty = tempStock.qty;
            }

        },
        chooseImage() {
            this.$refs.fileInput.click()
        },
        onSelectFile() {
            const input = this.$refs.fileInput
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                    this.testProduct.image = files[0];
                    console.log(this.testProduct.image);
                    this.imageData = e.target.result
                }
                reader.readAsDataURL(files[0])
                this.$emit('input', files[0])
            }
        },
        onClickNext: function () {
            this.current_step++;
        },
        onClickBack: function () {
            this.current_step--;
        },
        onClickFirst: function () {
            this.current_step = 1;
        }
    }
};
</script>
  
<style scoped>
.card-style {
    width: 90%;
    margin: 0 auto;
}

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