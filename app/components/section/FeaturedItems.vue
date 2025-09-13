<script setup lang="ts">
import collectionItems from '@/assets/data/featured.json'

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
      <UCard variant="subtle">
        <template #default>
          <div class="aspect-video w-full overflow-hidden">
            <img
              :src="item.image_url"
              :alt="item.name"
              class="h-full w-full rounded-md object-cover transition-transform duration-300 hover:scale-105"
            >
          </div>
          <div class="mt-4">
            <h3 class="truncate text-xl font-bold">
              {{ item.name }}
            </h3>
            <p class="mt-1 line-clamp-2 text-sm text-muted">
              {{ item.short_description }}
            </p>
          </div>
        </template>

        <template #footer>
          <div class="flex items-center justify-between">
            <UButton
              icon="i-lucide-flame"
              size="lg"
              color="primary"
              square
              variant="subtle"
            />
            <UButton
              :to="`/collection/${item.id}`"
              label="View"
              variant="ghost"
              color="primary"
              trailing-icon="i-lucide-arrow-right"
            />
          </div>
        </template>
      </UCard>
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
