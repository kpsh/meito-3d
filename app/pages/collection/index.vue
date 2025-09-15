<script setup lang="ts">
import type { FilterState } from '@/types/filters'

const { filters, filteredItems, allTags, allMaterials, allConditions, bladeLengthRange, clearFilters } = useCollectionFilters()

const handleUpdateFilters = (newFilters: FilterState) => {
  Object.assign(filters, newFilters)
}
</script>

<template>
  <div class="min-h-screen flex flex-col gap-16 md:gap-24">
    <ReusableHeadline
      title="Collection"
      description="Explore our premium traditional Japanese swords & knives collection."
      color="primary"
      size="xl"
      class="mt-32 md:mt-40"
    />
    <div class="flex flex-col gap-8 lg:flex-row mb-24 md:mb-32">
      <FilterCollection
        :filters="filters"
        :all-tags="allTags"
        :all-materials="allMaterials"
        :all-conditions="allConditions"
        :blade-length-range="bladeLengthRange"
        :clear-filters="clearFilters"
        @update:filters="handleUpdateFilters"
      />
      <main class="w-full lg:w-3/4 flex flex-col gap-8">
        <div
          v-if="filteredItems.length"
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
