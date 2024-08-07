<template>
    <div v-if="isVisible" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div class="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Edit Task</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-white">Task Name</label>
            <input v-model="editTask.name" id="name" type="text" class="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-800" required />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-white">Description</label>
            <textarea v-model="editTask.description" id="description" class="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-800" required></textarea>
          </div>
          <div class="mb-4">
            <label for="status" class="block text-sm font-medium text-white">Status</label>
            <select v-model="editTask.status" id="status" class="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-800" required>
              <option value="to do">To Do</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="owner" class="block text-sm font-medium text-white">Owner</label>
            <select v-model="editTask.Pid_person" id="owner" class="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-800" required>
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} {{user.lastname}}</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button @click="$emit('close')" type="button" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">Save</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, toRefs } from 'vue';
  
  export default defineComponent({
    name: 'EditTaskModal',
    props: {
      isVisible: Boolean,
      task: Object,
      users: Array
    },
    emits: ['close', 'update-task'],
    setup(props, { emit }) {
      const { task } = toRefs(props);
      
      const submitForm = async () => {
        await emit('update-task', task.value);
        emit('close');
      };
  
      return {
        editTask: task,
        submitForm
      };
    }
  });
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  