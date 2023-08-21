<script setup lang="ts">
import { type PropType } from 'vue'

type formType = {
  label: string
  ref: string
}

defineProps({
  form: { type: Array as PropType<formType[]>, required: true }
})
</script>
<template>
  <form class="form">
    <div v-for="input in form" class="form__input">
      <label>{{ input.label }}</label>
      <input v-model="input.ref" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  border: none;
  padding: 0;
  &__item {
    display: flex;
    gap: 10px;
  }
}
</style>
