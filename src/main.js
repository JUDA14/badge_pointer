import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted';

Vue.use(Toasted)
Vue.use(BootstrapVue)

Vue.use(VModal)
Vue.use(require('vue-shortkey'))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
