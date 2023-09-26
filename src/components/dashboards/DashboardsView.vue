<script setup lang="ts">
import { onMounted } from 'vue'

import { userStore } from '../../stores/user'
import { dashboardsStore } from '../../stores/dashboards'

const { user } = userStore()
const dashboards = dashboardsStore()

onMounted(async () => {
  dashboards.getDashboards(user.id)
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
  margin: auto;

  align-items: center;
  padding: 15px;
  width: 100%;
  height: 100%;
}
</style>
