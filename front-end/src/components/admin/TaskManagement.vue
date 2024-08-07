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
      <button @click="isTaskModalVisible = true" class="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600">Add New Task</button>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name"
        class="bg-gray-800 text-white border border-gray-700 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Task Table or No Tasks Message -->
    <div class="overflow-y-auto h-[400px]">
      <div v-if="filteredTasks.length === 0" class="flex items-center justify-center w-full h-full">
        <p class="text-white">Tasks not found</p>
      </div>
      <table v-else class="w-full table-auto">
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
          <tr v-for="task in filteredTasks" :key="task.id">
            <td class="border px-4 py-2">{{ task.name }}</td>
            <td class="border px-4 py-2">{{ task.description }}</td>
            <td class="border px-4 py-2">
              <span 
                :class="{
                  'w-3 h-3 rounded-full inline-block mr-2': true,
                  'bg-green-500': task.status === 'completed',
                  'bg-blue-500': task.status === 'in progress',
                  'bg-yellow-500': task.status === 'to do'
                }"
              ></span>
              {{ task.status.charAt(0).toUpperCase() + task.status.slice(1) }}
            </td>
            
            <td class="border px-4 py-2">{{ getUserName(task.Pid_person) }}</td>
            <td class="border px-4 py-2">
              <button @click="editTask(task)" class="bg-blue-500 text-white px-2 py-1">Edit</button>
              <button @click="deleteTask(task.id)" class="bg-red-500 text-white px-2 py-1">Delete</button>
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

export default defineComponent({
  name: 'TaskManagement',
  components: {
    TaskModal,
    EditTaskModal
  },
  setup() {
    const authStore = useAuthStore();
    const isTaskModalVisible = ref(false);
    const isEditTaskModalVisible = ref(false);
    const searchQuery = ref('');
    const editTaskData = ref(null);

    onMounted(async () => {
      await authStore.fetchTasks();
      await authStore.fetchUsers();
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
      await authStore.fetchTasks(); // Refresh tasks after creation
      isTaskModalVisible.value = false;
    };

    const handleUpdateTask = async (updatedTask) => {
      await authStore.updateTask(updatedTask);
      await authStore.fetchTasks(); // Refresh tasks after update
      isEditTaskModalVisible.value = false;
    };

    const editTask = (task) => {
      fetchTaskData(task.id); // Fetch and populate the task data
    };

    const deleteTask = async (id) => {
      await authStore.deleteTask(id);
      await authStore.fetchTasks(); // Refresh tasks after deletion
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
    };
  }
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
