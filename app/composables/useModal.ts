import HowItWorks from '~/components/content/HowItWorks.vue'
import ModalWrapper from '~/components/ModalWrapper.vue'

export const modalContentMap = {
  'how-it-works': HowItWorks,
} satisfies Record<string, Component>

export type ModalContentType = keyof typeof modalContentMap

export interface ModalProps {
  title: string
  description: string
  fullscreen?: boolean
  width?: string
}

export const useModal = () => {
  const overlay = useOverlay()

  const openModal = (componentName: ModalContentType, props: Partial<ModalProps> = {}) => {
    const component = modalContentMap[componentName]
    if (component) {
      const instance = overlay.create(ModalWrapper)
      instance.open({
        contentComponent: markRaw(component),
        modalProps: props,
      })
    }
    else {
      console.error(`Component "${componentName}" not found in modal map.`)
    }
  }

  const closeModal = () => {
    overlay.closeAll()
  }

  return {
    openModal,
    closeModal,
  }
}
