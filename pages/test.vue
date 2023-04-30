<template>
  <div>
    <div>
      {{ product }}
    </div>
    <div v-if="product !== null">
      <product-item-swiper :images="productPictures.sort(y => y.orderDisplay).map(x => x.fileName)"></product-item-swiper>
    </div>
    <h1>Multimedia</h1>
    <div v-if="product !== null">
      <div v-for="pic in productPictures" :key="`${pic.id}--${pic.fileName}`">
        <a href="#" @click="show($event)" >
          <img :src="`https://localhost:5001/api/files/${pic.fileName}`" alt="" width="300" height="300">
          Title - {{ pic.fileName.split('.')[0] }} ==============
          DisplayOrder - {{ pic.orderDisplay }}
        </a>
        <button>Delete</button>
        <div v-if="showEditForm">
          edit form
          <label for="">Display Order</label>
          <input v-model="pic.orderDisplay" type="number">
          <button @click="submitToServer(pic)">Update</button>  
          <button @click="showEditForm=false">Cancel</button>  
        </div>
      </div>
    </div>
    <!--     
    <b-table :items="items" :fields="fields" bordered>
      <template #cell(image)="data">
        <img :src="`https://localhost:5001/api/files/D.O.C.-FULL ZIP PUFFER JKT BL.jpeg`" width="100px" height="100px" alt="">
      </template>
    </b-table> -->
  </div>
</template>

<script>
import ProductItemSwiper from '../components/product-item-swiper'

export default {

  components: { ProductItemSwiper },
  created() {
    if (!process.server) {
      this.$axios.get("/api/products/10000").then(result => {
        this.product = result.data
        this.productPictures = this.product.images;
      });
    }
  },
  methods: {
    show(e) {
      console.log(e);
      e.preventDefault();
      this.showEditForm=true;
    },
    submitToServer(pic) {
      console.log(pic);

      // this.$axios.put("/api/products/changePictureMetadata")
    }
  },
  data() {
    return {
      newOrderDisplay: -1,
      productPictures: null,
      showEditForm: false,
      product: null,
      items: [
        { isActive: true, image: null, orderDisplay: 1, title: 'Pants' },
        { isActive: true, image: null, orderDisplay: 1, title: 'Pants' },
      ],
      fields: [
        { key: 'image', label: 'Picture' },
        { key: 'orderDisplay', label: 'Display Order' },
        { key: 'title', label: 'Title' },
      ],
      images: [
        "Img__GLOCKS__JEANS.png",
        "PIC_PREDATOR_VEST.png",
        "PIC_BELTS_DISTRESSED_JEANS_DARK.png",
        "666-TEE WH.jfif",
        "D.O.C.-FULL ZIP PUFFER JKT BL.jpeg",
        "W.O.F.-FULL ZIP HOODIE BL.jpeg",
        "XCROSS-T WASHED HOODIE DARK GR.jfif",
      ]
    }
  },
}
</script>

<style >
a:link { text-decoration: none; }

a:visited { text-decoration: none; }

a:hover { text-decoration: none; }

a:active { text-decoration: none; }
</style>
