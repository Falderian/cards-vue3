<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'

import AddIcon from '../icons/AddIcon.vue'
import TaskCard from './TaskCard.vue'
import { ICard, ITaskStatuses } from '../../types/types'
import { taskStatuses } from '../../utils'
import CardsApi from '../../api/cardsApi'
import ModalConfirm from '../modal/ModalConfirm.vue'
import BaseForm from '../BaseForm.vue'
import { userStore } from '../../stores/user'

const { cards, status, dashboardId, setLoading, updateDashboard } = defineProps({
  cards: { type: Array as PropType<ICard[]>, required: true },
  status: { type: String, required: true },
  dashboardId: { type: Number, required: true },
  setLoading: { type: Function, required: true },
  updateDashboard: { type: Function, required: true }
})

const { user } = userStore()
const currCards = ref(cards)

const selectItem = (item: string) => {
  selectedOption.value = item
}

const selectName = 'Select a priority for the card'
const options = ['low', 'medium', 'high']

const selectedOption = ref(options[0])

const formInputs = [
  { label: 'Title of card', ref: ref('') },
  { label: 'Description of card', ref: ref('') }
]

const { open, close } = useModal({
  component: ModalConfirm,
  attrs: {
    title: 'Enter the description for the new task to the ' + status + ' column',
    async onConfirm() {
      try {
        setLoading(true)
        const newCard = {
          userId: user.id,
          title: formInputs[0].ref.value,
          content: formInputs[1].ref.value,
          priority: selectedOption.value,
          status,
          dashboardId
        }
        await CardsApi.createCard(newCard)
        close()
        await updateDashboard()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  },
  slots: {
    default: useModalSlot({
      component: BaseForm,
      attrs: {
        form: formInputs,
        options,
        selectName,
        selectItem
      }
    })
  }
})
</script>

<template>
  <section class="column base-border">
    <div class="column__header">
      <h4 class="f-16 w-6">{{ (taskStatuses as ITaskStatuses)[status] }}</h4>
      <AddIcon @click="open" />
    </div>
    <div class="column__cards">
      <TaskCard
        v-for="card in currCards"
        :key="card.title"
        :card="card"
        :update-dashboard="updateDashboard"
        :cards="currCards"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;

  padding: 10px;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__cards {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    overflow: auto;
    height: calc(100vh - 350px);

    gap: 10px;
  }
}
</style>
