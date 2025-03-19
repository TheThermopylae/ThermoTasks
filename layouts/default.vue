<template>
  <div class="flex flex-col min-h-screen bg-white-c py-4 px-6">
    <TheHeader />
    <div class="flex-grow container mx-auto">
      <slot />
    </div>
    <TheDrawer></TheDrawer>
    <VideosLink></VideosLink>
  </div>
</template>
