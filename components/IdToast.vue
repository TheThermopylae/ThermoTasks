<template>
  <div
    class="fixed top-5 bg-gray-300 p-2 rounded-lg w-96 z-10 shadow transition-all duration-300 cursor-pointer"
    @click="copyFunc"
  >
    <div class="">
      <h3 class="text-xl font-bold inline-block ml-1">آیدی :</h3>
      <p class="inline-block">{{ props.data?.id }}</p>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

let props = defineProps(['data'])

let toast = useToast()

function copyFunc () {
  navigator.clipboard.writeText(props.data.id)

  toast.info('آیدی در کلیپ بورد شما کپی شد!')
}
</script>
