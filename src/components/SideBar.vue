<script setup lang="ts">
import Logo from './icons/BaseLogo.vue'
import { type PropType, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  menuItems: { type: Array as PropType<string[]>, required: true },
  activeItem: { type: String, required: true },
  switchItem: { type: Function, required: true }
})

const route = useRoute()
const router = useRouter()

watch(
  () => route.name,
  async () => {
    await router.isReady()
    props.switchItem(route.name)
  }
)

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
        :class="['item f-16 w-6', isActive(item) && 'active']"
        @click="switchItem(item)"
        :key="item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;

  width: cals(20% - 120);
  padding: 125px 55px;

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
        scale: 1.3;
      }
    }
  }
}
</style>
