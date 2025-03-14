import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin(nuxtApp => {
  const options = {
    position: 'bottom-center',
    timeout: 5000,
    maxToasts: 5,
    transition: 'Vue-Toastification__fade',
    rtl : true
  }
  nuxtApp.vueApp.use(Toast, options)
})