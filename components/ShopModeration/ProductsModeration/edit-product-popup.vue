<template>
    <b-modal :title="`Edit product details - ${product.name}`" id="editProductPopup" size="xl" centered>
        <b-tabs content-class="mt-3" card>
            <b-tab title="Product Info" active :title-link-class="'tab-title-class'">
                <label for="">Product Name: </label>
                <b-form-input class=""></b-form-input>
                <label for="">Description: </label>
                <b-form-textarea></b-form-textarea>
                <label for="">Categories:</label>
                <b-form-select v-model="selectedCategory" :options="categories"></b-form-select>
                <label for="">Manufacturers:</label>
                <b-form-select v-model="selectedManufacturer" :options="manufacturers" />
            </b-tab>

            <b-tab title="Shipping" :title-link-class="'tab-title-class'">
                <div class="d-flex justify-content-between col-4 mt-2">
                    <div class=" ">
                        <p class="mt-2">Weight:</p>
                        <p class="mt-3">Length:</p>
                        <p class="mt-4">Width:</p>
                        <p class="mt-4">Height:</p>
                        <p>Free Shipping:</p>
                        <p class="mt-4">Delivery Date:</p>
                    </div>
                    <div class="">
                        <b-form-input v-model="shippingValue.weight" class="col-9" type="number" min="0.00"></b-form-input>
                        <b-form-input v-model="shippingValue.legth" class="col-9 mt-2" type="number"
                            min="0.00"></b-form-input>
                        <b-form-input v-model="shippingValue.width" class="col-9 mt-2" type="number"
                            min="0.00"></b-form-input>
                        <b-form-input v-model="shippingValue.height" class="col-9 mt-2" type="number"
                            min="0.00"></b-form-input>
                        <b-form-checkbox size="lg" class="mt-2"></b-form-checkbox>
                        <b-form-select :options="shippingValue.deliveryDate" class="col-9 mt-2"></b-form-select>
                    </div>
                </div>

            </b-tab>

            <b-tab title="Inventory" :title-link-class="'tab-title-class'">
                <b-row>
                    <b-col class="">
                        <div >Size:</div>
                        <b-form-input placeholder="Enter stock description" class="mt-2"  />
                    </b-col>
                    <b-col class="">
                        <div >QTY:</div>
                        <b-form-input class="mt-2" type="number" min="1"></b-form-input>
                    </b-col>
                    <b-col>
                        <div >Display Order:</div>
                        <b-form-input class="mt-2" type="number" min="1"></b-form-input>
                    </b-col>
                    <b-col>
                        <hr>
                        <b-btn variant="danger">Delete</b-btn>
                    </b-col>
                </b-row>
                <b-btn variant="success" class="mt-2">Add New</b-btn>
                <b-form-group class="mt-2" id="fieldset-horizontal" label-cols-sm="2" label-cols-lg="2" content-cols-sm
                    content-cols-lg="7" description="" label="Not returnable" label-for="input-horizontal">
                    <b-form-checkbox id="input-horizontal" switch size="lg"></b-form-checkbox>
                </b-form-group>
            </b-tab>

            <b-tab title="Multimedia" :title-link-class="'tab-title-class'">
                <b-row>
                    <b-col>
                        <h5>Picture</h5>
                        <img src="https://localhost:5001/api/files/Img__GLOCKS__JEANS.png" width="150px" alt="">
                    </b-col>
                    <b-col>
                        <h5>Display Order</h5>
                        <b-form-input type="number" class="mt-5" min="1"/>
                    </b-col>
                    <b-col>
                        <h5>Title</h5>
                        <b-form-input class="mt-5" placeholder="Img__GLOCKS__JEANS"></b-form-input>
                    </b-col>
                    <b-col>
                        <br>
                        <b-btn variant="danger" class="mt-5">Delete</b-btn>
                    </b-col>
                </b-row>
                <hr>
                <img src="" width="100" ref="prodPic" alt="">
                <p>Add a new picture</p>
                <b-form-file v-model="productPicture" @change="fileHandle"></b-form-file>
                <b-btn variant="success">Upload files</b-btn>
            </b-tab>
        </b-tabs>
    </b-modal>
</template>

<script>

export default {
    data: () => ({
        productPicture: null,
        shippingValue: {
            weight: 5.000,
            legth: 4.00,
            width: 3.00,
            height: 3.00,
            isFreeShipping: true,
            deliveryDate: [
                { value: 1, text: 'None' }, { value: 2, text: '1-2 days' }, { value: 3, text: '3-5 days' },
                { value: 4, text: '1 week' }
            ]
        },
        product: {
            name: 'Rap Pants'
        },
        selectedManufacturer: null,
        selectedCategory: null,
        manufacturers: [
            { value: 1, text: "Sort Company" },
            { value: 2, text: "Undersoul Wear" },
            { value: 3, text: "Shinigami Culture" },
            { value: 4, text: "159Wear" },
            { value: 5, text: "Sangvinik Kyiv" },
        ],
        categories: [
            { value: 1, text: "T-SHIRT" },
            { value: 2, text: "PANTS" },
            { value: 3, text: "JACKETS" },
            { value: 4, text: "HATS" },
            { value: 5, text: "Jawerly" },
            { value: 6, text: "Accesories" },
        ]
    }),
    methods: {
        fileHandle(e){
            var file = e.target.files[0];
            var fileReader = new FileReader();

            var imgTag = this.$refs.prodPic;
            imgTag.title = file.name;

            fileReader.onload = function(event) {
                imgTag.src = event.target.result;
            }

            fileReader.readAsDataURL(file);
            console.log(this.$refs.prodPic);
        }
    }
}
</script>

<style >
.tab-title-class {
    color: black;
}

.tab-title-class:hover {
    color: black;
}

.my_custom_multiple_select {
    border-style: groove;
    margin-top: 2px;
    height: 38px;
}
</style>