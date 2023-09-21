<script setup lang="ts">
import { useCookies } from 'vue3-cookies'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ModalsContainer } from 'vue-final-modal'

import SideBar from './components/SideBar.vue'
import MainScreen from './components/MainScreen.vue'
import Header from './components/BaseHeader.vue'
import { userStore } from './stores/user'

const router = useRouter()
const { cookies } = useCookies()
const { user, clearUser } = userStore()

const menuItems = computed<string[]>(() => {
  return user.isLogined ? ['Dashboards', 'SignOut'] : ['SignIn', 'SignUp']
})

const activeItem = ref(menuItems.value[0])

const switchItem = (item: string) => {
  if (item === 'SignOut') {
    cookies.remove('token')
    cookies.remove('userId')

    clearUser()

    router.push({ name: 'SignIn' })
  } else {
    router.push({ name: item })
    activeItem.value = item
  }
}
</script>

<template>
  <div class="wrapper base-font">
    <ModalsContainer />
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
  height: 100%;

  overflow: hidden;

  &__column {
    display: flex;
    flex-direction: column;

    width: 100%;
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
