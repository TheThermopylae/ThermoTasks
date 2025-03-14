<template>
  <Motion
    as="header"
    class="flex justify-between items-center container m-auto mb-10"
    :initial="{ y: -200 }"
    :animate="{ y: 0 }"
  >
    <h1 class="text-3xl">
      Thermo<span class="text-yellow-500 font-bold">Tasks</span>
    </h1>
    <button class="btn-c" @click="showModal">
      افزودن تسک
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-5 inline-block"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  </Motion>
</template>

<script setup>
let showModal = inject('showModal')
</script>
