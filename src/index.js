import Vue from 'vue'
import App from './app.vue'

import './assets/styles/text.css'
import './assets/styles/text.styl'
import './assets/images/er.png'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: h => h(App)
}).$mount(root)