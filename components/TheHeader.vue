<template>
  <Motion
    class="fixed w-full right-0 p-4 border-b flex items-center gap-5 z-10"
    as="header"
    :initial="{ top: '-200px' }"
    :animate="{ top: 0 }"
    :transition="{ duration: 0.5 }"
  >
    <p class="text-3xl">Thermo<span class="text-purple-700">Apps</span></p>
    <ul class="flex gap-5">
      <li>
        <a href="#about-me" class="hover:text-purple-700 transition-all"> درباره ی من</a>
      </li>
      <li>
        <a href="#skills" class="hover:text-purple-700 transition-all">مهارت های من</a>
      </li>
      <li>
        <a href="#apps" class="hover:text-purple-700 transition-all">برنامه های من</a>
      </li>
    </ul>
  </Motion>
</template>

<style scoped>
header {
  backdrop-filter: blur(5px) saturate(180%);
  background-color: rgba(224, 224, 224, 0.32);
}
</style>
