<template>
  <div class="pl-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-dark border border-gray-800 shadow-md rounded-lg p-6 transition-shadow duration-300 ease-in-out hover:shadow-colored-hover flex justify-between items-center">
        <div>
          <h3 class="text-7xl font-bold">{{ usersCount }}</h3>
          <p class="text-xl mt-2">Users</p>
          <router-link to="/admin/users" class="text-blue-500 mt-4 block">Manage Users ></router-link>
        </div>
        <font-awesome-icon :icon="['fas', 'users']" class="text-8xl mr-4" />
      </div>
      
      <div class="bg-dark border border-gray-800 shadow-md rounded-lg p-6 border-blue transition-shadow duration-300 ease-in-out hover:shadow-colored-hover flex justify-between items-center">
        <div>
          <h3 class="text-7xl font-bold">{{ tasksCount }}</h3>
          <p class="text-xl mt-2">Tasks</p>
          <router-link to="/admin/tasks" class="text-blue-500 mt-4 block">Manage Tasks ></router-link>
        </div>
        <font-awesome-icon :icon="['fas', 'tasks']" class="text-8xl mr-4" />
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers, faTasks } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faUsers, faTasks);

export default {
  name: 'AdminLanding',
  components: {
    TaskStatusChart,
    FontAwesomeIcon,
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

<style scoped>
/* Add custom styles if needed */
</style>
