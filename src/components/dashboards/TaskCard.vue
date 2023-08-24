<script lang="ts" setup>
import { useModal, useModalSlot } from 'vue-final-modal'
import { PropType } from 'vue'
import { ICard } from '../../types/types'
import { formatDate } from '../../utils'
import RemoveIcon from '../icons/RemoveIcon.vue'
import ModalConfirm from '../modal/ModalConfirm.vue'
import cardsApi from '../../api/cardsApi'

const { card } = defineProps({
  card: { type: Object as PropType<ICard>, required: true }
})

const { open, close } = useModal({
  component: ModalConfirm,
  attrs: {
    title: 'Delete card from ' + card.status + ' column.',
    async onConfirm() {
      try {
        await cardsApi.deleteCard(card.id)
        close()
      } catch (error) {
        console.log(error)
      }
    }
  },
  slots: {
    default: `Are you sure you want to delete card with title = ${card.title} ?`
  }
})
</script>

<template>
  <section class="card">
    <div class="card__header">
      <h5 class="w-6">{{ card.title }}</h5>
      <div :class="['card__priority', card.priority]">{{ card.priority }}</div>
      <RemoveIcon @click="open" />
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

  &__priority {
    padding: 1px 5px;
    border-radius: 10px;
    color: white;
    text-transform: capitalize;
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
