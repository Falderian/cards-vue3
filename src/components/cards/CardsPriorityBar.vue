<script lang="ts" setup>
import { useModal, useModalSlot } from 'vue-final-modal'
import { useSelectPriority } from '../../utils'
import ModalConfirm from '../modal/ModalConfirm.vue'
import { inject, type PropType } from 'vue'
import type { ICard } from '../../types/types'
import BaseForm from '../BaseForm.vue'
import cardsApi from '../../api/cardsApi'

const { card } = defineProps({
  card: { type: Object as PropType<ICard>, required: true }
})

const updateDashboard = inject('updateDashboard', () => {})

const { selectedOption, selectItem, selectName, options } = useSelectPriority(card.priority)

const updatePriority = async () => {
  const updateCardDto = {
    ...card,
    priority: selectedOption.value
  }
  await cardsApi.updateCard(updateCardDto)
}

const { open, close } = useModal({
  component: ModalConfirm,
  attrs: {
    title: 'Change the priority for the =' + `${card.title}`,
    async onConfirm() {
      await updatePriority()
      updateDashboard()
      close()
    }
  },
  slots: {
    default: useModalSlot({
      component: BaseForm,
      attrs: {
        options,
        selectName,
        selectItem,
        selectedItem: card.priority.toLowerCase()
      }
    })
  }
})
</script>

<template>
  <div :class="['priority', card.priority]" @click="open">{{ card.priority }}</div>
</template>

<style lang="scss">
.priority {
  padding: 1px 5px;
  height: fit-content;

  border-radius: 10px;
  color: white;
  text-transform: capitalize;

  transition: 0.5s;

  &:hover {
    transform: scale(1.2);
  }
}
</style>
