<template>
  <Motion
    class="mb-5 flex gap-2 text-xl flex-row-reverse items-center"
    :initial="{ y: 10, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
  >
    <span
      @click="$emit('changeSort', 'old')"
      class="cursor-pointer transition-all"
      :class="{ 'text-yellow-500': props.sort == 'old' }"
      >old</span
    >
    <span
      @click="$emit('changeSort', 'new')"
      class="cursor-pointer transition-all"
      :class="{ 'text-yellow-500': props.sort == 'new' }"
      >new</span
    >
    <span
      @click="$emit('changeSort', 'a-z')"
      class="cursor-pointer transition-all"
      :class="{ 'text-yellow-500': props.sort == 'a-z' }"
      >a-z</span
    >
    <span
      @click="$emit('changeSort', 'z-a')"
      class="cursor-pointer transition-all"
      :class="{ 'text-yellow-500': props.sort == 'z-a' }"
      >z-a</span
    >
  </Motion>
</template>

<script setup>
let props = defineProps(['sort'])
</script>
