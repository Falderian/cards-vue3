<script setup lang="ts">
import { type PropType, Ref, InputHTMLAttributes } from 'vue'

type formType = {
  label: string
  ref: Ref<string>
}

const { form, options, selectName, selectItem } = defineProps({
  form: { type: Array as PropType<formType[]>, required: true },
  options: { type: Array as PropType<string[]> },
  selectName: { type: String },
  selectItem: { type: Function }
})

const handleSelect = (e: Event) => {
  selectItem?.((e!.target! as InputHTMLAttributes).value)
}
</script>
<template>
  <form class="form">
    <div v-for="input in form" :key="input.label" class="form__input">
      <label>{{ input.label }}</label>
      <input v-model="input.ref" />
    </div>
    <div v-if="selectItem">
      <span>{{ selectName }}</span>
      <select class="base-border" @change="handleSelect">
        <option v-for="option in options" :key="option">
          {{ option }}
        </option>
      </select>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  gap: 15px;
  padding: 0;
  border: none;

  &__item {
    width: 40%;
    display: flex;
    gap: 10px;
  }
}
</style>

<style lang="scss">
.vs__dropdown-toggle {
  background-color: white;
  border-radius: 15px;
}
</style>
