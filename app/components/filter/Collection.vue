<script setup lang="ts">
import type { FilterState } from '@/types/filters'

const props = defineProps({
  filters: {
    type: Object as () => FilterState,
    required: true,
  },
  allTags: {
    type: Array as () => string[],
    required: true,
  },
  allMaterials: {
    type: Object as () => ({
      blade: string[]
      handle: string[]
      sheath: string[]
    }),
    required: true,
  },
  allConditions: {
    type: Array as () => string[],
    required: true,
  },
  bladeLengthRange: {
    type: Object as () => ({
      min: number
      max: number
    }),
    required: true,
  },
  clearFilters: {
    type: Function as PropType<() => void>,
    required: true,
  },
})

const emit = defineEmits(['update:filters'])

const debouncedUpdate = useDebounceFn((newFilters: FilterState) => {
  emit('update:filters', newFilters)
}, 500)

const updateFilter = (filterName: keyof FilterState, value: any) => {
  const newFilters = { ...props.filters, [filterName]: value }
  if (filterName === 'searchQuery' || filterName === 'bladeLength') {
    debouncedUpdate(newFilters)
  }
  else {
    emit('update:filters', newFilters)
  }
}

const updateMaterial = (part: keyof FilterState['selectedMaterials'], value: string, isChecked: boolean) => {
  const currentMaterials = props.filters.selectedMaterials[part]
  const updatedMaterials = isChecked
    ? [...currentMaterials, value]
    : currentMaterials.filter(item => item !== value)

  const newFilters = {
    ...props.filters,
    selectedMaterials: {
      ...props.filters.selectedMaterials,
      [part]: updatedMaterials,
    },
  }
  emit('update:filters', newFilters)
}

const isMaterialSelected = (part: keyof FilterState['selectedMaterials'], value: string) => {
  return props.filters.selectedMaterials[part].includes(value)
}

const isConditionSelected = (value: string) => {
  return props.filters.selectedCondition.includes(value)
}

const handleConditionUpdate = (value: string, isChecked: boolean) => {
  const updatedConditions = isChecked
    ? [...props.filters.selectedCondition, value]
    : props.filters.selectedCondition.filter(item => item !== value)

  updateFilter('selectedCondition', updatedConditions)
}

const accordionItems = computed(() => [{
  label: 'Tags',
  icon: 'i-lucide-tag',
  defaultOpen: true,
  slot: 'tags',
}, {
  label: 'Material',
  icon: 'i-lucide-sword',
  slot: 'material',
}, {
  label: 'Blade Length',
  icon: 'i-lucide-ruler',
  slot: 'blade-length',
}, {
  label: 'Condition',
  icon: 'i-lucide-sparkles',
  slot: 'condition',
}])
</script>

