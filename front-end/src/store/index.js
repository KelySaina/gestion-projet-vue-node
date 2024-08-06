// store/index.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    error: null,
  }),
  actions: {
    async login(email, password) {
      try {
        // Replace with your API endpoint
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          this.user = data.user;
          this.token = data.token;
          this.error = null;
        } else {
          this.error = data.message;
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
