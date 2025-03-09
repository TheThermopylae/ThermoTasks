<template>
  <div class="flex flex-col min-h-screen bg-white-c">
    <TheHeader />
    <div class="flex-grow container mx-auto mt-24">
      <slot />
    </div>
    <TheFooter></TheFooter>
  </div>
</template>