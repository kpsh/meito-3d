<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import type { FilterState } from '@/types/filters'

const { filters, filteredItems, allTags, allMaterials, allConditions, bladeLengthRange, clearFilters } = useCollectionFilters()
const { gsap } = useGsap()

const handleUpdateFilters = (newFilters: FilterState) => {
  Object.assign(filters, newFilters)
}
const breakpoint = useBreakpoints(breakpointsTailwind)
const isCompact = breakpoint.smaller('lg')

const isFiltersVisible = ref(false)

const collectionSectionRef = ref()
const headlineRef = ref()
const mobileButtonsRef = ref()
const filterCollectionRef = ref()
const cardListRef = ref()

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: collectionSectionRef.value,
      start: 'top 75%',
    },
  })

  tl.from(headlineRef.value.$el.children, {
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
  })
  tl.from(
    filterCollectionRef.value.$el,
    {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: 'power2.out',
    },
    '-=0.5',
  )
  tl.from(
    mobileButtonsRef.value.children,
    {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    },
    '-=0.5',
  )
})

watch(filteredItems, () => {
  setTimeout(() => {
    gsap.from(cardListRef.value.children, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, 10)
}, { immediate: true })

watch(() => filters.columns, (newColumns, oldColumns) => {
  if (oldColumns) {
    gsap.from(cardListRef.value.children, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.05,
    })
  }
})
</script>

<template>
  <div
    ref="collectionSectionRef"
    class="min-h-screen flex flex-col gap-16 md:gap-24"
  >
    <ReusableHeadline
      ref="headlineRef"
      title="Collection"
      description="Explore our premium traditional Japanese swords & knives collection."
      color="primary"
      size="xl"
      class="mt-32 md:mt-40"
    />
    <div class="flex flex-col gap-8 lg:flex-row mb-24 md:mb-32">
      <div
        ref="mobileButtonsRef"
        class="flex justify-between items-center gap-2 -mb-2"
      >
        <UButton
          v-if="isCompact"
          size="xl"
          color="primary"
          :block="false"
          :variant="isFiltersVisible ? 'solid' : 'subtle'"
          :label="isFiltersVisible ? 'Hide Filters' : 'Show Filters'"
          :icon="isFiltersVisible ? 'i-lucide-filter-x' : 'i-lucide-filter'"
          @click="isFiltersVisible = !isFiltersVisible"
        />
        <UButton
          v-if="isCompact"
          icon="i-lucide-rotate-ccw"
          color="neutral"
          variant="subtle"
          size="xl"
          aria-label="Clear Filters"
          @click="clearFilters"
        />
      </div>

      <FilterCollection
        v-if="isFiltersVisible || !isCompact"
        ref="filterCollectionRef"
        :filters="filters"
        :all-tags="allTags"
        :all-materials="allMaterials"
        :all-conditions="allConditions"
        :blade-length-range="bladeLengthRange"
        :clear-filters="clearFilters"
        @update:filters="handleUpdateFilters"
      />
      <main
        class="w-full lg:w-3/4 flex flex-col gap-8"
      >
        <div
          v-if="filteredItems.length"
          ref="cardListRef"
          class="grid gap-6"
          :class="{
            'sm:grid-cols-2': filters.columns === '2',
            'sm:grid-cols-2 lg:grid-cols-3': filters.columns === '3',
          }"
        >
          <CardItem
            v-for="item in filteredItems"
            :key="item.id"
            :item="item"
          />
        </div>
        <CardEmpty
          v-else
          icon="i-lucide-search-x"
          title="No items found."
          description="Your search and filter criteria did not match any items in the collection. Please try adjusting your filters or search query."
          button-text="Clear Filters"
          button-icon="i-lucide-rotate-ccw"
          :button-action="clearFilters"
        />
      </main>
    </div>
  </div>
</template>
