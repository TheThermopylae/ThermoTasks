import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin(nuxtApp => {
  const options = {
    position: 'top-right',
    timeout: 5000,
    maxToasts: 5,
    transition: 'Vue-Toastification__slideBlurred'
  }
  nuxtApp.vueApp.use(Toast, options)
})
