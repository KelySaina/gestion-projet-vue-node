<template>
  <NavBar />
  <div class="bg-gray-900 text-white p-6 w-[900px] h-[450px]">
    <p class="flex justify-evenly items-center mb-2">
      <span 
        class="flex justify-evenly items-center ml-2 cursor-pointer" 
        @click="filterByStatus('completed')">
        <span class="w-3 h-3 rounded-full bg-green-500 inline-block m-2"></span><b>{{ countTasks('completed') }} Completed</b>
      </span>
      <span 
        class="flex justify-evenly items-center ml-2 cursor-pointer" 
        @click="filterByStatus('to do')">
        <span class="w-3 h-3 rounded-full bg-yellow-500 inline-block m-2"></span><b>{{ countTasks('to do') }} To do</b>
      </span>
      <span 
        class="flex justify-evenly items-center ml-2 cursor-pointer" 
        @click="filterByStatus('in progress')">
        <span class="w-3 h-3 rounded-full bg-blue-500 inline-block m-2"></span><b>{{ countTasks('in progress') }} In progress</b>
      </span>
      <span 
        class="cursor-pointer" 
        @click="filterByStatus('all')"> 
        Total: {{tasks.length}} tasks
      </span>
    </p>
    
    <div v-if="filteredTasks.length > 0" class="bg-gray-800 p-2 rounded-md shadow-lg h-[350px]">
      <div class="grid gap-4 overflow-y-auto h-[335px]">
        <div v-for="task in filteredTasks" :key="task.id" class="p-4 bg-gray-700 rounded-md shadow-md h-[120px] overflow-y-auto">
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
          <div class="flex justify-between items-center">
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
    </div>
    
    <div v-else class="bg-gray-800 p-4 rounded-md shadow-lg mt-4">
      <p class="text-gray-300">No {{ typeTask }} tasks found.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../store';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'HomeUser',
  components: {
    NavBar
  },
  setup() {
    const authStore = useAuthStore();
    const tasks = ref([]);
    const selectedStatus = ref('all'); // Track the selected status
    const typeTask = ref(''); // Track the type of task for the "No tasks found" message

    const loadTasks = async () => {
      try {
        await authStore.fetchTasksByUserId(authStore.user.id); // Fetch tasks for the logged-in user
        tasks.value = authStore.userTasks; // Update local tasks with fetched data
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const countTasks = (status) => {
      return tasks.value.filter(task => task.status === status).length;
    }

    const updateTaskStatus = async (taskId, newStatus) => {
      try {
        await authStore.updateTaskStatus(taskId, newStatus); // Update the task status
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    };

    const filterByStatus = (status) => {
      typeTask.value = status === 'all' ? '' : `"${status.charAt(0).toUpperCase() + status.slice(1)}"`; // Update typeTask based on selected status
      selectedStatus.value = status; // Update selected status when a span is clicked
    };

    const filteredTasks = computed(() => {
      if (selectedStatus.value === 'all') {
        return tasks.value; // Return all tasks if 'Total' is clicked
      }
      return tasks.value.filter(task => task.status === selectedStatus.value); // Filter tasks based on selected status
    });

    onMounted(() => {
      if (authStore.user) {
        loadTasks(); // Load tasks when the component mounts
      }
    });

    return { tasks, countTasks, updateTaskStatus, filterByStatus, filteredTasks, typeTask };
  },
};
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
