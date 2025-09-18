<script setup lang="ts">
const { gsap } = useGsap()

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
      class="absolute inset-0 w-full h-full object-cover"
    >
    <div
      ref="heroContentRef"
      class="max-w-4xl mx-auto relative z-10 flex flex-col items-center md:items-start justify-between h-full pt-44 pb-28"
    >
      <h1 class="text-5xl xs:text-6xl sm:text-7xl font-serif font-bold text-highlighted">
        Meitö 3D
      </h1>
      <div class="md:self-end flex flex-col justify-center items-center gap-1">
        <UButton
          size="xl"
          variant="ghost"
          color="primary"
          label="How it works"
          trailing-icon="i-lucide-chevrons-right"
          class="fancy-button fancy-lg"
        />
        <UButton
          variant="link"
          color="neutral"
          label="Explore collection"
          size="xl"
          class="text-default hover:text-highlighted hover:underline decoration-2"
        />
      </div>
    </div>
  </section>
</template>
