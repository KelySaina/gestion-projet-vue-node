<template>
  <NavBar />
  <div class="bg-gray-900 text-white p-6 w-[900px] h-[450px]">
    
    <div v-if="tasks.length > 0" class="bg-gray-800 p-2 rounded-md shadow-lg">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        <div v-for="task in tasks" :key="task.id" class="p-4 bg-gray-700 rounded-md shadow-md">
          <h3 class="text-xl font-semibold flex justify-between items-center">
            <p>{{ task.name }}</p>
            <span 
              :class="{
                'w-3 h-3 rounded-full': true,
                'bg-green-500': task.status === 'completed',
                'bg-blue-500': task.status === 'in progress',
                'bg-yellow-500': task.status === 'to do'
              }"
              class="inline-block ml-2"
            ></span>
          </h3>
          
          <p class="text-gray-300 mb-2">{{ task.description }}</p>
          <p class="text-gray-400 mb-2">Status:
            <select v-model="task.status" @change="updateTaskStatus(task.id, task.status)" class="bg-gray-600 text-white rounded-md p-2">
              <option value="to do">To Do</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
        </p>
        </div>
      </div>
    </div>
    
    <div v-else class="bg-gray-800 p-4 rounded-md shadow-lg mt-4">
      <p class="text-gray-300">No tasks found.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../store';
import NavBar from '../components/NavBar.vue';


export default {
  name: 'HomeUser',
  components :{
    NavBar
  },
  setup() {
    const authStore = useAuthStore();
    const tasks = ref([]);

    const loadTasks = async () => {
      try {
        await authStore.fetchTasksByUserId(authStore.user.id); // Fetch tasks for the logged-in user
        tasks.value = authStore.userTasks; // Update local tasks with fetched data
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
      try {
        await authStore.updateTaskStatus(taskId, newStatus); // Update the task status
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    };

    onMounted(() => {
      if (authStore.user) {
        loadTasks(); // Load tasks when the component mounts
      }
    });

    return { tasks, updateTaskStatus };
  },
};
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
