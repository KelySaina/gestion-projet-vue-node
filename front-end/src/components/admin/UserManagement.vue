<template>
  <div class="p-8 bg-gray-900 h-[500px] ml-12">
    <!-- User Modals -->
    <UserModal :isVisible="isModalVisible" @close="isModalVisible = false" @create-user="handleCreateUser" />
    <EditUserModal :isVisible="isEditModalVisible" :user="editUserData" @close="isEditModalVisible = false" @update-user="handleUpdateUser" />

    <!-- Header Section -->
    <div class="flex items-center justify-between w-full mb-4">
      <button @click="isModalVisible = true" class="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600">Add New User</button>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name"
        class="bg-gray-800 text-white border border-gray-700 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button @click="refreshData" class="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600">Refresh</button>
    </div>

    <!-- User Cards or No Users Message -->
    <div class="overflow-y-auto h-[400px]">
      <div v-if="filteredUsers.length === 0" class="flex items-center justify-center w-full h-full">
        <p class="text-white">Users not found</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
        <div v-for="user in filteredUsers" :key="user.id" class="bg-gray-800 p-4 rounded-lg shadow-md text-white h-[250px] w-[300px]">
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
          <div class="flex justify-evenly">
            <button @click="editUser(user)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-[75px]">Edit</button>
            <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-[75px]">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../store';
import UserModal from './UserModal.vue';
import EditUserModal from './EditUserModal.vue';

export default defineComponent({
  name: 'UserManagement',
  components: {
    UserModal,
    EditUserModal
  },
  setup() {
    const authStore = useAuthStore();
    const isModalVisible = ref(false);
    const isEditModalVisible = ref(false);
    const searchQuery = ref('');
    const editUserData = ref(null);

    const fetchUsers = async () => {
      await authStore.fetchUsers();
    };

    onMounted(async () => {
      await fetchUsers();
    });

    const fetchUserData = async (userId) => {
      await authStore.fetchUserByID(userId);
      const user = authStore.singleUser;
      if (user) {
        editUserData.value = { ...user }; // Populate the modal with user data
        isEditModalVisible.value = true;
      }
    };

    const handleCreateUser = async (newUser) => {
      await authStore.createUser(newUser);
      await fetchUsers(); // Refresh users after creation
      isModalVisible.value = false;
    };

    const handleUpdateUser = async (updatedUser) => {
      await authStore.updateUser(updatedUser);
      await fetchUsers(); // Refresh users after update
      isEditModalVisible.value = false;
    };

    const editUser = (user) => {
      fetchUserData(user.id); // Fetch and populate the user data
    };

    const deleteUser = async (id) => {
      await authStore.deleteUser(id);
      await fetchUsers(); // Refresh users after deletion
    };

    const filteredUsers = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return authStore.users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.lastname.toLowerCase().includes(query)
      );
    });

    const refreshData = async () => {
      await fetchUsers(); // Refresh users
    };

    return {
      isModalVisible,
      isEditModalVisible,
      searchQuery,
      filteredUsers,
      handleCreateUser,
      handleUpdateUser,
      editUser,
      deleteUser,
      editUserData,
      refreshData, // Add this to the returned object
    };
  }
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
