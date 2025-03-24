<template>
  <Motion
    class="drawer"
    as="div"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{
      delay: 0.5
    }"
  >
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <label
        for="my-drawer"
        class="drawer-button fixed bottom-3 right-5 bg-yellow-400 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-125 transition-all duration-300"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
          />
        </svg>
      </label>
    </div>
    <div class="drawer-side z-50">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay z-0"
      ></label>
      <ul class="bg-base-200 text-base-content min-h-full w-96 p-4">
        <!-- Sidebar content here -->
        <li class="mb-4 relative">
          <input
            type="text"
            class="w-full"
            placeholder="جست و جوی موسیقی"
            v-model="searchValue"
            @keyup.enter="refresh"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
            @click="refresh"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </li>
        <li class="flex gap-3 mb-5">
          <MusicUploadMusic @uploadedMusic="refresh"></MusicUploadMusic>
        </li>
        <li
          v-if="musics.length > 0"
          class="overflow-auto"
          style="height: calc(65vh - 80px)"
        >
          <MusicCard
            v-for="item in musics"
            :key="item.id"
            :music="item"
            @setSrcEmit="setSrc(item)"
            @deleteMusic="deleteMusicFunc(item)"
          ></MusicCard>
        </li>
        <li v-else class="text-center text-xl text-gray-800">
          موسیقی یافت نشد!
        </li>
        <li
          class="absolute bottom-2 w-full left-0 bg-white-c"
          v-if="musicData.src"
        >
          <div class="flex items-center gap-2">
            <h4>حالت :</h4>
            <div class="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 512 512"
                class="cursor-pointer"
                :class="{ 'text-blue-500': musicModes == 'loop' }"
                @click="musicModes = 'loop'"
              >
                <path
                  fill="currentColor"
                  d="M464 210.511V264a112.127 112.127 0 0 1-112 112H78.627l44.686-44.687l-22.626-22.626L56 353.373l-4.415 4.414l-33.566 33.567l74.022 83.276l23.918-21.26L75.63 408H352c79.4 0 144-64.6 144-144v-85.489Z"
                />
                <path
                  fill="currentColor"
                  d="M48 256a112.127 112.127 0 0 1 112-112h273.373l-44.686 44.687l22.626 22.626L456 166.627l4.117-4.116l33.864-33.865l-74.022-83.276l-23.918 21.26L436.37 112H160c-79.4 0-144 64.6-144 144v85.787l32-32Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 256 256"
                class="cursor-pointer"
                :class="{ 'text-blue-500': musicModes == 'repeat' }"
                @click="musicModes = 'repeat'"
              >
                <path
                  fill="currentColor"
                  d="M24 128a72.08 72.08 0 0 1 72-72h96V40a8 8 0 0 1 13.66-5.66l24 24a8 8 0 0 1 0 11.32l-24 24A8 8 0 0 1 192 88V72H96a56.06 56.06 0 0 0-56 56a8 8 0 0 1-16 0m200-8a8 8 0 0 0-8 8a56.06 56.06 0 0 1-56 56H64v-16a8 8 0 0 0-13.66-5.66l-24 24a8 8 0 0 0 0 11.32l24 24A8 8 0 0 0 64 216v-16h96a72.08 72.08 0 0 0 72-72a8 8 0 0 0-8-8m-88 40a8 8 0 0 0 8-8v-48a8 8 0 0 0-11.58-7.16l-16 8a8 8 0 1 0 7.16 14.31l4.42-2.21V152a8 8 0 0 0 8 8"
                />
              </svg>
              <span
                class="cursor-pointer"
                :class="{ 'text-blue-500': musicModes == null }"
                @click="musicModes = null"
                >بدون حالت</span
              >
            </div>
          </div>
          <AudioPlayer
            ref="audioPlayer"
            :option="{
              src: musicData.src,
              title:
                musicData.title.length > 14
                  ? '...' + musicData.title.slice(0, 14)
                  : musicData.title
            }"
            @loadedmetadata="playMusicFunc"
            @ended="endedFunc"
          />
        </li>
      </ul>
    </div>
  </Motion>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import AudioPlayer from 'vue3-audio-player'
import 'vue3-audio-player/dist/style.css'

let searchValue = ref('')
let toast = useToast()

let { data: musics, refresh } = await useAsyncData(() =>
  $fetch('/api/music/getMusics', {
    query: { name: searchValue.value }
  })
)

let musicData = reactive({
  src: '',
  title: ''
})

let musicModes = ref(JSON.parse(localStorage.getItem('musicModes')) || null)

let audioPlayer = ref(null)

const setSrc = music => {
  musicData.src = music.path
  musicData.title = music.name
}

function playMusicFunc () {
  audioPlayer.value.play()
}

function endedFunc () {
  if (musicModes.value == 'loop') {
    let findIndexMusic = musics.value.findIndex(
      music => music.name == musicData.title
    )

    if (findIndexMusic + 1 > musics.value.length - 1) {
      musicData.src = musics.value[0].path
      musicData.title = musics.value[0].name
    } else {
      musicData.src = musics.value[findIndexMusic + 1].path
      musicData.title = musics.value[findIndexMusic + 1].name
    }
  } else if (musicModes.value == 'repeat') audioPlayer.value.play()
}

async function deleteMusicFunc (music) {
  let data = await $fetch('/api/music/deleteMusic', {
    query: { id: music.id, path: music.path },
    method: 'DELETE'
  })

  await refresh()
  toast.success('موزیک شما حذف شد')
}

watch(musicModes, () => {
  audioPlayer.value.pause()
  localStorage.setItem('musicModes', JSON.stringify(musicModes.value))
})
</script>
