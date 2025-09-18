export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: [
          'rounded-3xl font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75',
          'transition-colors',
        ],
      },
    },
    colors: {
      primary: 'orange',
      neutral: 'stone',
    },
  },
})
