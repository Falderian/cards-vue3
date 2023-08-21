<script setup lang="ts">
import { PropType } from 'vue'
import { IDashboard } from '../../types/types'
import { formatDate } from '../../utils'

const { dashboard } = defineProps({
  dashboard: { type: Object as PropType<IDashboard>, required: true }
})
</script>

<template>
  <section class="dashboard">
    <h4>{{ dashboard.title }}</h4>
    <div class="info">
      <div>Tasks count: {{ dashboard.cards.length }}</div>
      <div>Created: {{ formatDate(dashboard.created_at) }}</div>
      <div>Updated: {{ formatDate(dashboard.updated_at) }}</div>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 15px 25px;
  width: fit-content;

  border-radius: 15px;
  background: #f6f6f6;
  font-size: 16px;

  cursor: pointer;
  user-select: none;

  .info {
    display: flex;
    flex-direction: column;

    &__item {
      border-radius: 17px;
      background: #e0e4ea;
    }
  }
}
</style>
