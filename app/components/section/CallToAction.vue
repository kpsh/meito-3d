<script setup lang="ts">
// No script logic needed, just a clean setup block.
</script>

<template>
  <section class="relative py-12 md:py-24">
    <div class="absolute inset-0 z-0">
      <img
        src="@/assets/images/sword-pattern.png"
        alt="Ornate sword and knife patterns"
        class="w-full h-full object-cover rounded-t-3xl"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-elevated rounded-t-3xl" />
    </div>

    <div class="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <div class="text-center md:text-left">
          <ReusableHeadline
            title="Forged in Fire, Crafted for You"
            description="Experience the legacy of traditional Japanese craftsmanship. Our blades are more than tools—they are works of art, meticulously forged by hand in Tokyo."
            align="left"
            color="primary"
            size="xl"
          />
        </div>

        <div class="flex flex-col sm:flex-row md:justify-end justify-center gap-4 mt-6 md:mt-0">
          <UButton
            label="Check Out How We Build Them"
            icon="i-lucide-flame"
            trailing
            size="xl"
            color="primary"
            variant="solid"
          />
          <UButton
            label="View Our Collection"
            to="/collection"
            icon="i-lucide-arrow-right"
            size="xl"
            color="neutral"
            variant="outline"
          />
        </div>
      </div>
    </div>
  </section>
</template>
