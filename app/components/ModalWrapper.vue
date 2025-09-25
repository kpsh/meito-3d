<script setup lang="ts">
const props = defineProps<{
  contentComponent: Component
  modalProps: Record<string, any>
}>()

const { contentComponent, modalProps } = props
const emit = defineEmits(['close'])
</script>

<template>
  <UModal
    :fullscreen="modalProps.fullscreen"
    class="rounded-3xl"
    @close="emit('close')"
  >
    <template #content>
      <div class="px-4 py-3 flex items-center justify-between">
        <h3
          v-if="modalProps.title"
          class="text-xl text-default font-bold"
        >
          {{ modalProps.title }}
        </h3>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          class="ml-auto rounded-full fancy-button"
          @click="emit('close')"
        />
      </div>

      <div class="p-4">
        <component :is="contentComponent" />
      </div>
    </template>
  </UModal>
</template>
