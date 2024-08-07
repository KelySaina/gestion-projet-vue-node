<template>
    <div class="p-8">
      <h2 class="text-2xl font-bold mb-4">Task Management</h2>
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Task</th>
            <th class="px-4 py-2">Description</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Owner</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td class="border px-4 py-2">{{ task.name }}</td>
            <td class="border px-4 py-2">{{ task.description }}</td>
            <td class="border px-4 py-2">{{ task.status }}</td>
            <td class="border px-4 py-2">{{ task.owner }}</td>
            <td class="border px-4 py-2">
              <button @click="editTask(task)" class="bg-blue-500 text-white px-2 py-1">Edit</button>
              <button @click="deleteTask(task.id)" class="bg-red-500 text-white px-2 py-1">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
import SideBar from './SideBar.vue';

  export default {
    name: 'TaskManagement',
    data() {
      return {
        tasks: [
          { id: 1, name: 'Task 1', description: 'Description 1', status: 'to do', owner: 'John Doe' },
          { id: 2, name: 'Task 2', description: 'Description 2', status: 'in progress', owner: 'Jane Doe' },
          // Add more tasks here
        ],
      };
    },
    methods: {
      editTask(task) {
        // Implement edit task functionality
      },
      deleteTask(id) {
        // Implement delete task functionality
      },
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  