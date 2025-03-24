<template>
  <div>
    <StatusToast
      :class="{ 'right-5': showStatusToast, '-right-64': !showStatusToast }"
      :data="targetTask"
    ></StatusToast>
    <div v-for="categoryItem in categories" class="mb-2">
      <h4 class="mb-2 text-xl font-semibold">{{ categoryItem.title }}</h4>
      <div class="grid grid-cols-3 gap-5" v-if="tasks.filter(
            task => task.category == categoryItem.title
          ).length > 0">
        <TaskCard
          @refreshData="refresh"
          @deleteTask="showDeleteModalFunc(item)"
          @editTask="showEditModalFunc(item)"
          @showStatusToastEmit="showStatusToastFunc(item)"
          @showIdToastEmit="showIdToastFunc(item)"
          v-for="(item, index) in tasks.filter(
            task => task.category == categoryItem.title
          )"
          :key="item.id"
          :data="item"
          :index="index"
        ></TaskCard>
      </div>
      <p v-else class="text-center text-2xl text-gray-600">تسکی پیدا نشد</p>
    </div>
    <IdToast
      :class="{ 'right-5': showIdToast, '-right-96': !showIdToast }"
      :data="targetTask"
    ></IdToast>
    <Transition>
      <ModalsAddTaskModal
        @refreshData="refresh"
        v-if="showAddTaskModal"
        @closeModal="showAddTaskModal = false"
      ></ModalsAddTaskModal>
    </Transition>
    <Transition>
      <ModalsAddCommonTaskModal
        @refreshData="refresh"
        v-if="showAddCommonTaskModal"
        @closeModal="showAddCommonTaskModal = false"
      ></ModalsAddCommonTaskModal>
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
    <Transition>
      <ModalsAddCategoryModal
        v-if="showAddCategoryModal"
        @closeModal="showAddCategoryModal = false"
      ></ModalsAddCategoryModal>
    </Transition>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'check-auth'
})

let { user } = userAuth()

let route = useRoute()

let showAddTaskModal = inject('showAddTaskModal')
let showAddCommonTaskModal = inject('showAddCommonTaskModal')
let showAddCategoryModal = inject('showAddCategoryModal')

let { data: tasks, refresh } = await useAsyncData(() =>
  $fetch('/api/getTasks', {
    query: { title: route.query.title, user: user.value },
    method: 'POST'
  })
)

let { data: categories, refresh: refreshCateogry } = await useAsyncData(() =>
  $fetch('/api/category/getCategory', {
    query: { title: route.query.title, user: user.value },
    method: 'POST'
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

let showStatusToast = ref(false)
let showIdToast = ref(false)

function showStatusToastFunc (item) {
  showStatusToast.value = true
  setTimeout(() => (showStatusToast.value = false), 5000)

  targetTask.value = item
}

function showIdToastFunc (item) {
  if (showIdToast.value) {
    showIdToast.value = false

    setTimeout(() => {
      showIdToast.value = true
      targetTask.value = item
    }, 500)
  } else {
    showIdToast.value = true
    setTimeout(() => (showIdToast.value = false), 5000)
    targetTask.value = item
  }
}
</script>
