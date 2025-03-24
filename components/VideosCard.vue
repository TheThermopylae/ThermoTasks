<template>
  <Motion
    as="div"
    class="p-2 rounded-lg bg-white flex flex-col shadow border z-0"
    :class="{
      'border-red-500': props.data.priority == 'کم',
      'border-yellow-500': props.data.priority == 'متوسط',
      'border-green-500': props.data.priority == 'زیاد'
    }"
    :initial="{ y: 10, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{
      delay: 0.15 * props.index
    }"
  >
    <vue3-video-player :src="props.data.path"></vue3-video-player>
    <div class="flex justify-between items-end">
      <h4 class="mt-2 font-semibold">{{ props.data.title }}</h4>
      <span>{{ props.data.date }}</span>
    </div>
    <p class="my-3">توضیحات : {{ props.data.description }}</p>
    <div class="flex justify-between itemsend">
      <select
        v-model="videoTask"
        @change="changeStatus"
        :id="'video-task-' + props.data.id"
        class="border set-ring p-1 rounded-lg cursor-pointer"
        :class="{
          'text-yellow-500': videoTask === 'در جریان',
          'text-green-500': videoTask === 'انجام شده'
        }"
      >
        <option value="در جریان" class="text-yellow-500">در جریان</option>
        <option value="انجام شده" class="text-green-500">انجام شده</option>
      </select>
      <div class="flex flex-row-reverse gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 cursor-pointer hover:text-red-500 transition-all"
          @click="$emit('showDeleteModal')"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 cursor-pointer hover:text-gray-500 transition-all"
          @click="$emit('showEditModal')"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </div>
    </div>
  </Motion>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let props = defineProps(['data', 'index'])

let videoTask = ref(props.data.status)

let toast = useToast()

async function changeStatus () {
  let data = await $fetch('/api/video/editVideo', {
    method: 'PUT',
    body: { ...props.data, status: videoTask.value },
    query: { id: props.data.id }
  })

  toast.success('وضعیت تسک ویدیویی شما با موفقیت بروز شد!')
}
</script>
