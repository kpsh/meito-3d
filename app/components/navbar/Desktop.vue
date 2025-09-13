<script lang="ts" setup>
const route = useRoute()

const { y } = useScroll(window)
const isScrolled = computed(() => y.value > 0)

const items = computed(() => [
  [
    {
      label: 'Meitō 3D',
      to: '/',
      slot: 'logo',
      active: false,
    },
  ],
  [
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
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/kpsh/meito-3d',
      target: '_blank',
    },
  ],
])

const { gsap } = useGsap()

const navbarRef = ref()

onMounted(() => {
  gsap.from(navbarRef.value, {
    opacity: 0,
    y: -20,
    duration: 1,
    ease: 'power2.out',
  })
})
</script>

<template>
  <div
    ref="navbarRef"
    :class="{
      'bg-elevated shadow-md': isScrolled,
      'bg-transparent': !isScrolled,
    }"
    class="py-4 fixed w-full top-0 z-20 transition-colors delay-300"
  >
    <UContainer>
      <UNavigationMenu
        color="primary"
        variant="link"
        :items="items"
        class="flex-1"
      >
        <template #logo>
          <h1 class="font-bold text-xl tracking-wider">
            Meitō3D
          </h1>
        </template>
      </UNavigationMenu>
    </UContainer>
  </div>
</template>
