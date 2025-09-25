<script setup lang="ts">
const { gsap } = useGsap()
const { openModal } = useModal()

const heroSectionRef = ref()
const heroContentRef = ref()
const heroBgRef = ref()

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSectionRef.value,
      start: 'top 75%',
    },
  })

  tl.from(heroBgRef.value, {
    opacity: 0,
    duration: 1.5,
    ease: 'power2.inOut',
  }).from(
    heroContentRef.value.children,
    {
      opacity: 0,
      y: 50,
      stagger: 0.5,
      duration: 1.2,
      ease: 'power3.out',
    },
    '-=0.8',
  )
})
</script>

<template>
  <section
    ref="heroSectionRef"
    class="h-screen"
  >
    <img
      ref="heroBgRef"
      src="@/assets/images/herobg.png"
      alt="Hero Background"
      class="absolute inset-0 h-full w-full object-cover"
    >
    <div
      ref="heroContentRef"
      class="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-between pb-28 pt-44 md:items-start"
    >
      <h1 class="font-serif text-5xl font-bold text-highlighted xs:text-6xl sm:text-7xl">
        Meitö 3D
      </h1>
      <div class="flex flex-col items-center justify-center gap-1 md:self-end">
        <UButton
          size="xl"
          variant="ghost"
          color="primary"
          label="How it works"
          trailing-icon="i-lucide-chevrons-right"
          class="fancy-button fancy-lg"
          @click="openModal(
            'room',
            {
              title: 'How It Works',
              fullscreen: true,
            },
          )"
        />
        <UButton
          variant="link"
          color="neutral"
          label="Explore collection"
          size="xl"
          to="/collection"
          class="text-default hover:text-highlighted hover:underline decoration-2"
        />
      </div>
    </div>
  </section>
</template>
