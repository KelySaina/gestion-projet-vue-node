<template>
  <div>
    <h1>User Page</h1>
    <!-- Add content for the home page here -->
    <button @click="logout" class="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500">
      Logout
    </button>
  </div>
</template>

<script>
import { useAuthStore } from '../store';

export default {
  name: 'HomeUser',
  setup() {
    const authStore = useAuthStore();

    const logout = () => {
      authStore.logout();
      window.location.href = '/'; // Redirect to login page after logout
    };

    return { logout };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
