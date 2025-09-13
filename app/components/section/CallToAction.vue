<script setup lang="ts">

</script>

<template>
  <section class="relative mb-12 py-12 md:py-24 rounded-3xl overflow-hidden bg-[url(@/assets/images/sword-pattern.png)] bg-cover bg-center after:absolute after:inset-0 after:z-0 after:bg-gradient-to-b after:from-transparent after:to-elevated">
    <div class="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
      <ReusableHeadline
        title="Forged in Fire, Crafted for You"
        description="Experience the legacy of traditional Japanese craftsmanship. Our blades are more than tools—they are works of art, meticulously forged by hand in Tokyo."
        align="left"
        color="primary"
        size="xl"
      />

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
  </section>
</template>
