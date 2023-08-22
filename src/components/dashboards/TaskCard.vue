<script lang="ts" setup>
import { PropType } from 'vue'
import { ICard } from '../../types/types'
import { formatDate } from '../../utils'

const { card } = defineProps({
  card: { type: Object as PropType<ICard>, required: true }
})
</script>

<template>
  <section class="card">
    <div class="card__header">
      <h5>{{ card.title }}</h5>
      <div :class="['card__priority', card.priority]">{{ card.priority }}</div>
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

  &__header {
    display: flex;
    gap: 5px;
  }
  &__priority {
    padding: 2px 5px;
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
