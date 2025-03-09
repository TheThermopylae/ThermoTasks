<template>
  <section class="flex justify-between items-center" id="about-me">
    <div>
      <Motion
        as="p"
        class="text-2xl font-bold"
        :initial="{ y: 10, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
      >
        من کیم؟
      </Motion>
      <Motion
        as="p"
        class="text-xl mt-2 mb-6"
        :initial="{ y: 10, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{
          delay: 0.5
        }"
      >
        من امیر، دولوپر برنامه های
        <vue-typewriter-effect
          class="font-bold text-purple-700"
          :strings="['ThermoPay', 'ThermoTasks', 'ThermoBooks']"
          :cursor="''"
        />
        هستم!
      </Motion>
      <Motion
        as="div"
        class="text-xl my-2"
        :initial="{ y: 10, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{
          delay: 1
        }"
      >
        <a
          href="#apps"
          class="border border-purple-700 rounded-full px-4 py-2 hover:bg-purple-700 transition-all hover:text-white"
          >برنامه های من
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
            class="inline-block"
          >
            <path
              fill="currentColor"
              d="M24.59 16.59L17 24.17V4h-2v20.17l-7.59-7.58L6 18l10 10l10-10z"
            />
          </svg>
        </a>
      </Motion>
    </div>
    <Motion
      as="div"
      :animate="{ opacity: [0, 1], x: [-500, 0] }"
      :transition="{
        duration: 1,
        ease: 'anticipate'
      }"
    >
      <img
        src="/public/heroimg.webp"
        alt="hero img"
        class="w-96 bg-purple-700 rounded-full"
      />
    </Motion>
  </section>
</template>

<script setup>
import VueTypewriterEffect from 'vue-typewriter-effect'
</script>
