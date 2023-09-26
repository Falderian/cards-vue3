<script setup lang="ts">
import { ref } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'

import DashboardCard from './DashboardCard.vue'
import ModalConfirm from '../modal/ModalConfirm.vue'
import BaseForm from '../BaseForm.vue'
import { userStore } from '../../stores/user'
import { dashboardsStore } from '../../stores/dashboards'

const { user } = userStore()
const dashboards = dashboardsStore()

const formInputs = [{ label: 'Enter title of dashboard', ref: ref('') }]

const { open, close } = useModal({
  component: ModalConfirm,
  attrs: {
    title: 'Create dashboard',
    async onConfirm() {
      await dashboards.createDashboard({ title: formInputs[0].ref.value, userId: user.id })
      close()
    }
  },
  slots: {
    default: useModalSlot({
      component: BaseForm,
      attrs: {
        form: formInputs
      }
    })
  }
})
</script>

<template>
  <button @click="open" class="btn-create">Create dashboard</button>
  <div>Dashboards:</div>
  <div class="dashboards">
    <DashboardCard
      v-for="dashboard in dashboards.dashboards"
      :dashboard="dashboard"
      :key="dashboard.id"
    />
  </div>
</template>

<style scoped>
.btn-create {
  align-self: flex-start;
  margin-bottom: 10px;
}
.dashboards {
  display: flex;
  flex-wrap: wrap;

  padding: 20px 0px;
  gap: 20px;
}
</style>
