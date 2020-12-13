import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue"

import RecordAPIService from '@/services/RecordService'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$record_api = RecordAPIService

new Vue({
  render: h => h(App),
}).$mount('#app')
