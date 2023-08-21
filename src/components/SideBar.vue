<script setup lang="ts">
import Logo from './icons/logo.vue'
import { type PropType, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  menuItems: { type: Array as PropType<string[]>, required: true },
  activeItem: { type: String, required: true },
  switchItem: { type: Function, required: true }
})

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  await router.isReady()
  props.switchItem(route.name)
})

const isActive = (item: string) => {
  return props.activeItem === item
}
</script>

<template>
  <div class="sidebar">
    <Logo />
    <ul class="menu">
      <li
        v-for="item in menuItems"
        :class="['item', isActive(item) && 'active']"
        @click="switchItem(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style langs="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;

  width: 20%;
  padding: 125px 105px;

  background-color: #f8f8fb;

  .menu {
    display: flex;
    flex-direction: column;

    padding: 0;
    margin-top: 120px;
    gap: 30px;
    width: fit-content;

    list-style-type: none;

    .active {
      color: darkorchid;
      font-weight: 500;
    }

    .item {
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        text-decoration: dotted;
        color: orangered;
      }
    }
  }
}
</style>
