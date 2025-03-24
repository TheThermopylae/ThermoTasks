<template>
  <div>
    <div class="grid grid-cols-3 gap-5">
      <VideosCard
        v-for="(item, index) in videos"
        :key="item.id"
        :data="item"
        :index="index"
        @showDeleteModal="showDeleteModalFunc(item)"
        @showEditModal="showEditModalFunc(item)"
      ></VideosCard>
    </div>
    <Transition>
      <ModalsAddVideoModal
        @uploadedVideo="refresh"
        v-if="showAddVideoModal"
        @closeModal="showAddVideoModal = false"
      ></ModalsAddVideoModal>
    </Transition>
    <Transition>
      <ModalsEditVideoTaskModal
        @refreshData="refresh"
        v-if="showEditVideoModal"
        @closeModal="showEditVideoModal = false"
        :video="targetVideo"
      ></ModalsEditVideoTaskModal>
    </Transition>
    <Transition>
      <ModalsDeleteVideoModal
        @refreshData="refresh"
        v-if="showDeleteVideoModal"
        @closeModal="showDeleteVideoModal = false"
        :video="targetVideo"
      ></ModalsDeleteVideoModal>
    </Transition>
  </div>
</template>

<script setup>
let { user } = userAuth()

let { data: videos, refresh } = await useAsyncData(() =>
  $fetch('/api/video/getVidoes', {
    query: { user: user.value }
  })
)

definePageMeta({
  layout: 'video'
})

let showAddVideoModal = inject('showAddVideoModal')

let showDeleteVideoModal = ref(false)
let showEditVideoModal = ref(false)
let targetVideo = ref(null)

function showDeleteModalFunc (item) {
  showDeleteVideoModal.value = true
  targetVideo.value = item
}

function showEditModalFunc (item) {
  showEditVideoModal.value = true
  targetVideo.value = item
}
</script>
