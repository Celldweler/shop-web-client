import path from 'path'
import fs from 'fs'

export default {
  mode: 'universal',


  publicRuntimeConfig: {
    axios: {
      baseURL: 'https://localhost:5001', // https://localhost:44322
      https: true,
    },
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: "http://localhost:5000",
      https: false
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.relative(__dirname, 'server.key')),
      cert: fs.readFileSync(path.relative(__dirname, 'server.cert')),
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'shop-web-client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/auth-plugin.js', mode: 'client' },
    "~/plugins/axios"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    // '@nuxtjs/auth'
  ],
  // auth: {
  //   // Options
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
