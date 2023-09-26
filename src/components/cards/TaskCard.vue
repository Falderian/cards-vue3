<script lang="ts" setup>
import { useModal, useModalSlot } from 'vue-final-modal'
import { type PropType, ref } from 'vue'

import { type ICard } from '../../types/types'
import { errorNotification, formatDate, useSelectStatus } from '../../utils'
import ModalConfirm from '../modal/ModalConfirm.vue'
import cardsApi from '../../api/cardsApi'
import BaseForm from '../BaseForm.vue'
import CardsPriorityBar from './CardsPriorityBar.vue'
import EditIcon from '../icons/EditIcon.vue'

const { card, updateDashboard } = defineProps({
  card: { type: Object as PropType<ICard>, required: true },
  updateDashboard: { type: Function, required: true }
})

const { selectedOption, selectItem, selectName, options } = useSelectStatus(card.status)

const formInputs = [
  { label: 'Title of card', ref: ref(card.title) },
  { label: 'Content of card', ref: ref(card.content) }
]

const deleteCard = async (e: Event) => {
  e.preventDefault()
  try {
    await cardsApi.deleteCard(card.id)
    await updateDashboard()
    close()
    return false
  } catch (error) {
    errorNotification(error as Error)
  }
}

const { open, close } = useModal({
  component: ModalConfirm,
  attrs: {
    title: 'Edit card from ' + card.status + ' column with title = ' + `${card.title}`,
    async onConfirm() {
      try {
        const updateCardDto = {
          id: card.id,
          title: formInputs[0].ref.value,
          content: formInputs[1].ref.value,
          status: selectedOption.value
        }
        await cardsApi.updateCard(updateCardDto)
        close()
        await updateDashboard()
      } catch (error) {
        errorNotification(error as Error)
      }
    }
  },
  slots: {
    default: useModalSlot({
      component: BaseForm,
      attrs: {
        form: formInputs,
        button: {
          text: 'Delete card',
          onClick: deleteCard
        },
        options,
        selectName,
        selectItem,
        selectedItem: card.status
      }
    })
  }
})
</script>

<template>
  <section class="card">
    <div class="card__header">
      <h5 class="w-6">{{ card.title }}</h5>
      <CardsPriorityBar :card="card" />
      <EditIcon @click="open" />
    </div>
    <div class="card__info">
      <span class="stat">Content: </span>
      <span>{{ card.content }}</span>
      <span class="stat">Date added: </span>
      <span>{{ formatDate(card.created_at) }}</span>
      <span class="stat">Date updated: </span>
      <span>{{ formatDate(card.updated_at) }}</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card {
  padding: 15px;
  border-radius: 10px;
  background: #e0e4ea;
  font-size: 14px;

  transition: 0.5s;
  user-select: none;

  &:hover {
    background-color: rgba(161, 101, 101, 0.42);
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 0fr 20px;
    grid-template-rows: 1fr;
    gap: 5px;
  }

  &__info {
    display: grid;
    grid-template: repeat(3, 1fr) / 40% 1fr;

    span:nth-child(odd) {
      color: #6c6c6c;
    }
  }
  .low {
    background-color: #67cb65;
  }
  .medium {
    background-color: #ff9533;
  }
  .high {
    background-color: #e74444;
  }
}
</style>
