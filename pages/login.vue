<template>
  <div class="min-h-screen bg-white-c flex justify-center items-center">
    <Motion as="form" class="w-96" @submit.prevent="loginFunc">
      <div>
        <label for="username" class="text-xl">نام کاربری</label>
        <input
          type="text"
          class="w-full mt-2"
          id="username"
          v-model="username"
        />
      </div>
      <button class="btn-c w-full mt-4">ورود به حساب</button>
    </Motion>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

definePageMeta({
  middleware: 'check-auth',
  layout: false
})

let username = ref('')

let toast = useToast()

let { user } = userAuth()

function loginFunc () {
  if (!username.value) toast.error('لطفا نام کاربری خود را وارد کنید')
  else {
    localStorage.setItem('user', username.value)
    user.value = username.value
    toast.success('به برنامه ی ترموتسکز خوش آمدید!')
    return navigateTo('/')
  }
}
</script>
