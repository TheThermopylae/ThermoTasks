<template>
  <div class="flex flex-col min-h-screen py-4 px-6">
    <HeaderTheHeaderTask />
    <div class="flex-grow container mx-auto">
      <slot />
    </div>
    <VideosLink></VideosLink>
  </div>
</template>
