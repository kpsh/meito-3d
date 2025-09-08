<script setup lang="ts">
import collectionItems from '@/assets/data/featured.json'
</script>

<template>
  <section>
    <ReusableHeadline
      title="Featured Collection"
      description="Hand-picked assets from our top creators."
      size="xl"
    />
    <UCarousel
      v-slot="{ item }"
      :items="collectionItems"
      :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 p-4' }"
      class="w-full max-w-6xl mx-auto relative"
      autoplay
      loop
    >
      <UCard variant="subtle">
        <template #default>
          <div class="aspect-video w-full overflow-hidden">
            <img
              :src="item.image_url"
              :alt="item.name"
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-md"
            >
          </div>
          <div class="mt-4">
            <h3 class="text-xl font-bold truncate">
              {{ item.name }}
            </h3>
            <p class="mt-1 text-muted text-sm line-clamp-2">
              {{ item.short_description }}
            </p>
          </div>
        </template>

        <template #footer>
          <div class="flex justify-between items-center">
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
