import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin(nuxtApp => {
  const options = {
    position: 'bottom-right',
    timeout: 5000,
    maxToasts: 5,
    transition: 'fade',
  }
  nuxtApp.vueApp.use(Toast, options)
})