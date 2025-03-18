<template>
  <div>
    <div
      class="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-11/12 bg-white z-10 md:w-2/3 lg:w-2/5 p-3 rounded-lg"
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
        <h2>افزودن تسک مشترک</h2>
      </div>
      <form @submit.prevent="addTaskFunc">
        <div class="mt-2">
          <div>
            <label for="task-id" class="req">آیدی تسک</label>
            <input
              type="text"
              id="task-id"
              class="w-full set-ring mt-2"
              v-model="taskId"
            />
          </div>
        </div>
        <button class="btn-c w-full mt-4 h-12" v-if="!loading">
          افزودن تسک
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

let taskId = ref('')

let loading = ref(false)

let toast = useToast()

let emit = defineEmits(['closeModal', 'refreshData'])

async function addTaskFunc () {
  if (!taskId.value) {
    toast.error('لطفا آیدی تسکتون رو وارد کنید')
    return
  }
  loading.value = true

  try {
    let findTasks = await $fetch('/api/getCommonTask', {
      query: { id: taskId.value }
    })

    console.log(findTasks)

    if (!findTasks) {
      toast.error('تسکی با این آیدی وجود ندارد!')
      return
    } else if (findTasks && findTasks.for.includes(user.value)) {
      toast.warning('شما این تسک را از قبل دارید!')
      return
    } else {
      findTasks.for.push(user.value)

      let data = await $fetch('/api/addCommonTask', {
        method: 'POST',
        body: findTasks
      })
    }

    emit('refreshData')
    toast.success('تسک مشترک شما با موفقیت اضافه شد')
    emit('closeModal')
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>
