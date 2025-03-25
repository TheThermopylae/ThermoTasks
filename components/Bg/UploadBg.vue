<template>
  <li class="flex gap-3">
    <button
      class="border border-yellow-500 px-4 rounded-lg hover:bg-yellow-500 hover:text-white transition-all w-20"
      @click="removeBgFromBody"
    >
      حذف
    </button>
    <input
      type="file"
      class="file-input file-input-ghost w-full max-w-xs border border-yellow-500 outline-none"
      @change="handleFileUpload"
      accept="image/*"
    />
    <button
      v-if="!loading"
      class="border border-yellow-500 px-4 rounded-lg hover:bg-yellow-500 hover:text-white transition-all w-20"
      @click="uploadFile"
    >
      آپلود
    </button>
    <button
      v-else
      class="border border-yellow-500 px-4 rounded-lg hover:bg-yellow-500 hover:text-white transition-all w-20"
    >
      <LoadingSpinner></LoadingSpinner>
    </button>
  </li>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let toast = useToast()

let loading = ref(false)

let selectedFile = ref(null)
let audioUrl = ref(null)

let emit = defineEmits(['uploadedImage'])

function handleFileUpload (event) {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    audioUrl.value = URL.createObjectURL(file)
  }
}

async function uploadFile () {
  if (!selectedFile.value) {
    toast.warning('یک تصویر را باید انتخاب کنید')
    return
  }

  loading.value = true

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    let data = await $fetch('/api/image/uploadBg', {
      method: 'POST',
      body: formData
    })

    if (data.type === 'error') {
      toast.error(data.message)
      return
    }

    toast.success(data.message)
    emit('uploadedImage')
  } catch (error) {
    console.error('مشکل در آپلود فایل:', error)
  } finally {
    loading.value = false
  }
}

function removeBgFromBody () {
  localStorage.removeItem('bg')
  document.body.removeAttribute('style')
}
</script>
