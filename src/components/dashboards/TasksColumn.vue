<script lang="ts" setup>
import AddIcon from '../icons/AddIcon.vue'
import TaskCard from './TaskCard.vue'
import { PropType } from 'vue'
import { ICard } from '../../types/types'
import { taskStatuses } from '../../utils'

const { cards, status } = defineProps({
  cards: { type: Array as PropType<ICard[]>, required: true },
  status: { type: String, required: true }
})
</script>

<template>
  <section class="column base-border">
    <div class="column__header">
      <h4 class="f-16">{{ taskStatuses[status] }}</h4>
      <AddIcon />
    </div>
    <div class="column__cards">
      <TaskCard v-for="card in cards" :key="card.title" :card="card" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.column {
  padding: 10px;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__cards {
    display: flex;
    flex-direction: column;

    gap: 10px;
  }
}
</style>
