<script setup lang="ts">
import collectionItems from '@/assets/data/collection.json'
import type { CollectionItem } from '@/types/filters'

const route = useRoute()
const router = useRouter()
const { gsap } = useGsap()

const headlineRef = ref()
const badgesRef = ref()
const imageRef = ref()
const tabsRef = ref()

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

onMounted(() => {
  const tl = gsap.timeline()

  tl.from(headlineRef.value.$el.children, {
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
  })
  tl.from(badgesRef.value.children, {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.5')

  tl.from(imageRef.value.$el, {
    opacity: 0,
    x: 50,
    duration: 0.8,
    ease: 'power2.out',
  }, '<')

  tl.from(tabsRef.value.$el, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.5')
})
</script>

<template>
  <main class="min-h-screen px-4 lg:px-24 py-16 flex flex-col gap-8">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-24 mt-20 md:mt-24 items-start">
      <div class="flex flex-col gap-8">
        <ReusableHeadline
          ref="headlineRef"
          :title="item?.name || 'Not Found'"
          :description="item?.short_description || ''"
          color="primary"
          size="xl"
          align="left"
        />

        <div
          ref="badgesRef"
          class="flex flex-wrap items-center gap-2"
        >
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
        ref="imageRef"
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

    <TabsItemData
      ref="tabsRef"
      :item="item"
    />
  </main>
</template>
