<template>
  <div
    class="fixed top-5 bg-gray-300 p-2 rounded-lg w-64 z-10 shadow transition-all duration-300"
  >
    <div>
      <h3 class="text-xl font-bold">درصد پیشرفت :</h3>
      <span> {{ props.progress }}</span>
    </div>
  </div>
</template>

<script setup>
let props = defineProps(['progress'])
</script>
