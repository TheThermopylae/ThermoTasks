<template>
  <div>
    <div
      class="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-11/12 bg-white z-20 md:w-2/3 lg:w-2/5 p-3 rounded-lg"
    >
      <div class="flex justify-between items-center">
        <svg
          @click="$emit('closeModal')"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6 cursor-pointer"
        >
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
        <h2>افزودن دسته بندی</h2>
      </div>
      <form @submit.prevent="addCateogryFunc">
        <div class="mt-2">
          <div>
            <label for="category-title">عنوان دسته</label>
            <input
              type="text"
              id="category-title"
              class="w-full set-ring mt-2"
              v-model="categoryTitle"
            />
          </div>
        </div>
        <button class="btn-c w-full mt-4 h-12" v-if="!loading">
          افزودن دسته
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 inline-block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <button class="btn-c w-full mt-4 h-12" v-else :disabled="loading">
          <LoadingSpinner></LoadingSpinner>
        </button>
      </form>
    </div>
    <div @click="$emit('closeModal')" id="blureffect"></div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
let { user } = userAuth()

let categoryTitle = ref('')

let loading = ref(false)

let toast = useToast()

let emit = defineEmits(['closeModal', 'refreshData'])

async function addCateogryFunc () {
  if (!categoryTitle.value) {
    toast.error('لطفا عنوان دسته بندی رو وارد کنید')
    return
  }
  loading.value = true

  try {
    let data = await $fetch('/api/category/addCategory', {
      method: 'POST',
      body: { title: categoryTitle.value },
      query: { user: user.value }
    })

    emit('refreshData')
    data.type == 'error'
      ? toast.error(data.message)
      : toast.success(data.message)
    emit('closeModal')
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>
