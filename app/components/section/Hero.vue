<script setup lang="ts">
import { UButton } from '#components'
</script>

<template>
  <section class="h-screen">
    <img
      src="@/assets/images/herobg.png"
      alt="Hero Background"
      class="absolute inset-0 w-full h-full object-cover"
    >
    <div class="max-w-4xl mx-auto relative z-10 flex flex-col items-center md:items-start justify-between h-full pt-44 pb-28">
      <h1 class="text-5xl xs:text-6xl sm:text-7xl font-serif font-bold text-highlighted">
        Meitö 3D
      </h1>
      <div class="md:self-end flex flex-col justify-center items-center gap-1">
        <UButton
          size="xl"
          variant="ghost"
          color="primary"
          label="How it works"
          trailing-icon="i-lucide-chevrons-right"
          class="p-3 sm:p-5 px-6 sm:px-10 text-xl sm:text-2xl font-medium rounded-full border-2 border-primary/70 transition-colors"
        />
        <UButton
          variant="link"
          color="neutral"
          label="Explore collection"
          size="xl"
          class="text-default hover:text-highlighted hover:underline decoration-2"
        />
      </div>
    </div>
  </section>
</template>
