<script setup lang="ts">
import collectionItems from '@/assets/data/collection.json'
import type { CollectionItem } from '@/types/filters'

const route = useRoute()
const router = useRouter()

const itemId = computed(() => route.params.item_id as string)
const item = computed<CollectionItem | undefined>(() => {
  return collectionItems.find(i => i.id === itemId.value)
})

watch(item, (val) => {
  if (!val) router.replace('/collection')
}, { immediate: true })

useSeoMeta({
  title: item.value?.name,
  description: item.value?.short_description,
  ogImage: item.value?.image_url,
})
</script>

<template>
  <div class="min-h-screen px-4 lg:px-24 py-16 flex flex-col gap-8">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-24 mt-20 md:mt-24 items-start">
      <div class="flex flex-col gap-8">
        <ReusableHeadline
          :title="item?.name || 'Not Found'"
          :description="item?.short_description || ''"
          color="primary"
          size="xl"
          align="left"
        />

        <div class="flex flex-wrap items-center gap-2">
          <UBadge
            color="primary"
            variant="subtle"
            icon="i-lucide-swords"
          >
            {{ item?.type }}
          </UBadge>
          <UBadge
            v-for="tag in item?.tags"
            :key="tag"
            color="neutral"
            variant="soft"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>

      <UCard
        variant="subtle"
        class="rounded-3xl shadow-xl shadow-primary-500/20 overflow-hidden"
      >
        <img
          :src="item?.image_url"
          :alt="item?.name"
          class="rounded-lg object-cover w-full h-full"
        >
      </UCard>
    </div>

    <TabsItemData :item="item" />
  </div>
</template>
