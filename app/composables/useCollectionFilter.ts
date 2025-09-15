import collectionItems from '@/assets/data/collection.json'
import type { FilterState, CollectionItem } from '@/types/filters'

const filters = reactive<FilterState>({
  searchQuery: '',
  selectedTags: [],
  selectedMaterials: {
    blade: [],
    handle: [],
    sheath: [],
  },
  selectedCondition: [],
  isCertified: false,
  isAvailable: false,
  bladeLength: {
    min: 0,
    max: 100,
  },
  columns: '3',
})

const filteredItems = computed(() => {
  let items: CollectionItem[] = collectionItems

  if (filters.searchQuery) {
    items = items.filter(item => item.name.toLowerCase().includes(filters.searchQuery.toLowerCase()))
  }

  if (filters.selectedTags.length > 0) {
    items = items.filter(item => filters.selectedTags.some(tag => item.tags.includes(tag)))
  }

  if (filters.selectedMaterials.blade.length > 0) {
    items = items.filter(item => item.material?.blade && filters.selectedMaterials.blade.includes(item.material.blade))
  }
  if (filters.selectedMaterials.handle.length > 0) {
    items = items.filter(item => item.material?.handle && filters.selectedMaterials.handle.includes(item.material.handle))
  }
  if (filters.selectedMaterials.sheath.length > 0) {
    items = items.filter(item => item.material?.sheath && filters.selectedMaterials.sheath.includes(item.material.sheath))
  }

  if (filters.selectedCondition.length > 0) {
    items = items.filter(item => item.material?.condition && filters.selectedCondition.includes(item.material.condition))
  }

  if (filters.isCertified) {
    items = items.filter(item => item.is_certified)
  }
  if (filters.isAvailable) {
    items = items.filter(item => item.is_available)
  }

  items = items.filter((item) => {
    const bladeLength = item.blade?.[0]?.length?.inch || 0
    return bladeLength >= filters.bladeLength.min && bladeLength <= filters.bladeLength.max
  })

  return items
})

const allTags = computed(() => {
  const tags = new Set<string>()
  collectionItems.forEach(item => item.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags).sort()
})

const allMaterials = computed(() => {
  const materials = {
    blade: new Set<string>(),
    handle: new Set<string>(),
    sheath: new Set<string>(),
  }
  collectionItems.forEach((item) => {
    if (item.material?.blade) {
      materials.blade.add(item.material.blade)
    }
    if (item.material?.handle) {
      materials.handle.add(item.material.handle)
    }
    if (item.material?.sheath) {
      materials.sheath.add(item.material.sheath)
    }
  })
  return {
    blade: Array.from(materials.blade).sort(),
    handle: Array.from(materials.handle).sort(),
    sheath: Array.from(materials.sheath).sort(),
  }
})

const allConditions = computed(() => {
  const conditions = new Set<string>()
  collectionItems.forEach((item) => {
    if (item.material?.condition) {
      conditions.add(item.material.condition)
    }
  })
  return Array.from(conditions).sort()
})

const bladeLengthRange = computed(() => {
  const allLengths = collectionItems
    .map(item => item.blade?.[0]?.length?.inch)
    .filter(length => typeof length === 'number') as number[]

  if (allLengths.length === 0) {
    return { min: 0, max: 100 }
  }
  const min = Math.floor(Math.min(...allLengths))
  const max = Math.ceil(Math.max(...allLengths))

  return { min, max }
})

const bladeLengthInitial = computed(() => ({
  min: bladeLengthRange.value.min,
  max: bladeLengthRange.value.max,
}))

const clearFilters = () => {
  filters.searchQuery = ''
  filters.selectedTags = []
  filters.selectedMaterials.blade = []
  filters.selectedMaterials.handle = []
  filters.selectedMaterials.sheath = []
  filters.selectedCondition = []
  filters.isCertified = false
  filters.isAvailable = false
  filters.bladeLength = { ...bladeLengthInitial.value }
  filters.columns = '3'
}

if (filters.bladeLength.min === 0 && filters.bladeLength.max === 100) {
  filters.bladeLength = { ...bladeLengthInitial.value }
}

export const useCollectionFilters = () => {
  return {
    filters,
    filteredItems,
    allTags,
    allMaterials,
    allConditions,
    bladeLengthRange,
    bladeLengthInitial,
    clearFilters,
  }
}
