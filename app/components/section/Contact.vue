<script lang="ts" setup>
const { schema, state, loading, onSubmit } = useContactForm()

const socialLinks = [
  { name: 'X (Twitter)', icon: 'i-simple-icons-x', url: '#' },
  { name: 'GitHub', icon: 'i-simple-icons-github', url: '#' },
  { name: 'Instagram', icon: 'i-simple-icons-instagram', url: '#' },
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', url: '#' },
]
</script>

<template>
  <section>
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <ReusableHeadline
        title="Get in Touch"
        description="We'd love to hear from you. Send us a message or find us on social media."
        size="xl"
      />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        <UCard variant="outline">
          <UForm
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
          >
            <UFormField
              label="Your Name"
              name="name"
              size="xl"
              required
            >
              <UInput
                v-model="state.name"
                placeholder="John Doe"
                icon="i-heroicons-user"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Email"
              name="email"
              size="xl"
              required
            >
              <UInput
                v-model="state.email"
                placeholder="you@example.com"
                icon="i-heroicons-envelope"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Message"
              name="message"
              size="xl"
              required
            >
              <UTextarea
                v-model="state.message"
                placeholder="Your message..."
                :rows="15"
                class="w-full"
              />
            </UFormField>

            <div class="flex justify-end pt-4">
              <UButton
                :loading="loading"
                type="submit"
                size="xl"
                label="Send Message"
                color="primary"
                trailing-icon="i-heroicons-paper-airplane"
              />
            </div>
          </UForm>
        </UCard>

        <UCard
          variant="outline"
          class="flex flex-col gap-8 md:gap-12"
        >
          <div class="aspect-square overflow-hidden rounded-3xl shadow-xl shadow-primary-500/20">
            <iframe
              class="w-full h-full"
              src="https://www.openstreetmap.org/export/embed.html?bbox=139.64721679687503%2C35.562953482850745%2C139.88067626953128%2C35.79776624517103&amp;layer=mapnik"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>

          <div class="mt-8 flex gap-4 flex-wrap">
            <UButton
              v-for="link in socialLinks"
              :key="link.name"
              :to="link.url"
              target="_blank"
              variant="subtle"
              color="neutral"
              :label="link.name"
              size="xl"
              :icon="link.icon"
              :aria-label="`Follow us on ${link.name}`"
            />
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>
