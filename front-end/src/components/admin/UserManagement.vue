<template>
  <div class="p-8 bg-gray-900 h-[500px] ml-12">
    <!-- User Modal -->
    <UserModal :isVisible="isModalVisible" @close="isModalVisible = false" @create-user="handleCreateUser" />

    <!-- Header Section -->
    <div class="flex items-center justify-between w-full mb-4">
      <button @click="isModalVisible = true" class="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600">Add New User</button>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name"
        class="bg-gray-800 text-white border border-gray-700 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- User Cards or No Users Message -->
    <div class="overflow-y-auto h-[400px]">
      <div v-if="filteredUsers.length === 0" class="flex items-center justify-center w-full h-full">
        <p class="text-white">Users not found</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
        <div v-for="user in filteredUsers" :key="user.id" class="bg-gray-800 p-4 rounded-lg shadow-md text-white h-[250px] w-[250px]">
          <div class="flex items-center mb-4">
            <div class="text-xl font-semibold">
              <p>{{ user.name }} {{ user.lastname }}</p>
            </div>
          </div>
          <div class="mb-2">
            <div class="font-medium">Email:</div>
            <div>{{ user.email }}</div>
          </div>
          <div class="mb-4">
            <div class="font-medium">Role:</div>
            <div>{{ user.role }}</div>
          </div>
          <div class="flex justify-between">
            <button @click="editUser(user)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
            <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../store';
import UserModal from './UserModal.vue';

export default {
  name: 'UserManagement',
  components: {
    UserModal
  },
  setup() {
    const authStore = useAuthStore();
    const isModalVisible = ref(false);
    const searchQuery = ref('');
    
    // Fetch users when the component is mounted
    onMounted(async () => {
      await authStore.fetchUsers();
    });

    const filteredUsers = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return authStore.users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.lastname.toLowerCase().includes(query)
      );
    });

    const handleCreateUser = async (newUser) => {
      await authStore.createUser(newUser);
      await authStore.fetchUsers(); // Refresh users after creating
      isModalVisible.value = false;
    };

    const deleteUser = async (userId) => {
      await authStore.deleteUser(userId);
      await authStore.fetchUsers(); // Refresh users after deleting
    };

    const editUser = (user) => {
      // Implement edit user functionality
    };

    return {
      isModalVisible,
      searchQuery,
      filteredUsers,
      handleCreateUser,
      deleteUser,
      editUser
    };
  }
};
</script>

<style scoped>
</style>
