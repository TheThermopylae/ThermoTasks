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
        <h2>ویرایش تسک ویدیویی</h2>
      </div>
      <form @submit.prevent="editTaskFunc">
        <div class="grid grid-cols-2 gap-3 mt-2">
          <div>
            <label for="title" class="req">عنوان</label>
            <input
              type="text"
              id="title"
              class="w-full set-ring mt-2"
              v-model="videoTaskTitle"
            />
          </div>
          <div>
            <label for="description">توضیحات(اختیاری)</label>
            <input
              type="text"
              id="description"
              class="w-full set-ring mt-2"
              v-model="videoTaskDescription"
            />
          </div>
          <div>
            <label for="priority">اولویت</label>
            <select
              v-model="videoTaskPriority"
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
          ویرایش تسک ویدیویی
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
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

let props = defineProps(['video'])
let emit = defineEmits(['closeModal', 'refreshData'])

let videoTaskTitle = ref(props.video?.title)
let videoTaskDescription = ref(props.video?.description)
let videoTaskPriority = ref(props.video?.priority)

let selectedFile = ref(null)
let videoUrl = ref(null)

let loading = ref(false)

let toast = useToast()

function handleFileUpload (event) {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    videoUrl.value = URL.createObjectURL(file)
  }
}

async function editTaskFunc () {
  if (!videoTaskTitle.value) {
    toast.error('لطفا یک عنوان و ویدیو برای تسکتون انتخاب کنید')
    return
  }

  const formData = new FormData()
  formData.append('title', videoTaskTitle.value)
  formData.append('description', videoTaskDescription.value)
  formData.append('date', props.video.date)
  formData.append('for', props.video.for)
  formData.append('priority', videoTaskPriority.value)
  formData.append('file', selectedFile.value)

  loading.value = true

  let data = await $fetch('/api/video/editVideo', {
    method: 'PUT',
    query: { id: props.video.id },
    body: formData
  })
  loading.value = false
  toast.success('تسک ویدیویی شما با موفقیت ویرایش شد')
  emit('closeModal')
  emit('refreshData')
}
</script>
