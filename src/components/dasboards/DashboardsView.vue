<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { userStore } from '../../stores/user'
import DashboardsApi from '../../api/dashboardsApi'
import DashboardsScreen from './DashboardsScreen.vue'
import { dashboardsStore } from '../../stores/dashboards'

const user = userStore()
const dashboards = dashboardsStore()

onMounted(async () => {
  try {
    dashboards.getDashboards(user.id)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <section class="wrapper">
    <DashboardsScreen v-if="dashboards.dashboards.length" :dashboards="dashboards.dashboards" />
    <div v-else>There is no dashboards.</div>
  </section>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 15px;
}
</style>
