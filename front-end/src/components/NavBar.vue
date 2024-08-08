<template>
  <nav class="bg-gray-900 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-bold flex items-center">
        <img class="mx-auto h-10" src="/imgs/logo.png" alt="Project Manager" />
        <p>Project Manager - [ {{ userName }} ]</p>
      </div>
      <button
        @click="logout"
        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition flex items-center"
      >
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-2" />
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faProjectDiagram, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faProjectDiagram, faSignOutAlt);

export default {
  name: 'Navbar',
  components: {
    FontAwesomeIcon
  },
  setup() {
    const authStore = useAuthStore();
    const userName = ref('');

    const logout = () => {
      authStore.logout();
      window.location.href = '/'; // Redirect to login page after logout
    };

    const loadUserName = async () => {
      if (authStore.user) {
        await authStore.fetchUserByID(authStore.user.id);
        userName.value = authStore.singleUser ? `${authStore.singleUser.name} ${authStore.singleUser.lastname}` : 'Guest';
      }
    };

    onMounted(() => {
      loadUserName(); // Load the user's name when the component mounts
    });

    return { logout, userName: computed(() => userName.value) };
  },
};
</script>

<style scoped>
nav {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

button:hover {
  background-color: #c53030; /* Darker red on hover */
}

button .fa-sign-out-alt {
  font-size: 1rem;
}

.container {
  max-width: 1200px;
}
</style>