<template>
  <aside class="w-full lg:w-1/4">
    <UCard
      variant="subtle"
      class="sticky top-20 flex flex-col gap-12 outline outline-primary-500/20 rounded-3xl shadow-xl shadow-primary-500/20"
    >
      <UButton
        icon="i-lucide-rotate-ccw"
        color="neutral"
        variant="link"
        size="md"
        class="absolute right-5 top-5 hidden lg:block"
        aria-label="Clear Filters"
        @click="clearFilters"
      />

      <div class="flex flex-col">
        <h3 class="text-lg font-semibold text-muted">
          Search
        </h3>
        <UInput
          :model-value="props.filters.searchQuery"
          icon="i-lucide-search"
          size="xl"
          placeholder="Search for an item..."
          @update:model-value="updateFilter('searchQuery', $event)"
        >
          <template
            v-if="props.filters.searchQuery?.length"
            #trailing
          >
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              icon="i-lucide-delete"
              aria-label="Clear input"
              @click="updateFilter('searchQuery', '')"
            />
          </template>
        </UInput>
      </div>

      <div class="flex flex-col">
        <h3 class="text-lg font-semibold text-muted">
          View
        </h3>
        <UButtonGroup size="xl">
          <UButton
            icon="i-lucide-grid-2x2"
            :variant="props.filters.columns === '2' ? 'subtle' : 'ghost'"
            color="primary"
            @click="updateFilter('columns', '2')"
          />
          <UButton
            icon="i-lucide-grid-3x3"
            :variant="props.filters.columns === '3' ? 'subtle' : 'ghost'"
            color="primary"
            @click="updateFilter('columns', '3')"
          />
        </UButtonGroup>
      </div>

      <USeparator
        color="neutral"
        size="lg"
        class="my-2"
      />

      <div class="flex flex-col">
        <h3 class="text-lg font-semibold text-muted">
          Status
        </h3>
        <div class="flex flex-col gap-1">
          <UCheckbox
            label="Certified"
            :model-value="props.filters.isCertified"
            @update:model-value="updateFilter('isCertified', $event as boolean)"
          />
          <UCheckbox
            label="Available"
            :model-value="props.filters.isAvailable"
            @update:model-value="updateFilter('isAvailable', $event as boolean)"
          />
        </div>
      </div>

      <USeparator
        color="neutral"
        size="lg"
        class="my-2"
      />

      <UAccordion :items="accordionItems">
        <template #tags>
          <div class="flex flex-col gap-1 p-2">
            <UCheckbox
              v-for="tag in allTags"
              :key="tag"
              :model-value="props.filters.selectedTags.includes(tag)"
              :label="tag"
              @update:model-value="updateFilter('selectedTags', $event ? [...props.filters.selectedTags, tag] : props.filters.selectedTags.filter(t => t !== tag))"
            />
          </div>
        </template>
        <template #material>
          <div class="flex flex-col gap-2 p-2">
            <div class="flex flex-col gap-1">
              <h4 class="text-sm font-semibold text-muted">
                Blade
              </h4>
              <div class="flex flex-col gap-1">
                <UCheckbox
                  v-for="material in allMaterials.blade"
                  :key="material"
                  :model-value="isMaterialSelected('blade', material)"
                  :label="material"
                  @update:model-value="updateMaterial('blade', material, $event as boolean)"
                />
              </div>
            </div>
            <USeparator />
            <div class="flex flex-col gap-1">
              <h4 class="text-sm font-semibold text-muted">
                Handle
              </h4>
              <div class="flex flex-col gap-1">
                <UCheckbox
                  v-for="material in allMaterials.handle"
                  :key="material"
                  :model-value="isMaterialSelected('handle', material)"
                  :label="material"
                  @update:model-value="updateMaterial('handle', material, $event as boolean)"
                />
              </div>
            </div>
            <USeparator />
            <div class="flex flex-col gap-1">
              <h4 class="text-sm font-semibold text-muted">
                Sheath
              </h4>
              <div class="flex flex-col gap-1">
                <UCheckbox
                  v-for="material in allMaterials.sheath"
                  :key="material"
                  :model-value="isMaterialSelected('sheath', material)"
                  :label="material"
                  @update:model-value="updateMaterial('sheath', material, $event as boolean)"
                />
              </div>
            </div>
          </div>
        </template>
        <template #blade-length>
          <div class="flex flex-col gap-1 p-2">
            <USlider
              :min="bladeLengthRange.min"
              :max="bladeLengthRange.max"
              :step="1"
              :model-value="[props.filters.bladeLength.min, props.filters.bladeLength.max]"
              @update:model-value="updateFilter('bladeLength', { min: $event[0], max: $event[1] })"
            />
            <div class="flex justify-between text-sm">
              <span>{{ props.filters.bladeLength.min }}"</span>
              <span>{{ props.filters.bladeLength.max }}"</span>
            </div>
          </div>
        </template>
        <template #condition>
          <div class="flex flex-col gap-1 p-2">
            <UCheckbox
              v-for="condition in allConditions"
              :key="condition"
              :model-value="isConditionSelected(condition)"
              :label="condition"
              @update:model-value="handleConditionUpdate(condition, $event as boolean)"
            />
          </div>
        </template>
      </UAccordion>
    </UCard>
  </aside>
</template>
