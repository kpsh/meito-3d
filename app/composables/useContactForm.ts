import * as z from 'zod'

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  email: z.email('Invalid email address.').min(1, 'Email is required.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
})

type Schema = z.output<typeof schema>

export function useContactForm() {
  const toast = useToast()
  const loading = ref(false)

  const state = reactive<Partial<Schema>>({
    name: undefined,
    email: undefined,
    message: undefined,
  })

  const onSubmit = async () => {
    loading.value = true
    try {
      // fake api call
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast.add({
        title: 'Message Sent!',
        description: 'Thanks for reaching out. We will get back to you shortly.',
        icon: 'i-heroicons-check-circle-solid',
        color: 'success',
      })

      Object.assign(state, {
        name: undefined,
        email: undefined,
        message: undefined,
      })
    }
    catch (e) {
      toast.add({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        icon: 'i-heroicons-exclamation-triangle-solid',
        color: 'error',
      })
      console.error('Contact form submission error:', e)
    }
    finally {
      loading.value = false
    }
  }

  return {
    schema,
    state,
    loading,
    onSubmit,
  }
}
