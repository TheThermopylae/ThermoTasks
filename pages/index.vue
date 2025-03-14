<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <TaskCard
        @refreshData="refresh"
        @deleteTask="showDeleteModalFunc(item)"
        @editTask="showEditModalFunc(item)"
        v-for="(item, index) in tasks"
        :key="item.id"
        :data="item"
        :index="index"
      ></TaskCard>
    </div>
    <Transition>
      <ModalsAddTaskModal
        @refreshData="refresh"
        v-if="showAddTaskModal"
        @closeModal="showAddTaskModal = false"
      ></ModalsAddTaskModal>
    </Transition>
    <Transition>
      <ModalsDeleteTaskModal
        @refreshData="refresh"
        :task="targetTask"
        @closeModal="showDeleteModal = false"
        v-if="showDeleteModal"
      ></ModalsDeleteTaskModal>
    </Transition>
    <Transition>
      <ModalsEditTaskModal
        v-if="showEditModal"
        :task="targetTask"
        @closeModal="showEditModal = false"
        @refreshData="refresh"
      ></ModalsEditTaskModal>
    </Transition>
  </div>
</template>

<script setup>
let route = useRoute()

let showAddTaskModal = inject('showAddTaskModal')
let { data: tasks, refresh } = await useAsyncData(() =>
  $fetch('/api/getTasks', {
    query: { title: route.query.title }
  })
)

let showDeleteModal = ref(false)
let showEditModal = ref(false)
let targetTask = ref(null)

async function showDeleteModalFunc (item) {
  targetTask.value = item
  showDeleteModal.value = true
}

async function showEditModalFunc (item) {
  targetTask.value = item
  showEditModal.value = true
}

watch(
  () => route.query,
  () => {
    refresh()
  },
  { deep: true }
)
</script>
