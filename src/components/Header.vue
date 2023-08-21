<script setup lang="ts">
import UserAvatar from './icons/UserAvatar.vue'
</script>
<template>
  <div class="header">
    <div contenteditable="true" placeholder="Searc..." class="input"></div>
    <UserAvatar />
    <span>UserName</span>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;

  justify-content: space-between;
  align-items: center;

  padding: 10px 40px;

  box-shadow: 1px 2px 11px 0px rgba(148, 148, 148, 0.25);

  .input {
    width: 80%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ebebeb;
    background: #fff;

    outline: none;
    transition: 0.5s;

    &:focus {
      outline: 1px solid chocolate;
    }
  }
}
</style>
