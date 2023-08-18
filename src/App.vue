<script setup lang="ts">
import { useCookies } from 'vue3-cookies'
import { ref, onUpdated, watchEffect, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

import SideBar from '@/components/SideBar.vue'
import MainScreen from '@/components/MainScreen.vue'
import Header from '@/components/Header.vue'

const router = useRouter()
const { cookies } = useCookies()

const menuItems = computed<string[]>(() => {
  const isLoginedUser = !!cookies.get('token')
  return isLoginedUser ? ['Dashboards', 'LogOut'] : ['LogIn', 'SignIn']
})

const activeItem = ref(menuItems.value[0])

const switchItem = (item: string) => {
  if (item === 'LogOut') {
    cookies.remove('token')
    cookies.remove('userId')

    router.push({ name: 'LogIn' })
    return
  }
  activeItem.value = item
  router.push({ name: activeItem.value })
}
</script>

<template>
  <div class="wrapper base-font">
    <SideBar :menu-items="menuItems" :active-item="activeItem" :switch-item="switchItem" />
    <div class="wrapper__column">
      <Header />
      <MainScreen />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;

  width: 100%;
  height: 98vh;

  &__column {
    display: flex;
    flex-direction: column;

    width: 80%;
  }
}

.base-font {
  color: #000;
  font-family: Rubik;
  font-size: 18px;
  font-style: normal;
  line-height: 20px;
}
</style>
