import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.css'
import clickOutside from './directive/clickOutside'

const app = createApp(App)

app.directive('click-outside', clickOutside)
app.use(router)
app.use(store)
app.mount('#app')