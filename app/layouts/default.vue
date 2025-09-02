<script lang="ts" setup>
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

const breakpoint = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoint.smaller('md')
</script>

<template>
  <main>
    <NavbarMobile v-if="isMobile" />
    <NavbarDesktop v-else />

    <UContainer>
      <slot />
    </UContainer>

    <SectionFooter />
  </main>
</template>
