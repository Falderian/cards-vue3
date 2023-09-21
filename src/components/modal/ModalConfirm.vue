<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { Ref } from 'vue'

defineProps<{
  title?: string
  error?: Ref<string>
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content base-border"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="title">
      {{ title }}
    </h1>
    <slot />
    <button class="btn-submit" @click="emit('confirm')">Confirm</button>
    <div v-if="error" class="error">{{ error }}</div>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
}
.confirm-modal-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  height: fit-content;
  min-width: 40%;
  width: fit-content;
  padding: 20px;

  border: 0.5px solid rgba(183, 156, 156, 0.444);
}
.confirm-modal-content > * + * {
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}

.error {
  color: red;
}
</style>
