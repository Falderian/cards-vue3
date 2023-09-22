<script setup lang="ts">
import { PropType } from 'vue'
import { useRouter } from 'vue-router'

import { IDashboard } from '../../types/types'
import { formatDate } from '../../utils'

const router = useRouter()

const { dashboard } = defineProps({
  dashboard: { type: Object as PropType<IDashboard>, required: true }
})

const handleClick = (id: number) => {
  router.push({ name: 'Dashboard', params: { id } })
}
</script>

<template>
  <section class="dashboard base-border" @click="handleClick(dashboard.id)">
    <h4 class="w-6 f-16">{{ dashboard.title }}</h4>
    <div class="info">
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
  border: 1px dotted transparent;

  transition: all 0.5s;

  &:hover {
    box-shadow: 0px 0px 10px 1px rgba(34, 60, 80, 0.3);
  }

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
