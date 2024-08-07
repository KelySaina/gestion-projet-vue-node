<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 rounded-md">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <h1 class="text-3xl font-bold text-white">403 Forbidden</h1>
        <p class="mt-4 text-gray-400">You do not have permission to access this page.</p>
        <router-link to="/" class="mt-6 text-indigo-400 hover:text-indigo-300">Go to Login</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Forbidden'
  };
  </script>
  