<template>
  <div class="flex flex-col min-h-screen bg-white-c py-4 px-6">
    <TheHeader />
    <!-- <Motion
      class="flex-grow container mx-auto"
      as="div"
      :initial="{ y: 10, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{
        delay : .5
      }"
    > -->
    <div class="flex-grow container mx-auto">
      <slot />
    </div>
    <!-- </Motion> -->
  </div>
</template>
