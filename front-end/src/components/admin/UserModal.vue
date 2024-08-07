<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Create User</h2>
        <form @submit.prevent="createUser">
          <div class="mb-4">
            <label class="block mb-1 font-semibold">Name</label>
            <input v-model="formData.name" type="text" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-semibold">Last Name</label>
            <input v-model="formData.lastname" type="text" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-semibold">Email</label>
            <input v-model="formData.email" type="email" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-semibold">Password</label>
            <input v-model="formData.password" type="password" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-semibold">Confirm Password</label>
            <input v-model="formData.confirmPassword" type="password" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-semibold">Role</label>
            <select v-model="formData.role" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700">Cancel</button>
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Create User</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserModal',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        formData: {
          name: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };
    },
    methods: {
      createUser() {
        if (this.formData.password !== this.formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        // Handle user creation logic here
        this.$emit('create-user', this.formData);
        this.closeModal();
      },
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  