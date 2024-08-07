<template>
  <div class="pl-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-dark border border-gray-800 shadow-md rounded-lg p-6 transition-shadow duration-300 ease-in-out hover:shadow-colored-hover">
        <h3 class="text-5xl font-bold">{{ usersCount }}</h3>
        <p class="text-xl mt-2">users</p>
        <router-link to="/admin/users" class="text-blue-500 mt-4 block">Manage Users ></router-link>
      </div>
      
      <div class="bg-dark border border-gray-800 shadow-md rounded-lg p-6 border-blue transition-shadow duration-300 ease-in-out hover:shadow-colored-hover">
        <h3 class="text-5xl font-bold">{{ tasksCount }}</h3>
        <p class="text-xl mt-2">tasks</p>
        <router-link to="/admin/tasks" class="text-blue-500 mt-4 block">Manage Tasks ></router-link>
      </div>
      
      <!-- Add more summary cards as needed -->
    </div>
    
      <TaskStatusChart />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useAuthStore } from '../../store'; // Adjust the path as necessary
import TaskStatusChart from './TaskStatusChart.vue';

export default {
  name: 'AdminLanding',
  components: {
    TaskStatusChart,
  },
  setup() {
    const authStore = useAuthStore();

    // Define reactive references for counts
    const usersCount = ref(0);
    const tasksCount = ref(0);

    // Fetch users and tasks
    const fetchData = async () => {
      await authStore.fetchUsers();
      await authStore.fetchTasks();
    };

    fetchData();

    // Watch for changes in the users and tasks arrays
    watch(() => authStore.users, (newValue) => {
      usersCount.value = newValue.length;
    });

    watch(() => authStore.tasks, (newValue) => {
      tasksCount.value = newValue.length;
    });

    return {
      usersCount,
      tasksCount,
    };
  },
};
</script>

