<script lang="ts" setup>
const route = useRoute()

const { y } = useScroll(window)
const isScrolled = computed(() => y.value > 0)

const isOpen = ref(false)

const items = computed(() => [
  {
    label: 'About Us',
    icon: 'i-lucide-sword',
    to: '/#about',
    active: route.path === '/' && route.hash === '#about',
  },
  {
    label: 'Collection',
    icon: 'i-lucide-pocket-knife',
    to: '/collection',
    open: true,
    children: [
      {
        label: 'Katana',
        to: '/collection?c=katana',
        description: 'The classic, iconic Japanese sword.',
      },
      {
        label: 'Wakizashi',
        to: '/collection?c=wakizashi',
        description: 'The companion sword to the katana.',
      },
      {
        label: 'Tanto',
        to: '/collection?c=tanto',
        description: 'A small, versatile blade, perfect for close combat.',
      },
      {
        label: 'Custom',
        to: '/collection?c=custom',
        description: 'Custom sword designs',
      },
      {
        label: 'Kitchen Knives',
        to: '/collection?c=knives',
        description: 'High-quality Japanese kitchen knives.',
      },
      {
        label: 'Accessories',
        to: '/collection?c=accessories',
        description: 'Sword maintenance and display accessories.',
      },
    ],
  },
  {
    label: 'Contact',
    icon: 'i-lucide-message-circle',
    to: '/#contact',
    active: route.path === '/' && route.hash === '#contact',
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/kpsh/meito-3d',
    target: '_blank',
  },
])
</script>

<template>
  <div
    :class="{
      'bg-elevated shadow-md': isScrolled,
      'bg-transparent': !isScrolled,
    }"
    class="py-4 fixed w-full top-0 z-50 transition-colors delay-300"
  >
    <UContainer class="flex justify-between items-center">
      <h1 class="font-bold text-xl tracking-wider">
        Meitō3D
      </h1>
      <USlideover
        title="Menu"
        :overlay="false"
      >
        <UButton
          color="primary"
          variant="ghost"
          size="xl"
          @click="isOpen = !isOpen"
        >
          <template #trailing>
            <UIcon
              name="i-heroicons-bars-2-solid"
              class="w-6 sm:w-8 h-6 sm:h-8"
            />
          </template>
        </UButton>

        <template #body>
          <UNavigationMenu
            orientation="vertical"
            color="primary"
            variant="link"
            :items="items"
            class="flex-1"
          />
        </template>
      </USlideover>
    </UContainer>
  </div>
</template>
