<template>
  <div class="h-[500px] bg-gray-800 text-white w-70 rounded-md p-4">
    <div class="p-3">
      <h1 class="text-2xl font-bold">Hi, {{ name }}</h1>
    </div>
    <nav class="flex flex-col h-full">
      <ul>
        <li class="p-4 hover:border border-white-500 rounded-md">
          <router-link to="/admin/landing">Home</router-link>
        </li>
        <li class="p-4 hover:border border-white-500 rounded-md">
          <router-link to="/admin/users">User Management</router-link>
        </li>
        <li class="p-4 hover:border border-white-500 rounded-md">
          <router-link to="/admin/tasks">Task Management</router-link>
        </li>
      </ul>
      <div>
        <button @click="logout" class="w-full p-4 text-left hover:border border-red-500 rounded-md">
          Logout
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useAuthStore } from '../../store';

export default {
  name: 'Sidebar',
  setup() {
    const authStore = useAuthStore();

    const logout = () => {
      authStore.logout(); // Implement your logout logic here
    };

    const name = ref('');

    // Fetch user data when component mounts
    onMounted(async () => {
      if (authStore.user) {
        await authStore.fetchUserByID(authStore.user.id);
      }
    });

    // Watch for changes in singleUser and update name
    watch(
      () => authStore.singleUser,
      (newSingleUser) => {
        if (newSingleUser) {
          name.value = `${newSingleUser.name} ${newSingleUser.lastname}`;
        }
      },
      { immediate: true } // Run immediately on setup
    );

    return {
      logout, name
    };
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
