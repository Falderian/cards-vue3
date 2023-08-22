<script setup lang="ts">
import { reactive, computed } from 'vue'
import { AxiosError } from 'axios'
import { useCookies } from 'vue3-cookies'
import { IError, ILoginUser } from '../../types/types'
import { useRouter } from 'vue-router'
import { userStore } from '../../stores/user'
import userApi from '../../api/userApi'

type form = { username: string; password: string }

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

const { cookies } = useCookies()
const router = useRouter()
const user = userStore()

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

    cookies.set('userId', login.userId.toString())
    cookies.set('token', login.access_token)

    user.setUserId(login.userId)
    user.setUserLogin(true)

    router.push({ name: 'Dashboards' })
  } catch (error) {
    console.log(error)

    let message = ((error as AxiosError).response?.data as IError).message

    if (Array.isArray(message)) {
      message = message.join(', ')
    }
    form.error = message
  } finally {
    form.isLoading = false
  }
}
</script>

<template>
  <div class="wrapper__form">
    <form class="form" @submit.prevent="submit">
      <div v-for="item in formInputs" class="form__input">
        <label>{{ item.name }}</label>
        <input v-model="form[item.value as keyof form]" placeholder="Type here..." />
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

  .btn-submit {
    padding: 0 20px;
  }
}
</style>