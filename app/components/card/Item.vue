<script setup lang="ts">
import { z } from 'zod'

const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  image_url: z.url() || z.string(),
  short_description: z.string(),
})

type Item = z.infer<typeof ItemSchema>

defineProps<{
  item: Item
}>()
</script>

<template>
  <UCard
    variant="subtle"
    class="h-full"
  >
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
          label="Build!"
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
</template>
