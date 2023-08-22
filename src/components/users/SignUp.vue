<script setup lang="ts">
import { reactive, computed } from 'vue'
import { AxiosError } from 'axios'
import { IError } from '../../types/types'
import userApi from '../../api/userApi'

type form = { username: string; password: string; passwordConfirm: string }

const form = reactive({
  username: '',
  password: '',
  passwordConfirm: '',
  isLoading: false,
  error: ''
})

const formInputs: { name: string; value: string }[] = [
  { name: 'Enter username', value: 'username' },
  { name: 'Enter password', value: 'password' },
  { name: 'Confirm password', value: 'passwordConfirm' }
]

const errors = computed(() => {
  const isAnyFieldEmpty = Object.values(form).some((field) => field)
  const isPasswordMatch = form.password === form.passwordConfirm
  return !isAnyFieldEmpty || !isPasswordMatch
})

const submit = async () => {
  form.error = ''
  form.isLoading = true
  try {
    await userApi.signUp({ username: form.username, password: form.password })
  } catch (error) {
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
        <button type="submit" :class="['btn', errors && 'disabled']">Submit</button>

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

  .form {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;

    height: 50%;
    width: 80%;
    padding: 20px;

    border: 0.5px solid rgba(183, 156, 156, 0.444);

    &__input {
      display: flex;
      flex-direction: column;
      gap: 10px;

      input {
        padding: 10px;
        outline: none;

        border-radius: 20px;
        border: 1px solid #ebebeb;
        background: #fff;

        transition: 1s;
      }

      input:focus {
        border: 1px solid darkorchid;
      }
    }

    &__footer {
      display: flex;

      .loading {
        margin: auto;
        width: 80%;
      }

      .error {
        margin: auto;
        width: 80%;
        color: red;

        &::first-letter {
          text-transform: capitalize;
        }
      }
    }
  }

  .btn {
    height: 40px;
    width: 100px;

    color: white;

    border-radius: 15px;
    background: #67cb65;
    border: 1px solid transparent;
    transition: 0.5s;

    &:hover {
      outline: 1px solid chocolate;
    }
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
