<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-gray-800 shadow-md rounded-lg p-6">
    <!-- Pie Chart -->
    <div class="relative h-[250px]">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
    <div class="relative h-[250px]">
      Latest activities
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'; // Import Pie chart
import { defineComponent } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'; // Import components needed for Pie chart

ChartJS.register(Title, Tooltip, Legend, ArcElement); // Register components needed for Pie chart

export default defineComponent({
  name: 'TaskStatusChart',
  components: {
    Pie // Add Pie component
  },
  data() {
    return {
      chartData: {
        labels: ['To Do', 'In Progress', 'Completed'],
        datasets: [
          {
            data: [10, 5, 15], // Replace with your task data
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
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
          }
        }
      }
    }
  }
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
