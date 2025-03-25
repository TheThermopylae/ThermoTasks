<template>
  <div class="drawer">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <label
        for="my-drawer-2"
        class="drawer-button fixed bottom-16 right-5 bg-yellow-400 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-125 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm0 0V5zm2-2h10q.3 0 .45-.275t-.05-.525l-2.75-3.675q-.15-.2-.4-.2t-.4.2L11.25 16L9.4 13.525q-.15-.2-.4-.2t-.4.2l-2 2.675q-.2.25-.05.525T7 17"
          />
        </svg>
      </label>
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="bg-base-200 text-base-content min-h-full w-96 p-4">
        <BgUploadBg @uploadedImage="refresh" class="mb-5"></BgUploadBg>
        <li v-for="item in images" :key="item.id" class="mb-3 last:m-0">
          <BgCard @refreshData="refresh" :image="item"></BgCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
let { data: images, refresh } = await useAsyncData(() =>
  $fetch('/api/image/getImages')
)
</script>
