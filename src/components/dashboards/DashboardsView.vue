<script setup lang="ts">
import { onMounted } from 'vue'

import { userStore } from '../../stores/user'
import { dashboardsStore } from '../../stores/dashboards'

const { user } = userStore()
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
    <router-view></router-view>
  </section>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 15px;
}
</style>
