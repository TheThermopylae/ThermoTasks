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
        <h2>حذف دسته بندی</h2>
      </div>
      <p class="mt-2 mb-4">آیا میخواهید این دسته بندی را حذف کنید؟</p>
      <div class="grid grid-cols-2 gap-3">
        <button
          @click="removeCategory"
          v-if="!loading"
          class="w-full bg-green-500 rounded-lg text-white p-3 hover:opacity-90 transition h-12 flex items-center justify-center"
        >
          بله
        </button>
        <button
          v-else
          class="w-full bg-green-500 rounded-lg text-white p-3 hover:opacity-90 transition h-12 flex items-center justify-center"
        >
          <LoadingSpinner class="w-5"></LoadingSpinner>
        </button>
        <button
          @click="$emit('closeModal')"
          class="w-full bg-red-500 rounded-lg text-white p-3 hover:opacity-90 transition h-12 flex items-center justify-center"
        >
          خیر
        </button>
      </div>
    </div>
    <div @click="$emit('closeModal')" id="blureffect"></div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let props = defineProps(['category'])
let loading = ref(false)

let toast = useToast()

let emit = defineEmits(['closeModal', 'refreshData'])

async function removeCategory () {
  loading.value = true

  let data = await $fetch('/api/category/deleteCategory', {
    method: 'DELETE',
    query: { id: props.category.id }
  })

  loading.value = false
  toast.success('کتگوری شما با موفقیت حذف شد')
  emit('closeModal')
  emit('refreshData')
}
</script>
