<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import dashboardsApi from '@/api/dashboardsApi'
import { formatDate } from '../../utils'

const route = useRoute()
const dashboardId = ref(0)
const dashboard = ref()

onMounted(async () => {
  dashboardId.value = +route.params.id

  dashboard.value = await dashboardsApi.getDashboard(dashboardId.value)
})
</script>

<template>
  <section v-if="dashboard">
    <h2>{{ dashboard.title }}</h2>
    <div class="header">
      <div class="stats base-border">
        <span>Date added:</span>
        <span>{{ formatDate(dashboard.created_at) }}</span>
        <span>Date updated:</span>
        <span class="stats__item">{{ formatDate(dashboard.created_at) }}</span>
      </div>
      <div class="description base-border">{{ dashboard.description }}</div>
      <div class="tasks">
        <span>ToDo</span>
        <span>{{ dashboard.cards }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  gap: 25px;

  .stats {
    display: grid;
    grid-template: 1fr 1fr / 1fr 1fr;
    align-items: center;
    justify-items: start;

    padding: 10px;
    gap: 10px;

    font-size: 16px;

    span:nth-child(odd) {
      font-weight: 600;
    }
  }

  .description {
    padding: 10px;
  }
}
</style>
