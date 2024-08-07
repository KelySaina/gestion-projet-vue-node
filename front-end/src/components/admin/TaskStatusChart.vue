<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-gray-800 shadow-md rounded-lg p-6">
    <!-- Pie Chart -->
    <div class="relative h-[250px]">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
    <!-- Latest Activities -->
    <div class="relative h-[250px] overflow-y-hidden p-5">
      <h2 class="font-bold text-center pb-5 mt-[-12px]">Latest Activities</h2>
      <ul class="text-white activity-li grid grid-cols-1">
        <li v-for="activity in latestActivities" :key="activity.id" class="mb-2">
          <div class="font-semibold"><p>{{ activity.userName }} - {{ activity.role }}</p></div>
          <div>[ {{ activity.taskName }} ]</div>
          <div class="text-sm">{{ activity.timestamp }}</div>
          <div>Status: <span class="font-medium">{{ activity.taskStatus }}</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'; // Import Pie chart
import { defineComponent, computed } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'; // Import components needed for Pie chart
import { useAuthStore } from '../../store';

ChartJS.register(Title, Tooltip, Legend, ArcElement); // Register components needed for Pie chart

export default defineComponent({
  name: 'TaskStatusChart',
  components: {
    Pie 
  },
  setup() {
    const authStore = useAuthStore();

    // Compute task counts by status
    const toDoCount = computed(() => authStore.tasks.filter(task => task.status === 'to do').length);
    const inProgressCount = computed(() => authStore.tasks.filter(task => task.status === 'in progress').length);
    const completedCount = computed(() => authStore.tasks.filter(task => task.status === 'completed').length);

    const chartData = {
      labels: ['To Do', 'In Progress', 'Completed'],
      datasets: [
        {
          data: [toDoCount.value, inProgressCount.value, completedCount.value],
          backgroundColor: ['#FFEB3B', '#2196F3', '#4CAF50'], // Updated colors
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Task Status',
          color: '#eee',
          font: {
            size: 17
          }
        },
        legend: {
          position: 'bottom',
          align: 'start',
          labels: {
            color: '#fff', // Set legend text color to white
          },
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}`;
            }
          },
          backgroundColor: '#333', // Set tooltip background color
          titleColor: '#fff', // Set tooltip title color
        },
      }
    };

    // Format timestamp
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    // Compute latest activities
    const latestActivities = computed(() => {
      return authStore.tasks
        .map(task => {
          const user = authStore.users.find(user => user.id === task.Pid_person);
          return {
            id: task.id,
            userName: user ? `${user.name} ${user.lastname}` : 'Deleted', // Default to 'Unknown' if user not found
            taskStatus: task.status.charAt(0).toUpperCase() + task.status.slice(1),
            taskName: task.name,
            role: user ? user.role : 'Deleted', // Default to 'Unknown' if user not found
            timestamp: formatTimestamp(task.updatedAt) // Format timestamp
          };
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by timestamp descending
        .slice(0, 2); // Get the top 4 latest activities
    });

    return {
      chartData,
      chartOptions,
      latestActivities
    };
  }
});
</script>

<style scoped>
.activity-li {
  list-style: circle;
}
</style>
