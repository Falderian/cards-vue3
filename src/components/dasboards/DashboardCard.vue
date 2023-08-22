<script setup lang="ts">
import { PropType } from 'vue'
import { IDashboard } from '../../types/types'
import { formatDate } from '../../utils'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const { dashboard } = defineProps({
  dashboard: { type: Object as PropType<IDashboard>, required: true }
})

const handleClick = (id: number) => {
  router.push({ name: 'dashboard', params: { id } })
}
</script>

<template>
  <section class="dashboard base-border" @click="handleClick(dashboard.id)">
    <h4>{{ dashboard.title }}</h4>
    <div class="info">
      <div>Tasks count: {{ dashboard.cards.length }}</div>
      <div>Created: {{ formatDate(dashboard.created_at) }}</div>
      <div>Updated: {{ formatDate(dashboard.updated_at) }}</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 15px 25px;
  width: fit-content;

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
