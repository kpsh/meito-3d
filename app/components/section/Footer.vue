<script lang="ts" setup>
const currentYear = useDateFormat(useNow(), 'YYYY')

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'About Us', to: '/#about' },
      { label: 'Collection', to: '/collection' },
      { label: 'Contact', to: '/#contact' },
    ],
  },
  {
    title: 'Collection',
    links: [
      { label: 'Katana', to: '/collection?c=katana' },
      { label: 'Wakizashi', to: '/collection?c=wakizashi' },
      { label: 'Tanto', to: '/collection?c=tanto' },
      { label: 'Custom', to: '/collection?c=custom' },
      { label: 'Kitchen Knives', to: '/collection?c=knives' },
      { label: 'Accessories', to: '/collection?c=accessories' },
    ],
  },
]
</script>

<template>
  <footer class="bg-elevated border-t border-default rounded-t-3xl py-10">
    <UContainer class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <h2 class="text-xl font-bold tracking-wide mb-4">
          Meitō3D
        </h2>
        <p class="text-sm text-dimmed">
          Precision-crafted Japanese swords/knives brought to life in 3D. Explore our collection and star the repo if you like it.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-8">
        <div
          v-for="(section, index) in footerLinks"
          :key="index"
        >
          <h3 class="text-sm font-semibold mb-2 text-highlighted">
            {{ section.title }}
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(link, idx) in section.links"
              :key="idx"
            >
              <NuxtLink
                :to="link.to"
                class="text-sm text-toned hover:text-primary transition duration-150"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-span-1 md:col-span-full flex flex-col items-center space-y-4">
        <UButton
          icon="i-simple-icons-github"
          label="GitHub Repo"
          variant="subtle"
          color="neutral"
          to="https://kpsh.github.io/meito-3d"
          target="_blank"
          aria-label="GitHub Repo"
        />
        <p class="text-sm text-dimmed">
          © {{ currentYear }} Meitō3D. All rights reserved.
        </p>
      </div>
    </UContainer>
  </footer>
</template>
