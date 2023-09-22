<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'

import SideBar from './components/SideBar.vue'
import MainScreen from './components/MainScreen.vue'
import Header from './components/BaseHeader.vue'
</script>

<template>
  <div class="wrapper base-font">
    <ModalsContainer />
    <SideBar />
    <div class="wrapper__column">
      <Header />
      <MainScreen />
    </div>
  </div>
  <notifications :pauseOnHover="true" classes="notification vue-notification" />
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
.vue-notification-group {
  top: 1rem !important;
}

.base-font {
  color: #000;
  font-family: Rubik;
  font-size: 18px;
  font-style: normal;
  line-height: 20px;
}
</style>
