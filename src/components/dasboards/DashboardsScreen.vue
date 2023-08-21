<script setup lang="ts">
import { PropType, ref } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'
import { AxiosError } from 'axios'

import Dashboard from './Dashboard.vue'
import { IDashboard } from '../../types/types'
import ModalConfirm from '../modal/ModalConfirm.vue'
import BaseForm from '../BaseForm.vue'
import { IError } from '../../types/types'
import { userStore } from '@/stores/user'
import { dashboardsStore } from '../../stores/dashboards'

const props = defineProps({
  dashboards: { type: Array as PropType<IDashboard[]>, required: true }
})

const user = userStore()
const dashboards = dashboardsStore()

const formError = ref('')

const formInputs = [{ label: 'Enter title of dashboard', ref: ref('') }]

const { open, close } = useModal({
  component: ModalConfirm,
  attrs: {
    title: 'Create dashboard',
    error: formError,
    async onConfirm() {
      try {
        formError.value = ''
        await dashboards.createDashboard({ title: formInputs[0].ref.value, userId: user.id })
        close()
      } catch (error) {
        formError.value = ((error as AxiosError).response?.data as IError).message as string
      }
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
  <button @click="() => open()" class="btn-create">Create dashboard</button>
  <div>Dashboards:</div>
  <div class="dashboards">
    <Dashboard v-for="dashboard in dashboards.dashboards" :dashboard="dashboard" />
  </div>
</template>

<style scoped>
.btn-create {
  align-self: flex-start;
  margin-bottom: 10px;
}
.dashboards {
  display: flex;
  padding: 20px 0px;
  gap: 20px;
}
</style>
