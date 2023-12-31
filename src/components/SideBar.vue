<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { useCookies } from 'vue3-cookies'

import Logo from './icons/BaseLogo.vue'
import { optionsStore } from '../stores/options'
import { userStore } from '../stores/user'
import { notification } from '../utils'

const { cookies } = useCookies()
const storeUser = userStore()
const storeOptions = optionsStore()

const route = useRoute()
const router = useRouter()

const menuItems = computed<string[]>(() => {
  return storeUser.user.isLogined ? ['Dashboards', 'SignOut'] : ['SignIn', 'SignUp']
})

const switchItem = (item: string) => {
  if (item === 'SignOut') {
    cookies.remove('token')
    cookies.remove('userId')

    storeUser.$reset()

    router.push({ name: 'SignIn' })
    notification({ type: 'warn', text: 'Your have been sign out', title: 'Signed out' })
  } else {
    router.push({ name: item })
    storeOptions.activeMenuItem = item
  }
}

watch(
  () => route.name,
  async () => {
    await router.isReady()
    switchItem(route.name!.toString())
  }
)

const isActive = (item: string) => {
  return storeOptions.activeMenuItem === item || item.toLowerCase().includes('dashboard')
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
