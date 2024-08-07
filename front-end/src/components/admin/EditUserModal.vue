<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Edit User</h2>
        <form @submit.prevent="updateUser">
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
            <label class="block mb-1 font-semibold">Role</label>
            <select v-model="formData.role" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, watch } from 'vue';
  
  export default defineComponent({
    name: 'EditUserModal',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      user: {
        type: Object,
        default: () => null
      }
    },
    data() {
      return {
        formData: { ...this.user }
      };
    },
    watch: {
      user: {
        handler(newUser) {
          this.formData = { ...newUser };
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      async updateUser() {
        this.$emit('update-user', this.formData);
        this.closeModal();
      },
      closeModal() {
        this.$emit('close');
      }
    }
  });
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  