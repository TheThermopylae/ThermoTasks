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
        class="drawer-button absolute bottom-0 right-3 bg-yellow-400 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-125 transition-all duration-300"
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
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="bg-base-200 text-base-content min-h-full w-96 p-4">
        <!-- Sidebar content here -->
        <li class="flex gap-3 mb-5">
          <MusicUploadMusic @uploadedMusic="refresh"></MusicUploadMusic>
        </li>
        <MusicCard
          v-for="item in musics"
          :key="item.id"
          :music="item"
          @setSrcEmit="setSrc(item)"
          @deleteMusic="deleteMusicFunc(item)"
        ></MusicCard>
        <li class="absolute bottom-2 w-full left-0">
          <AudioPlayer
            ref="audioPlayer"
            v-if="musicData.src"
            :option="{
              src: musicData.src,
              title: musicData.title.slice(0,14) + '...',
            }"
            @loadedmetadata="playMusicFunc"
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

let toast = useToast()

let { data: musics, refresh } = await useFetch('/api/music/getMusics')

let musicData = reactive({
  src: '',
  title: ''
})

let audioPlayer = ref(null)

const setSrc = music => {
  musicData.src = music.path
  musicData.title = music.name
}

function playMusicFunc () {
  audioPlayer.value.play()
}

async function deleteMusicFunc (music) {
  let data = await $fetch('/api/music/deleteMusic', {
    query: { id: music.id, path: music.path },
    method: 'DELETE'
  })

  await refresh()
  toast.success('موزیک شما حذف شد')
}
</script>