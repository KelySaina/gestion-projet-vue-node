<template>
    <nav class="bg-gray-900 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-2xl font-bold">
          Project Manager - [ {{ userName }} ]
        </div>
        <button
          @click="logout"
          class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { useAuthStore } from '../store';
  
  export default {
    name: 'Navbar',
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
  /* Add any additional styles if needed */
  </style>
  