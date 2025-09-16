<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'
import type { CollectionItem } from '~/types/filters'

const props = defineProps({
  item: {
    type: Object as () => CollectionItem | undefined,
    required: true,
  },
})

const isCertified = computed(() => props.item?.is_certified ?? false)
const isAvailable = computed(() => props.item?.is_available ?? false)

const hasRatings = computed(() => !!props.item?.ratings?.count)
const averageRating = computed(() => props.item?.ratings?.average ?? 0)
const ratingCount = computed(() => props.item?.ratings?.count ?? 0)

const tabItems: TabsItem[] = [
  { label: 'Overview', icon: 'i-lucide-info', value: 'overview' },
  { label: 'Blades', icon: 'i-lucide-scissors', value: 'blades' },
  { label: 'Materials', icon: 'i-lucide-package', value: 'materials' },
]
</script>

<template>
  <UTabs
    :items="tabItems"
    color="primary"
    variant="link"
    size="xl"
    default-value="overview"
    class="border border-muted rounded-3xl"
  >
    <template #content="{ item: tab }">
      <div
        v-if="tab.value === 'overview'"
        class="p-6 space-y-4"
      >
        <h3 class="text-xl font-bold">
          General Information
        </h3>
        <p class="text-muted">
          {{ item?.long_description || 'No additional description available.' }}
        </p>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">
            Status & Ratings
          </h3>
          <div class="flex flex-wrap items-center gap-3">
            <UBadge
              :color="isAvailable ? 'primary' : 'error'"
              variant="solid"
              size="lg"
            >
              {{ isAvailable ? 'Available' : 'Unavailable' }}
            </UBadge>
            <UBadge
              v-if="isCertified"
              color="primary"
              variant="subtle"
              size="lg"
              icon="i-lucide-award"
            >
              Certified
            </UBadge>
          </div>

          <div>
            <template v-if="hasRatings">
              <div class="flex items-center gap-2 text-yellow-500">
                <UIcon
                  name="i-lucide-star"
                  class="w-5 h-5"
                />
                <span class="font-semibold">{{ averageRating }}</span>
                <span class="text-sm text-muted">
                  ({{ ratingCount }})
                </span>
              </div>
            </template>
            <template v-else>
              <UBadge
                color="neutral"
                variant="soft"
                size="sm"
              >
                No ratings yet
              </UBadge>
            </template>
          </div>
        </div>
      </div>

      <div
        v-else-if="tab.value === 'blades'"
        class="p-6 space-y-6"
      >
        <h3 class="text-xl font-bold">
          Blade Details
        </h3>
        <div class="grid sm:grid-cols-2 gap-6">
          <div
            v-for="(blade, index) in item?.blade"
            :key="index"
            class="flex flex-col gap-3 rounded-xl border border-muted p-4"
          >
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-scissors"
                class="w-5 h-5 text-primary-500"
              />
              <span class="font-semibold">Profile</span>
            </div>
            <p class="text-sm text-muted">
              {{ blade.profile }}
            </p>

            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-ruler"
                class="w-5 h-5 text-primary-500"
              />
              <span class="font-semibold">Length</span>
            </div>
            <p class="text-sm text-muted">
              {{ blade.length.inch }}" ({{ blade.length.cm }} cm)
            </p>
          </div>
        </div>
      </div>

      <div
        v-else-if="tab.value === 'materials'"
        class="p-6 space-y-6"
      >
        <h3 class="text-xl font-bold">
          Materials & Condition
        </h3>
        <div class="flex items-center gap-2">
          <UBadge
            color="primary"
            variant="soft"
          >
            Condition: {{ item?.material?.condition }}
          </UBadge>
        </div>

        <div class="grid sm:grid-cols-3 gap-4">
          <div class="flex flex-col items-center gap-2 rounded-lg border border-muted p-4">
            <UIcon
              name="i-lucide-sword"
              class="w-6 h-6 text-primary-500"
            />
            <span class="text-sm font-medium">Blade</span>
            <span class="text-sm text-muted">
              {{ item?.material?.blade }}
            </span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded-lg border border-muted p-4">
            <UIcon
              name="i-lucide-hand"
              class="w-6 h-6 text-primary-500"
            />
            <span class="text-sm font-medium">Handle</span>
            <span class="text-sm text-muted">
              {{ item?.material?.handle }}
            </span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded-lg border border-muted p-4">
            <UIcon
              name="i-lucide-box"
              class="w-6 h-6 text-primary-500"
            />
            <span class="text-sm font-medium">Sheath</span>
            <span class="text-sm text-muted">
              {{ item?.material?.sheath }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </UTabs>
</template>
