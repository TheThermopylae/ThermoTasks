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
        <h2>افزودن ویدیو</h2>
      </div>
      <form @submit.prevent="addVideoFunc">
        <div class="grid grid-cols-2 gap-3 mt-2">
          <div>
            <label for="title" class="req">عنوان</label>
            <input
              type="text"
              id="title"
              class="w-full set-ring mt-2"
              v-model="data.title"
            />
          </div>
          <div>
            <label for="description">توضیحات(اختیاری)</label>
            <input
              type="text"
              id="description"
              class="w-full set-ring mt-2"
              v-model="data.description"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5 mt-2">
          <div>
            <label for="priority">اولویت</label>
            <select
              v-model="data.priority"
              id="priority"
              class="w-full set-ring p-2 mt-2 border rounded-lg cursor-pointer"
            >
              <option value="کم">کم</option>
              <option value="متوسط">متوسط</option>
              <option value="زیاد">زیاد</option>
            </select>
          </div>
          <div>
            <label for="video-edit-input">ویدیو</label>
            <input
              type="file"
              class="file-input file-input-ghost w-full border border-yellow-500 outline-none mt-2 h-10 p-0"
              @change="handleFileUpload"
              accept="video/*"
              id="video-edit-input"
            />
          </div>
        </div>

        <button class="btn-c w-full mt-4 h-12" v-if="!loading">
          افزودن ویدیو
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
import axios from 'axios'

let { user } = userAuth()

let { today } = useDate()

const toast = useToast()

let loading = ref(false)

let data = reactive({
  title: '',
  description: '',
  date: today,
  for: user.value,
  priority: 'متوسط'
})

let selectedFile = ref(null)
let videoUrl = ref(null)

let emit = defineEmits(['uploadedVideo', 'closeModal'])

function handleFileUpload (event) {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    videoUrl.value = URL.createObjectURL(file)
  }
}

async function addVideoFunc () {
  if (!data.title) {
    toast.warning('لطفا عنوان ویدیو را وارد کنید')
    return
  } else if (!selectedFile.value) {
    toast.warning('یک ویدیو را باید انتخاب کنید')
    return
  }

  loading.value = true

  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('date', data.date)
  formData.append('for', data.for)
  formData.append('priority', data.priority)
  formData.append('file', selectedFile.value)

  try {
    let data = await axios.post('/api/video/uploadVideo', formData, {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        toast.info(`در حال آپلود: ${percentCompleted}%`)
      }
    })

    if (data.type === 'error') {
      toast.error(data.data.message)
      return
    }

    toast.success(data.data.message)
    emit('uploadedVideo')
    emit('closeModal')
  } catch (error) {
    toast.error('ویدیو به دلیل حجم زیاد ذخیره نشد')
  } finally {
    loading.value = false
  }
}
</script>
