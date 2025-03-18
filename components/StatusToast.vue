<template>
  <div
    class="fixed top-5 bg-gray-300 p-2 rounded-lg w-64 z-10 shadow transition-all duration-300"
  >
    <div>
      <h3 class="text-xl font-bold">افراد مشترک:</h3>
      <span
        v-for="(item, index) in props.data?.for"
        :key="index"
        class="after:content-[','] last:after:content-[''] mr-1 last:mr-0"
        >{{ item }}</span
      >
    </div>
    <div>
      <h3 v-if="props.data?.done.length > 0" class="text-xl font-bold">
        انجام شده توسط :
      </h3>
      <span
        v-for="(item, index) in props.data?.done"
        :key="index"
        class="after:content-[','] last:after:content-[''] mr-1 last:mr-0"
        >{{ item }}</span
      >
    </div>
  </div>
</template>

<script setup>
let props = defineProps(['data'])
</script>
