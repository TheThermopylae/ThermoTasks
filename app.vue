<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
  <div>
    <TheDrawer></TheDrawer>
    <BgSelectBgDrawer></BgSelectBgDrawer>
  </div>
  <NotAllowed></NotAllowed>
</template>

<script setup>
useHead({
  title: 'ThermoTasks'
})

let bgPath = ref(null)

onMounted(() => {
  bgPath.value = localStorage.getItem('bg')
  if (bgPath.value)
    document.body.style.background = `url(${bgPath.value}) no-repeat center/cover`
})

let showAddTaskModal = ref(false)
let showAddCommonTaskModal = ref(false)
let showAddCategoryModal = ref(false)

let showAddVideoModal = ref(false)

function showModal () {
  showAddTaskModal.value = true
}

function showCommonModal () {
  showAddCommonTaskModal.value = true
}

function showCategoryModal () {
  showAddCategoryModal.value = true
}

function showVideoModal () {
  showAddVideoModal.value = true
}

provide('showAddTaskModal', showAddTaskModal)
provide('showAddCommonTaskModal', showAddCommonTaskModal)
provide('showModal', showModal)
provide('showCommonModal', showCommonModal)
provide('showAddVideoModal', showAddVideoModal)
provide('showVideoModal', showVideoModal)
provide('showAddCategoryModal', showAddCategoryModal)
provide('showCategoryModal', showCategoryModal)
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

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
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
  z-index: 15;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  transition: 0.3s;
}
</style>
