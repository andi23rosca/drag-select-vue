import Vue from 'vue'
import DragSelect from './DragSelect.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(DragSelect),
}).$mount('#app')
