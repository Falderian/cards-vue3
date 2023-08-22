<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import dashboardsApi from '@/api/dashboardsApi'
import { formatDate, taskStatuses } from '../../utils'
import { IDashboard } from '@/types/types'
import TasksColumn from './TasksColumn.vue'

const route = useRoute()
const dashboardId = ref(0)
const dashboard: IDashboard = ref<IDashboard>(null)
onMounted(async () => {
  dashboardId.value = +route.params.id

  dashboard.value = await dashboardsApi.getDashboard(dashboardId.value)
})
</script>

<template>
  <section v-if="dashboard">
    <h2 class="f-20">{{ dashboard.title }}</h2>
    <div class="header">
      <div class="stats base-border">
        <span>Date added:</span>
        <span>{{ formatDate(dashboard.created_at) }}</span>
        <span>Date updated:</span>
        <span class="stats__item">{{ formatDate(dashboard.created_at) }}</span>
      </div>
      <div class="description base-border">{{ dashboard.description }}</div>
      <div class="tasks base-border">
        <div class="status">
          <span>All tasks:</span>
          <span>{{ dashboard.tasksCount }}</span>
        </div>

        <div v-for="(cards, status) in dashboard.cards" :key="status" class="status">
          <span>{{ taskStatuses[status] }}</span>
          <span>{{ cards.length }}</span>
        </div>
      </div>
    </div>
    <div class="table">
      <TasksColumn
        v-for="(cards, status) in dashboard.cards"
        :cards="cards"
        :status="status.toString()"
        :key="status"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  grid-template-rows: 1fr;
  gap: 25px;
  margin-top: 20px;

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

  .tasks {
    padding: 10px;

    span:nth-child(odd) {
      font-weight: 600;
    }
    .status {
      display: grid;
      grid-template-columns: 1fr 20%;
      grid-template-rows: repeat(5, 20%);

      border-bottom: 1px dotted black;
    }
  }

  .description {
    padding: 10px;
  }
}

.table {
  display: grid;
  grid-template: 1fr / repeat(4, 1fr);
  margin-top: 25px;
  gap: 25px;
}
</style>
