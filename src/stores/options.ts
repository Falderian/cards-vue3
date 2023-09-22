import { ref } from 'vue'
import { defineStore } from 'pinia'

export const optionsStore = defineStore('optionsStore', () => {
  const activeMenuItem = ref('')

  const setActiveItem = (item: string) => (activeMenuItem.value = item)

  return { activeMenuItem, setActiveItem }
})
