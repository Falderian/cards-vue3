<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import dashboardsApi from '@/api/dashboardsApi'
import { formatDate, taskStatuses } from '../../utils'
import { IDashboard } from '@/types/types'
import TasksColumn from './TasksColumn.vue'
import EditIcon from '../icons/EditIcon.vue'
import { useModal, useModalSlot } from 'vue-final-modal'
import ModalConfirm from '../modal/ModalConfirm.vue'
import BaseForm from '../BaseForm.vue'

const route = useRoute()
const isLoading = ref(true)
let dashboard: IDashboard = reactive<IDashboard>({})

const formInputs = [{ label: 'Enter description of dashboard', ref: ref('') }]

onMounted(() => {
  updateDashboard()
})

const updateDashboard = async () => {
  dashboard = await dashboardsApi.getDashboard(+route.params.id)
  isLoading.value = false
}

const setLoading = (state: boolean) => {
  isLoading.value = state
}

const { open, close } = useModal({
  component: ModalConfirm,
  attrs: {
    title: 'Update dashboards description',
    async onConfirm() {
      try {
        isLoading.value = true
        const dashboardToUpdate = {
          description: formInputs[0].ref.value,
          id: dashboard.id,
          title: dashboard.title
        }
        await dashboardsApi.updateDashboard(dashboardToUpdate)
        dashboard.title = dashboardToUpdate.title
        dashboard.description = dashboardToUpdate.description
        close()
      } catch (error) {
        console.log(error)
      } finally {
        isLoading.value = false
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
  <section v-if="!isLoading">
    <h2 class="f-20">{{ dashboard.title }}</h2>
    <div class="header">
      <div class="stats base-border">
        <span>Date added:</span>
        <span>{{ formatDate(dashboard.created_at) }}</span>
        <span>Date updated:</span>
        <span class="stats__item">{{ formatDate(dashboard.created_at) }}</span>
      </div>
      <div class="description base-border">
        <span>{{ dashboard.description }}</span>
        <span @click="() => open()"><EditIcon /></span>
      </div>
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
        :dashboardId="dashboard.id"
        :cards="cards"
        :status="status.toString()"
        :key="status"
        :set-loading="setLoading"
        :update-dashboard="updateDashboard"
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
    display: flex;
    justify-content: space-between;

    padding: 10px;

    span:nth-child(2) {
      height: fit-content;
    }
  }
}

.table {
  display: grid;
  grid-template: 1fr / repeat(4, 1fr);
  margin-top: 25px;
  gap: 25px;
}
</style>
