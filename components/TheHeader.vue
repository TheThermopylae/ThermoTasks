<template>
  <Motion
    as="header"
    class="flex justify-between items-center container m-auto mb-10 gap-5"
    :initial="{ y: -200 }"
    :animate="{ y: 0 }"
  >
    <h1 class="text-3xl">
      Thermo<span class="text-yellow-500 font-bold">Tasks</span>
    </h1>
    <div class="flex-grow relative">
      <input
        type="text"
        id="search-task"
        class="w-full set-ring p-3"
        placeholder="جست و جو از بین تسک ها"
        @keyup.{keyAlias}.enter="searchTask"
        v-model="searchValue"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
    <div>
      <!-- <button
        class="bg-yellow-400 p-3 rounded-tr-lg rounded-br-lg ml-0.5 w-[170px] text-white"
        @click="showModal"
      >
        افزودن دسته بندی
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5 inline-block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button> -->
      <button
        class="bg-yellow-400 p-3 rounded-lg text-white "
        @click="showModal"
      >
        افزودن تسک
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5 inline-block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  </Motion>
</template>

<script setup>
let showModal = inject('showModal')

let searchValue = ref('')

let router = useRouter()

async function searchTask () {
  if (searchValue.value) {
    let data = await $fetch('/api/searchTodo', {
      query: { title: searchValue.value }
    })

    router.push({
      path: '/',
      query: { title: searchValue.value }
    })
  } else {
    router.push({
      path: '/',
      query: {}
    })
  }
}
</script>
