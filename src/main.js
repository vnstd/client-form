import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate/src";

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
