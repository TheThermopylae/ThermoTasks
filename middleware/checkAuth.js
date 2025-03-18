export default defineNuxtRouteMiddleware((to, from) => {
  if (!localStorage.getItem('user') && to.path !== '/login') {
    return navigateTo('/login')
  }
})