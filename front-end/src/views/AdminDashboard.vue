<template>
  <div class="flex h-[500px]">
    <SideBar />
    <div class="flex-1 h-[500px] w-[800px]">
      <router-view></router-view> <!-- Content area -->
    </div>
  </div>
</template>

<script>
import SideBar from '../components/admin/SideBar.vue';
import { useAuthStore } from '../store';

export default {
  name: 'AdminDashboard',
  components: {
    SideBar
  },
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
