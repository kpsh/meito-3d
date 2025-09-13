<script lang="ts" setup>
const { gsap } = useGsap()

const aboutSectionRef = ref()
const headlineRef = ref()
const imageRef = ref()

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: aboutSectionRef.value,
      start: 'top 75%',
    },
  })

  tl.from(headlineRef.value, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
  }).from(
    imageRef.value,
    {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: 'power3.out',
    },
    '-=0.7',
  )
})
</script>

<template>
  <section ref="aboutSectionRef">
    <div class="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
        <div ref="headlineRef">
          <ReusableHeadline
            title="About Meito 3D"
            description="Meito 3D is a Japan based blacksmithing business that crafts high-value and traditional swords and knives. With a rich heritage rooted in the ancient art of Japanese sword-making, Meito 3D combines time-honored techniques with modern craftsmanship to create exquisite blades that are both functional and artistic. Each piece is meticulously forged using premium materials, ensuring exceptional quality and durability. Meito 3D is dedicated to preserving the legacy of traditional sword-making while innovating to meet contemporary standards, making it a trusted name among collectors, martial artists, and enthusiasts worldwide."
            align="left"
            color="primary"
            size="xl"
          />
        </div>
        <div>
          <img
            ref="imageRef"
            src="@/assets/images/about.png"
            alt="About Meito 3D"
            class="rounded-3xl shadow-xl shadow-primary-500/20"
          >
        </div>
      </div>
    </div>
  </section>
</template>
