<script setup lang="ts">
import { reactive, computed } from 'vue'
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'

import type { IError, ILoginUser } from '../../types/types'
import { userStore } from '../../stores/user'
import userApi from '../../api/userApi'
import { notification } from '../../utils'

type IForm = { username: string; password: string }

const { cookies } = useCookies()
const router = useRouter()
const user = userStore()

const form = reactive({
  username: '',
  password: '',
  isLoading: false,
  error: ''
})

const errors = computed(() => {
  const isAnyFieldEmpty = Object.values(form).some((field) => field)
  return !isAnyFieldEmpty
})

const formInputs: { name: string; value: string }[] = [
  { name: 'Enter username', value: 'username' },
  { name: 'Enter password', value: 'password' }
]

const submit = async () => {
  form.error = ''
  form.isLoading = true

  try {
    const login: ILoginUser = await userApi.logIn({
      username: form.username,
      password: form.password
    })
    user.setUser({ username: form.username, id: login.userId, isLogined: true })

    cookies.set('userId', login.userId.toString())
    cookies.set('token', login.access_token)

    router.push({ name: 'Dashboards' })

    notification({ type: 'success', title: 'Signed in', text: 'You have been logined' })
  } catch (error) {
    let { message } = (error as AxiosError).response?.data as IError

    if (Array.isArray(message)) {
      message = message.join(', ')
    }
    form.error = message

    notification({ type: 'error', title: 'Error', text: message })
  } finally {
    form.isLoading = false
  }
}
</script>

<template>
  <div class="wrapper__form">
    <form class="form" @submit.prevent="submit">
      <div v-for="item in formInputs" class="form__input" :key="item.name">
        <label>{{ item.name }}</label>
        <input v-model="form[item.value as keyof IForm]" placeholder="Type here..." />
      </div>
      <div class="form__footer">
        <button type="submit" :class="['btn-submit', errors && 'disabled']">Login</button>

        <div v-if="form.isLoading" class="loading">Loading...</div>
        <Transition name="fade">
          <div v-if="form.error" class="error">{{ form.error }}</div>
        </Transition>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.wrapper__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
