<script setup lang="ts">
import { type PropType, Ref, InputHTMLAttributes } from 'vue'

type formType = {
  label: string
  ref: Ref<string>
}

const { form, options, selectName, selectItem, selectedItem } = defineProps({
  form: { type: Array as PropType<formType[]>, required: true },
  options: { type: Array as PropType<string[]> },
  selectName: { type: String },
  selectItem: { type: Function },
  button: { type: Object },
  selectedItem: { type: String }
})

const handleSelect = (e: Event) => {
  selectItem?.((e!.target! as InputHTMLAttributes).value)
}

const isOptionDefault = (option: string) => {
  return option === selectedItem
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
        <option v-for="option in options" :key="option" :selected="isOptionDefault(option)">
          {{ option }}
        </option>
      </select>
    </div>
  </form>
  <button v-if="button" @click="button.onClick" class="btn-submit btn-rmv">
    {{ button.text }}
  </button>
</template>

<style lang="scss" scoped>
.btn-rmv {
  background-color: red;
}
.form {
  display: flex;
  gap: 15px;
  padding: 0;
  width: 100%;

  border: none;

  &__input {
    width: 100%;
  }

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
