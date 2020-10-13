import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCduIVc6w8-jxWEEhjAaWt9cs5ohB8ZDiw",
  authDomain: "auth-vrouter.firebaseapp.com",
  databaseURL: "https://auth-vrouter.firebaseio.com",
  projectId: "auth-vrouter",
  storageBucket: "auth-vrouter.appspot.com",
  messagingSenderId: "1023828134464",
  appId: "1:1023828134464:web:9e01780143f6e87ef4ada5"
};
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
