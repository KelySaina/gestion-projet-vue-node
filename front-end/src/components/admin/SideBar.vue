<template>
  <div class="h-[500px] bg-gray-900 text-white w-70 rounded-md p-4">
    <div class="p-3">
      <h1 class="text-2xl font-bold">Hi, {{ name }}</h1>
    </div>
    <nav class="flex flex-col h-full">
      <ul>
        <router-link to="/admin/landing">
          <li class="p-2 hover:border-l-4 border-white-500 flex items-center">
          <font-awesome-icon :icon="['fas', 'home']" class="mr-2" />
          Home
        </li>
        </router-link>
        <router-link to="/admin/users">
          <li class="p-2 hover:border-l-4 border-white-500 flex items-center">
            <font-awesome-icon :icon="['fas', 'users']" class="mr-2" />
            User Management
          </li>
        </router-link>
        <router-link to="/admin/tasks">
          <li class="p-2 hover:border-l-4 border-white-500 flex items-center">
            <font-awesome-icon :icon="['fas', 'tasks']" class="mr-2" />
            Task Management
          </li>
        </router-link>
        <li>
          <button @click="logout" class="w-full p-2 text-left hover:border-l-4 border-white-500 flex items-center">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-2" />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useAuthStore } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUsers, faTasks, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faHome, faUsers, faTasks, faSignOutAlt);

export default {
  name: 'Sidebar',
  components: {
    FontAwesomeIcon,
  },
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
