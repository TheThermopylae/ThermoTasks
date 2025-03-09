<template>
  <Motion
    as="section"
    ref="section"
    id="apps"
    :initial="{ opacity: 0, y: 20 }"
    class="mt-32 mb-5"
  >
    <h2 class="title">برنامه های من</h2>
    <div class="mt-2 grid grid-cols-3 gap-5">
      <Motion
        ref="card"
        :initial="{ opacity: 0, y: 20 }"
        :animate="isInViewCard ? { opacity: 1, y: 0 } : {}"
        :transition="{
          delay: 0.25
        }"
      >
        <AppCard></AppCard>
      </Motion>
      <Motion
        ref="card"
        as="article"
        :initial="{ opacity: 0, y: 20 }"
        :animate="isInViewCard ? { opacity: 1, y: 0 } : {}"
        :transition="{
          delay: 0.5
        }"
      >
        <AppCard></AppCard>
      </Motion>
      <Motion
        ref="card"
        as="article"
        :initial="{ opacity: 0, y: 20 }"
        :animate="isInViewCard ? { opacity: 1, y: 0 } : {}"
        :transition="{
          delay: 0.75
        }"
      >
        <AppCard></AppCard>
      </Motion>
    </div>
  </Motion>
</template>

<script setup>
import { Motion, useAnimate, useInView } from 'motion-v'

// انیمیشن بخش اصلی
const [section, animateSec] = useAnimate()
const isInViewSection = useInView(section, { once: false })

watch(
  isInViewSection,
  () => {
    if (isInViewSection.value) {
      animateSec(section.value, { opacity: 1, y: 0 })
    }
  },
  { immediate: true }
)

// انیمیشن کارت
const [card] = useAnimate()
const isInViewCard = useInView(card, { once: true })
</script>
