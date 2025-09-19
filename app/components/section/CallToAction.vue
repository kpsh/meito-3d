<script setup lang="ts">
const { gsap } = useGsap()

const sectionRef = ref()
const headlineRef = ref()
const buttonsRef = ref()

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 75%',
    },
  })

  tl.from(sectionRef.value, {
    scale: 0.9,
    y: -40,
    opacity: 0.6,
    duration: 1.5,
    ease: 'power3.inOut',
  })
    .from(
      headlineRef.value.$el.children,
      {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.8',
    )
    // .from(
    //   buttonsRef.value.children,
    //   {
    //     opacity: 0,
    //     y: 30,
    //     stagger: 0.2,
    //     duration: 0.8,
    //     ease: 'power2.out',
    //   },
    //   '-=0.5',
    // )
})
</script>

<template>
  <section
    ref="sectionRef"
    class="relative mb-12 overflow-hidden rounded-3xl bg-[url(@/assets/images/sword-pattern.png)] bg-cover bg-center py-12 after:absolute after:inset-0 after:z-0 after:bg-gradient-to-b after:from-transparent after:to-elevated md:py-24"
  >
    <div class="relative z-10 mx-auto grid grid-cols-1 items-center gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-8 lg:px-8">
      <ReusableHeadline
        ref="headlineRef"
        title="Forged in Fire, Crafted for You"
        description="Experience the legacy of traditional Japanese craftsmanship. Our blades are more than tools—they are works of art, meticulously forged by hand in Tokyo."
        align="left"
        color="primary"
        size="xl"
      />

      <div
        ref="buttonsRef"
        class="mt-6 flex flex-col justify-center gap-4 sm:flex-row md:mt-0 md:justify-end"
      >
        <UButton
          label="Check Out How We Build Them"
          icon="i-lucide-flame"
          trailing
          size="xl"
          variant="ghost"
          color="primary"
          class="fancy-button"
        />
        <UButton
          label="View Our Collection"
          to="/collection"
          icon="i-lucide-arrow-right"
          size="xl"
          color="neutral"
          variant="outline"
        />
      </div>
    </div>
  </section>
</template>
