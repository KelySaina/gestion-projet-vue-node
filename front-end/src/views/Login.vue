<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 rounded-md">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-15 w-[80px]" src="/imgs/logo.png" alt="Project Manager" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-300">Email address</label>
          <div class="mt-2 relative">
            <font-awesome-icon :icon="['fas', 'envelope']" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input id="email" v-model="email" name="email" type="email" autocomplete="email" required 
                   class="block w-full pl-10 rounded-md border border-gray-600 py-1.5 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-gray-800 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-300">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2 relative">
            <font-awesome-icon :icon="['fas', 'lock']" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" name="password" autocomplete="current-password" required 
                   class="block w-full pl-10 pr-10 rounded-md border border-gray-600 py-1.5 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-gray-800 sm:text-sm sm:leading-6" />
            <button type="button" @click="togglePassword" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none">
              <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
            </button>
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>

      <p v-if="error" class="mt-4 text-center text-sm text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faEnvelope, faLock, faEye, faEyeSlash);

export default {
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const router = useRouter();
    const error = ref('');
    const showPassword = ref(false);

    const handleLogin = async () => {
      await authStore.login(email.value, password.value);
      if (authStore.error) {
        error.value = authStore.error;
      } else {
        if (authStore.user.role === 'admin') {
          router.push('/admin/landing');
        } else {
          router.push('/user');
        }
      }
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleSubmit = () => {
      handleLogin();
    };

    return { email, password, handleSubmit, error, showPassword, togglePassword };
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
