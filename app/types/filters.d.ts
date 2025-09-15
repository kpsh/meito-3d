export interface FilterState {
  searchQuery: string
  selectedTags: string[]
  selectedMaterials: {
    blade: string[]
    handle: string[]
    sheath: string[]
  }
  selectedCondition: string[]
  isCertified: boolean
  isAvailable: boolean
  bladeLength: {
    min: number
    max: number
  }
  columns: string
}

export interface Blade {
  profile: string
  length: {
    inch: number
    cm: number
  }
}

export interface Material {
  condition: string
  blade: string
  handle: string
  sheath: string
}

export interface Ratings {
  average: number
  count: number
}

export interface CollectionItem {
  id: string
  type: string
  name: string
  short_description: string
  image_url: string
  tags: string[]
  ratings: Ratings
  blade?: Blade[]
  material?: Material
  is_certified: boolean
  is_available: boolean
}
