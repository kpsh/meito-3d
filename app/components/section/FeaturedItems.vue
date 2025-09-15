<script setup lang="ts">
import collectionItems from '@/assets/data/collection.json'

const { gsap } = useGsap()

const collectionSectionRef = ref()
const headlineRef = ref()
const carouselRef = ref()
const buttonRef = ref()

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: collectionSectionRef.value,
      start: 'top 75%',
    },
  })

  tl.from(headlineRef.value.$el, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
  })
    .from(
      carouselRef.value.$el.children,
      {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.5',
    )
    .from(
      buttonRef.value.$el,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.4',
    )
})
</script>

<template>
  <section ref="collectionSectionRef">
    <ReusableHeadline
      ref="headlineRef"
      title="Featured Collection"
      description="Hand-picked assets from our top creators."
      size="xl"
    />
    <UCarousel
      ref="carouselRef"
      v-slot="{ item }"
      :items="collectionItems"
      :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 p-4' }"
      class="relative mx-auto w-full max-w-6xl"
      autoplay
      loop
    >
      <CardItem :item="item" />
    </UCarousel>

    <div class="mt-8 text-center">
      <UButton
        ref="buttonRef"
        to="/collection"
        label="View All"
        variant="outline"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        size="xl"
      />
    </div>
  </section>
</template>
