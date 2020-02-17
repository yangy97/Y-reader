import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import FastClick from 'fastclick'

FastClick.attach(document.body);
import HBlist from '@/comm/home-booklist.vue';
Vue.component('h-blist', HBlist);
import Blist from '@/comm/book-list.vue';
Vue.component('b-list', Blist);
import BlistD from '@/comm/booklist-detail.vue';
Vue.component('blist-d', BlistD);
// 导入mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
// 导入MUI
import 'mint-ui/lib/style.css';
import '@/assets/reset.css'
import MBottom from '@/components/Bottom/Bottom'
Vue.component('m-bottom', MBottom);


 //导入MUI
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'


Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
