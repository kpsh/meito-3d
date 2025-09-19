<script lang="ts" setup>
/**
 * Headline Props
 * @prop title {string} (required) - The headline title
 * @prop description {string} (required) - The headline description
 * @prop align {'center' | 'left' | 'right'} (default: 'center') - Alignment of headline
 * @prop color {'primary' | 'default'} (default: 'primary') - Color of headline title
 * @prop size {'md' | 'lg' | 'xl'} (default: 'lg') - Size of headline
 */
interface Props {
  title: string
  description: string
  align?: 'center' | 'left' | 'right'
  color?: 'primary' | 'default'
  size?: 'md' | 'lg' | 'xl'
}

const props = defineProps<Props>()

const alignClass = computed(() => {
  if (props.align === 'left') return 'text-left items-start'
  if (props.align === 'right') return 'text-right items-end'
  return 'text-center items-center'
})
const colorClass = computed(() =>
  props.color === 'primary'
    ? 'text-primary text-shadow-sm text-shadow-primary-600'
    : 'text-highlighted text-shadow-sm text-shadow-neutral-500',
)
const titleSizeClass = computed(() => {
  if (props.size === 'md') return 'text-xl md:text-2xl'
  if (props.size === 'xl') return 'text-3xl md:text-4xl'
  return 'text-2xl md:text-3xl'
})
const descSizeClass = computed(() => {
  if (props.size === 'md') return 'text-md'
  if (props.size === 'xl') return 'text-xl'
  return 'text-lg'
})
</script>

<template>
  <div
    :class="`flex flex-col gap-4 ${alignClass}`"
  >
    <h2
      class="font-bold leading-tight"
      :class="`${colorClass} ${titleSizeClass}`"
    >
      {{ title }}
    </h2>
    <p
      class="text-toned max-w-2xl"
      :class="descSizeClass"
    >
      {{ description }}
    </p>
  </div>
</template>
