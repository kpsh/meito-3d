<script setup lang="ts">
import { UButton } from '#components'
</script>

<template>
  <div class="h-screen">
    <img
      src="@/assets/images/herobg.png"
      alt="Hero Background"
      class="absolute inset-0 w-full h-full object-cover"
    >
    <div class="max-w-4xl mx-auto relative z-10 flex flex-col items-start justify-between h-full py-48">
      <h1 class="text-7xl font-serif text-highlighted">
        Meitö 3D
      </h1>
      <div class="self-end flex flex-col justify-center items-center gap-4">
        <UButton
          variant="ghost"
          color="primary"
          label="How it works"
          size="xl"
          class="p-5 px-10 text-2xl font-medium rounded-full border-2 border-primary/70 transition-colors"
        />
        <UButton
          variant="link"
          color="primary"
          label="Explore collection"
          size="xl"
        />
      </div>
    </div>
  </div>
</template>
