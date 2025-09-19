<script setup lang="ts">
const props = defineProps<{
  contentComponent: Component
  modalProps: Record<string, any>
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <UModal
    :title="props.modalProps.title"
    :description="props.modalProps.description"
    aria-describedby="modal"
    :fullscreen="props.modalProps.fullscreen"
    :ui="{
      width: props.modalProps.width,
    }"
    @close="emit('close')"
  >
    <template #body>
      <component :is="props.contentComponent" />
    </template>
  </UModal>
</template>
