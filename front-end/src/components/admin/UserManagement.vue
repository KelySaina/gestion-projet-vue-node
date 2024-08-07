<template>
    <div class="flex h-screen">
      <div class="flex-1 p-8">
        <h2 class="text-2xl font-bold mb-4">User Management</h2>
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Role</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="border px-4 py-2">{{ user.name }}</td>
              <td class="border px-4 py-2">{{ user.email }}</td>
              <td class="border px-4 py-2">{{ user.role }}</td>
              <td class="border px-4 py-2">
                <button @click="editUser(user)" class="bg-blue-500 text-white px-2 py-1">Edit</button>
                <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-2 py-1">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import SideBar from './SideBar.vue';
  
  export default {
    name: 'UserManagement',
    data() {
      return {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
          { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'user' },
          // Add more users here
        ],
      };
    },
    methods: {
      editUser(user) {
        // Implement edit user functionality
      },
      deleteUser(id) {
        // Implement delete user functionality
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  