<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('/models/room.glb')
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[20, 10, 20]" />
    <OrbitControls />
    <Suspense>
      <primitive :object="scene" />
    </Suspense>
    <TresDirectionalLight
      :position="[0, 10, 5]"
      :intensity="1"
    />
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
