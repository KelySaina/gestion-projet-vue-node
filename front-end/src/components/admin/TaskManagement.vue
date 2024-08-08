<template>
  <div class="p-8 bg-gray-900 h-[500px] ml-12">
    <!-- Modals -->
    <TaskModal :isVisible="isTaskModalVisible" @close="isTaskModalVisible = false" @create-task="handleCreateTask" />
    <EditTaskModal 
      :isVisible="isEditTaskModalVisible" 
      :task="editTaskData" 
      :users="authStore.users" 
      @close="isEditTaskModalVisible = false" 
      @update-task="handleUpdateTask" 
    />

    <!-- Header Section -->
    <div class="flex items-center justify-between w-full mb-4">
      <button @click="isTaskModalVisible = true" class="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 flex items-center">
        <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" /> Add New Task
      </button>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search anything..."
        class="bg-gray-800 text-white border border-gray-700 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-[200px]"
      />
      <button @click="refreshData" class="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 flex items-center">
        <font-awesome-icon :icon="['fas', 'sync']" class="mr-2" /> Refresh
      </button>
    </div>

    <!-- Task Table or No Tasks Message -->
    <div class="overflow-y-auto h-[400px]">
      <div v-if="filteredTasks.length === 0" class="flex items-center justify-center w-full h-full">
        <p class="text-white">Tasks not found</p>
      </div>
      <table v-else class="w-full table-auto bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr class="bg-gray-700 text-left text-sm uppercase leading-normal">
            <th class="px-4 py-2 w-1/4">Task</th>
            <th class="px-4 py-2 w-1/3">Description</th>
            <th class="px-4 py-2 w-1/6">Status</th>
            <th class="px-4 py-2 w-1/5">Owner</th>
            <th class="px-4 py-2 text-center w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody class="text-sm font-normal">
          <tr v-for="task in filteredTasks" :key="task.id" class="border-b border-gray-700 hover:bg-gray-600">
            <td class="px-4 py-2 truncate">{{ task.name }}</td>
            <td class="px-4 py-2 truncate">{{ task.description }}</td>
            <td class="px-4 py-2">
              <span 
                :class="{
                  'w-3 h-3 rounded-full inline-block mr-2 align-middle': true,
                  'bg-green-500': task.status === 'completed',
                  'bg-blue-500': task.status === 'in progress',
                  'bg-yellow-500': task.status === 'to do'
                }"
              ></span>
              {{ task.status.charAt(0).toUpperCase() + task.status.slice(1) }}
            </td>
            <td class="px-4 py-2 truncate flex items-center">
              <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />
              {{ getUserName(task.Pid_person) }}
            </td>
            <td class="px-4 py-2 text-center">
              <button @click="editTask(task)" class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 inline-flex items-center">
                <font-awesome-icon :icon="['fas', 'edit']" class="mr-1" />
                Edit
              </button>
              <button @click="deleteTask(task.id)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 inline-flex items-center ml-2">
                <font-awesome-icon :icon="['fas', 'trash']" class="mr-1" />
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../store';
import TaskModal from './TaskModal.vue';
import EditTaskModal from './EditTaskModal.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faSync, faUser, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlus, faSync, faUser, faEdit, faTrash);

export default defineComponent({
  name: 'TaskManagement',
  components: {
    TaskModal,
    EditTaskModal,
    FontAwesomeIcon
  },
  setup() {
    const authStore = useAuthStore();
    const isTaskModalVisible = ref(false);
    const isEditTaskModalVisible = ref(false);
    const searchQuery = ref('');
    const editTaskData = ref(null);

    const fetchTasksAndUsers = async () => {
      await authStore.fetchTasks();
      await authStore.fetchUsers();
    };

    onMounted(async () => {
      await fetchTasksAndUsers();
    });

    const fetchTaskData = async (taskId) => {
      await authStore.fetchTaskByID(taskId);
      const task = authStore.singleTask;
      if (task) {
        editTaskData.value = { ...task }; // Populate the modal with task data
        isEditTaskModalVisible.value = true;
      }
    };

    const handleCreateTask = async (newTask) => {
      await authStore.createTask(newTask);
      await fetchTasksAndUsers(); // Refresh tasks after creation
      isTaskModalVisible.value = false;
    };

    const handleUpdateTask = async (updatedTask) => {
      await authStore.updateTask(updatedTask);
      await fetchTasksAndUsers(); // Refresh tasks after update
      isEditTaskModalVisible.value = false;
    };

    const editTask = (task) => {
      fetchTaskData(task.id); // Fetch and populate the task data
    };

    const deleteTask = async (id) => {
      await authStore.deleteTask(id);
      await fetchTasksAndUsers(); // Refresh tasks after deletion
    };

    const getUserName = (userId) => {
      const user = authStore.users.find(user => user.id === userId);
      return user ? `${user.name} ${user.lastname}` : 'Unknown';
    };

    const filteredTasks = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return authStore.tasks.filter(task =>
        task.name.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query) ||
        task.status.toLowerCase().includes(query) ||
        getUserName(task.Pid_person).toLowerCase().includes(query)
      );
    });

    const refreshData = async () => {
      await fetchTasksAndUsers(); // Refresh tasks and users
    };

    return {
      authStore,
      isTaskModalVisible,
      isEditTaskModalVisible,
      searchQuery,
      editTaskData,
      filteredTasks,
      handleCreateTask,
      handleUpdateTask,
      editTask,
      deleteTask,
      getUserName,
      refreshData,
    };
  }
});
</script>

<style scoped>
/* Additional custom styles for better UI */
table th, table td {
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px; /* Adjust this value based on your needs */
}
</style>
