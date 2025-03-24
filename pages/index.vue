<template>
  <div>
    <SortSection
      @changeSort="setSort"
      v-if="!route.query.title"
      :sort="sortType"
    ></SortSection>
    <StatusToast
      :class="{ 'right-5': showStatusToast, '-right-64': !showStatusToast }"
      :data="targetTask"
    ></StatusToast>
    <Motion
      as="div"
      v-for="(categoryItem, index) in categories"
      class="mb-2 border-b pb-3"
      :initial="{ y: 10, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{
        delay: 0.2 * index
      }"
    >
      <div class="flex justify-between items-center">
        <h4 class="mb-2 text-xl font-semibold">{{ categoryItem.title }}</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 cursor-pointer hover:text-red-500 transition-all"
          @click="showDeleteCategoryModal(categoryItem)"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
      <div
        class="grid grid-cols-3 gap-5"
        v-if="
          tasks.filter(task => task.category == categoryItem.title).length > 0
        "
      >
        <TaskCard
          @refreshCategory="refreshCateogry"
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
    </Motion>
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
        @refreshCategory="refreshCateogry"
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
        @refreshData="refreshCateogry"
      ></ModalsAddCategoryModal>
    </Transition>
    <Transition>
      <ModalsDeleteCategoryModal
        @refreshData="refreshCateogry"
        :category="targetCategory"
        @closeModal="showDeleteCategory = false"
        v-if="showDeleteCategory"
      ></ModalsDeleteCategoryModal>
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

let sortType = ref('new')

const setSort = type => (sortType.value = type)

let { data: tasks, refresh } = await useAsyncData(() =>
  $fetch('/api/getTasks', {
    query: { title: route.query.title, user: user.value, sort: sortType.value },
    method: 'POST'
  })
)

let { data: categories, refresh: refreshCateogry } = await useAsyncData(() =>
  $fetch('/api/category/getCategory', {
    query: { user: user.value },
    method: 'POST'
  })
)

let showDeleteModal = ref(false)
let showEditModal = ref(false)

let targetTask = ref(null)
let targetCategory = ref(null)

let showDeleteCategory = ref(false)

async function showDeleteModalFunc (item) {
  targetTask.value = item
  showDeleteModal.value = true
}

async function showEditModalFunc (item) {
  targetTask.value = item
  showEditModal.value = true
}

function showDeleteCategoryModal (item) {
  targetCategory.value = item
  showDeleteCategory.value = true
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

watch(sortType, () => {
  refresh()
})
</script>
