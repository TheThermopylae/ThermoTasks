<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
  <!-- <NotAllowed></NotAllowed> -->
</template>

<script setup>
useHead({
  title: 'ThermoTasks'
})

let showAddTaskModal = ref(false)
let showAddCommonTaskModal = ref(false)

function showModal () {
  showAddTaskModal.value = true
}

function showCommonModal () {
  showAddCommonTaskModal.value = true
}

provide('showAddTaskModal', showAddTaskModal)
provide('showAddCommonTaskModal', showAddCommonTaskModal)
provide('showModal', showModal)
provide('showCommonModal', showCommonModal)
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#blureffect {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  transition: 0.3s;
}
</style>