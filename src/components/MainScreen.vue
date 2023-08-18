<script setup lang="ts"></script>

<template>
  <div class="container">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;
}
</style>
