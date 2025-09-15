<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: undefined,
  },
  buttonIcon: {
    type: String,
    default: undefined,
  },
  buttonAction: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
})
</script>

<template>
  <UCard
    variant="subtle"
    class="flex flex-col items-center justify-center p-8 text-center rounded-3xl"
  >
    <UIcon
      :name="props.icon"
      class="w-16 h-16 text-neutral-400 dark:text-neutral-600 mb-4"
    />
    <h3 class="text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
      {{ props.title }}
    </h3>
    <p class="text-neutral-500 dark:text-neutral-500 mb-6">
      {{ props.description }}
    </p>
    <slot />
    <UButton
      v-if="props.buttonText"
      :icon="props.buttonIcon"
      size="lg"
      @click="props.buttonAction"
    >
      {{ props.buttonText }}
    </UButton>
  </UCard>
</template>
