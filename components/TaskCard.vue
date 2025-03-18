<template>
  <Motion
    class="flex justify-between itemsend bg-white p-2 rounded-lg shadow border relative"
    :class="{
      'border-red-500': props.data.priority === 'کم',
      'border-yellow-500': props.data.priority === 'متوسط',
      'border-green-500': props.data.priority === 'زیاد'
    }"
    as="div"
    :initial="{ y: 10, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{
      delay: 0.15 * props.index
    }"
  >
    <div class="flex flex-col justify-between">
      <h4
        class="text-lg font-semibold"
        :class="{
          'text-green-500': props.data.for.length == props.data.done.length
        }"
      >
        {{ props.data.title }}
      </h4>
      <p>توضیحات : {{ props.data.description }}</p>
      <select
        :id="'task-status-' + props.data.id"
        class="border mt-2 p-1 rounded-lg set-ring cursor-pointer"
        :class="{
          'text-yellow-500': taskStatus == 'در جریان',
          'text-green-500': taskStatus == 'انجام شده'
        }"
        v-model="taskStatus"
        @change="changeStatus"
      >
        <option class="text-yellow-500" value="در جریان">در جریان</option>
        <option class="text-green-500" value="انجام شده">انجام شده</option>
      </select>
    </div>
    <div class="flex place-items-end">
      <div v-if="props.data.for[0] == user" class="flex gap-2">
        <svg
          v-if="props.data.for.length > 1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 cursor-pointer hover:text-blue-500 transition"
          @click="$emit('showToastEmit')"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 cursor-pointer hover:text-gray-500 transition"
          @click="$emit('editTask')"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
        <svg
          @click="$emit('deleteTask')"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 cursor-pointer hover:text-red-500 transition"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 2048 2048"
        class="cursor-pointer hover:text-red-500 transition-all"
        @click="leaveTask"
      >
        <path
          fill="currentColor"
          d="M2048 1536v128h-646l211 211l-90 90l-365-365l365-365l90 90l-211 211zm-756-433l-88 93q-89-84-201-128t-235-44q-88 0-170 23t-153 64t-129 100t-100 130t-65 153t-23 170H0q0-117 35-229t101-207t157-169t203-113q-56-36-100-83t-76-103t-47-118t-17-130q0-106 40-199t109-163T568 40T768 0t199 40t163 109t110 163t40 200q0 137-63 248t-177 186q70 26 133 66t119 91M384 512q0 80 30 149t82 122t122 83t150 30q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149"
        />
      </svg>
    </div>
    <svg
      v-if="props.data.for.length > 1"
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 256 256"
      class="absolute left-2"
      :class="{ 'text-green-500': props.data.for[0] == user }"
    >
      <path
        fill="currentColor"
        d="M27.2 126.4a8 8 0 0 0 11.2-1.6a52 52 0 0 1 83.2 0a8 8 0 0 0 11.2 1.59a7.7 7.7 0 0 0 1.59-1.59a52 52 0 0 1 83.2 0a8 8 0 0 0 12.8-9.61A67.85 67.85 0 0 0 203 93.51a40 40 0 1 0-53.94 0a67.3 67.3 0 0 0-21 14.31a67.3 67.3 0 0 0-21-14.31a40 40 0 1 0-53.94 0A67.9 67.9 0 0 0 25.6 115.2a8 8 0 0 0 1.6 11.2M176 40a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-96 0a24 24 0 1 1-24 24a24 24 0 0 1 24-24m123 157.51a40 40 0 1 0-53.94 0a67.3 67.3 0 0 0-21 14.31a67.3 67.3 0 0 0-21-14.31a40 40 0 1 0-53.94 0A67.9 67.9 0 0 0 25.6 219.2a8 8 0 1 0 12.8 9.6a52 52 0 0 1 83.2 0a8 8 0 0 0 11.2 1.59a7.7 7.7 0 0 0 1.59-1.59a52 52 0 0 1 83.2 0a8 8 0 0 0 12.8-9.61A67.85 67.85 0 0 0 203 197.51M80 144a24 24 0 1 1-24 24a24 24 0 0 1 24-24m96 0a24 24 0 1 1-24 24a24 24 0 0 1 24-24"
      />
    </svg>
  </Motion>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let { user } = userAuth()

let props = defineProps(['data', 'index'])
let emit = defineEmits([
  'refreshData',
  'editTask',
  'deleteTask',
  'showToastEmit'
])

let taskStatus = ref(
  props.data.done.some(userItem => userItem == user.value)
    ? 'انجام شده'
    : 'در جریان'
)

let toast = useToast()

async function sendData (text) {
  let data = await $fetch('/api/editTask', {
    method: 'PUT',
    body: props.data,
    query: { id: props.data.id }
  })

  toast.success(text)
  emit('refreshData')
}

async function changeStatus () {
  console.log(props.data)

  if (taskStatus.value == 'انجام شده') props.data.done.push(user.value)
  else if (taskStatus.value == 'در جریان') {
    let findUserIndex = props.data.done.findIndex(
      userItem => userItem == user.value
    )
    props.data.done.splice(findUserIndex, 1)
  }

  sendData('وضعیت تسک شما بروز شد')
}

async function leaveTask () {
  let findUserForIndex = props.data.for.findIndex(
    userItem => userItem == user.value
  )

  let findUserDoneIndex = props.data.done.findIndex(
    userItem => userItem == user.value
  )
  props.data.for.splice(findUserForIndex, 1)
  props.data.done.splice(findUserDoneIndex, 1)

  sendData('شما از انجام این تسک مشترک منصرف شدید!')
}
</script>
