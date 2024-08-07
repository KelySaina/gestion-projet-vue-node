<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();
    return { router };
  },
});
</script>
