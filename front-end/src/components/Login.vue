<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../store';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const error = ref('');

    const handleLogin = async () => {
      await authStore.login(email.value, password.value);
      if (authStore.error) {
        error.value = authStore.error;
      } else {
        console.log(authStore.token)
      }
    };

    return { email, password, handleLogin, error };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.error {
  color: red;
}
</style>
