<template>
  <div style="background-color: #d2c9ff;">
    <header class="bg-dark p-3 text-bg-dark">
      <div class="container">
        <div class="d-flex justify-content-between">
          <h2>
            <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-black text-decoration-none">
              Raime Shop
            </a>
          </h2>
          <!-- <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
            <li><a href="#" class="nav-link px-2 text-secondary">Features</a></li>
            <li><a href="#" class="nav-link px-2 text-secondary">Pricing</a></li>
            <li><a href="#" class="nav-link px-2 text-secondary">FAQs</a></li>
            <li><a href="#" class="nav-link px-2 text-secondary">About</a></li>
          </ul> -->
          <div class="d-flex justify-content-center align-items-center col-7">
            <b-form-input placeholder="Search item..."></b-form-input>
            <button type="button" class="btn btn-warning">Search</button>
          </div>

          <div class="d-flex align-items-center">
            <div class="d-flex justify-content-center align-items-center" v-if="!authenticated()">
              <button @click="login()" type="button" class="btn btn-outline-light me-2">Login</button>
            </div>
            <div v-if="authenticated()">
              <b-dropdown id="dropdown-offset" offset="25" class="m-2">
                <template #button-content>
                  <b-avatar></b-avatar>
                  Profile
                </template>
                <b-dropdown-item href="#">Orders history</b-dropdown-item>
                <b-dropdown-item href="#">Wishlist</b-dropdown-item>
                <b-dropdown-item href="#">My review</b-dropdown-item>
                <b-dropdown-item href="#">Logout</b-dropdown-item>
              </b-dropdown>
            </div>

            <div class="ml-5 position-relative">
              <a href="/cart">
                <img src="https://img.icons8.com/material-outlined/38/000000/shopping-cart--v2.png" />
              </a>
              <span v-if="cart !== null"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                {{ cart.length }}
              </span>
            </div>
            <div class="ml-4">
              <a href="" @click="redirectToWishList($event)">
                <img src="https://img.icons8.com/material-outlined/38/000000/filled-like.png" />
              </a>
              <span v-if="true"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                {{ wishItemsCount }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="">
      <div class="row">
        <div class="col-1 ml-3 mt-5">
          <h2>
            <a href=""  class="badge badge-light">
              ALL
            </a>
          </h2>
          <div v-for="c in categories">
            <h2>
              <a class="badge badge-light" @click="filterProductsByCategory($event, c.categoryId)" href="">
                {{ c.name }}
              </a>
            </h2>
          </div>
        </div>

        <!-- <button @click="logout()">logout</button>
      <button @click="callAccount()">call secret</button>
      <button @click="refresh()">refresh token</button>
      <button @click="login()">login</button> -->


        <div class="col-10 mt-5 d-flex justify-content-center">
          <b-card-group>
            <div v-for="i in 3">
              <b-row v-for="p in products" :key="`item__${p.name}__${p.productId}`">
                <nuxt-link :to="`/product/${p.productId}`">
                  <b-col class="ml-1" @click="redirectTo(p.productId)">
                    <b-card :title="`${p.name}`" :img-src="`https://localhost:5001/api/files/${p.image}`"
                      img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                      <b-card-text class="text-center text-muted" style="max-width: 20rem;">
                        <h5>
                          $ {{ p.price }} </h5>
                      </b-card-text>

                      <!-- <b-button href="#" variant="primary">Add To Cart</b-button> -->
                    </b-card>
                  </b-col>
                </nuxt-link>
              </b-row>
            </div>
          </b-card-group>
        </div>
      </div>

      <!-- <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div> -->

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Oidc, { UserManager, WebStorageStateStore } from 'oidc-client'

export default {
  name: 'IndexPage',
  computed: {},
  data: () => ({
    wishItemsCount: 0,
    categories: [],
    products: [],
    product: {
      productId: 0,
      name: '',
      description: '',
      price: 0,
      image: '',
    },
    showForm: false,
    showWarnFlag: false,
    productIdToRemove: 0,
    showBtnCreateProductFlag: false,

    isModerator: false,
    cart: null,
    userManager: null,
    ...mapGetters('auth', ['authenticated'])
  }),

  beforeMount() {
    this.$store.dispatch('clientInit')
  },
  created() {
    if (!process.server)
      console.log("authenticated: ", this.authenticated())

    // if (!process.server) {
    //   this.$authPlugin.getUser().then(user => {
    //     this.$axios.setToken(`Bearer ${user.access_token}`);
    //     console.log("user: ", user)
    //   }).catch(er => console.log("getUser error: ", er))
    // }
    // this logic put in client-init.js plugin
    // if (!process.server) {
    //   this.userManager = userMgr

    //   this.userManager.getUser().then(user => {
    //     console.log("user from storage: ", user)
    //     this.$axios.setToken(`Bearer ${user.access_token}`)
    //     if (user.profile.role === "Mod") {
    //       this.isModerator = true
    //     }
    //     else
    //       this.isModerator = false;
    //   })

    //   // console.log(this.$route.query)
    //   // const {code, scope, session_state, state } = this.$route.query;

    //   // if(code && scope && session_state && state) {
    //   //   this.userManager.signinRedirectCallback()
    //   //     .then(user => {
    //   //       console.log(user)
    //   //       this.$axios.setToken(`Bearer ${user.access_token}`)
    //   //       this.$router.push('/')
    //   //     })
    //   // }
    // }
    if (!process.server) {
      var wishItemsFromLocalStore = localStorage.getItem('wish-list')
      if (wishItemsFromLocalStore !== null) {
        this.wishItemsCount = parseInt(JSON.parse(wishItemsFromLocalStore).length)
      }
      this.cart = JSON.parse(localStorage.getItem('cart'))

      // this.$auth.getUser().then(user => {
      //   console.log(user);
      // })
    }

    this.$axios.get('api/categories').then(res => {
      this.categories = res.data
    })
    this.$axios.$get("/api/products")
      .then((data) => {
        this.products = data
        console.log("products: ", this.products)
      })
  },
  methods: {
    redirectToWishList(e) {
      e.preventDefault();
      var profileSession = localStorage.getItem('user-profile-session')
      if (profileSession === null) {
        localStorage.setItem('user-profile-session', JSON.stringify({ mode: 'WISH_LIST' }))
      } else {

      }
      this.$router.push('/profile')
    },
    callAccount() {
      this.$axios.get('/secret').then(res => {
        console.log(res);
      })
        .catch(er => {

          console.log(er)
        })
    },
    filterProductsByCategory(e, id) {
      e.preventDefault();

      this.$axios.get('api/products/filtered-by-category/' + id).then(res => {
        this.products = res.data;
      })
    },
    redirectTo(id) {
      this.$router.push(`/product/${productId}`)
    },
    redirectToModPanel() {
      this.$router.push('/moderationPanel')
    },
    callApi(url) {
      this.$axios.$get('https://localhost:5001/' + url)
        .then(res => console.log(res))
        .catch(er => {
          if (er.response.status === 401) {
            this.refresh().then(res => {
              console.log(res);
              this.$axios.$get('https://localhost:44322/' + url)
                .then(res => console.log(res))
                .catch(er => console.log('axios error: ', er))
            })
          }
          console.log(er);
        })
    },
    refresh() {
      var app = this;
      return this.$authPlugin.signinSilent()
        .then(function (user) {
          console.log(app);
          app.$axios.setToken(`Bearer ${user.access_token}`)
          console.log("Token refreshed", user);
        }).catch(function (error) {
          console.log("Something went wrong", error);
        });
    },
    logout() {
      this.$authPlugin.signoutRedirect();
    },
    login() {
      return this.$authPlugin.signinRedirect().then(res => {
        console.log(res);
      })
        .catch(error => {
          console.log("in function login error: ", error);
        });
    },
    // getCurrentUser() {
    //   this.$auth.getUser().then(user => {
    //     console.log("user: ", user)
    //
    //     if (user) {
    //       this.$axios.defaults.headers.common["Authorization"] = "Bearer " + user.access_token
    //     }
    //   })
    // },
  }
}
</script>

<style></style>
