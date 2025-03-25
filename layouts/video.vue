<template>
  <div class="flex flex-col min-h-screen py-4 px-6">
    <HeaderTheHeaderVideo />
    <div class="flex-grow container mx-auto">
      <slot />
    </div>
    <TheDrawer></TheDrawer>
    <TasksLink></TasksLink>
  </div>
</template>
