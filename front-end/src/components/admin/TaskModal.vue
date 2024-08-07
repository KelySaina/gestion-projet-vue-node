<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
    <div class="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-xl font-bold mb-4">Create New Task</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-white">Task Name</label>
          <input v-model="task.name" id="name" type="text" class="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-800" required />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-white">Description</label>
          <textarea v-model="task.description" id="description" class="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-800" required></textarea>
        </div>
        <div class="mb-4">
          <label for="status" class="block text-sm font-medium text-white">Status</label>
          <select v-model="task.status" id="status" class="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-800" required>
            <option value="to do">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="owner" class="block text-sm font-medium text-white">Owner</label>
          <select v-model="task.Pid_person" id="owner" class="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-800" required>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} {{ user.lastname }}</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button @click="$emit('close')" type="button" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useAuthStore } from '../../store';

export default defineComponent({
  name: 'TaskModal',
  props: {
    isVisible: Boolean,
  },
  emits: ['close', 'create-task'],
  setup(props, { emit }) {
    const authStore = useAuthStore();
    const task = ref({
      name: '',
      description: '',
      status: 'to do',
      Pid_person: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const users = computed(() => authStore.users);

    const submitForm = async () => {
      emit('create-task', task.value);
      emit('close');
    };

    return {
      task,
      users,
      submitForm,
    };
  },
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
