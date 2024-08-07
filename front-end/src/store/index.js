import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    error: null,
    users: [], // Store for all users
    tasks: [], // Store for all tasks
    singleUser: null,
  }),
  actions: {
    async login(email, password) {
      this.error = null; // Reset error state before making request
      try {
        const response = await fetch(`${API_URL}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          this.user = data.user;
          this.token = data.token;
          Cookies.set('user', JSON.stringify(data.user));
          Cookies.set('token', data.token);
        } else {
          this.error = data.msg || 'Login failed'; // Handle server errors
        }
      } catch (error) {
        this.error = error.message || 'An unexpected error occurred'; // Handle network or unexpected errors
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.error = null; // Reset error state on logout
      Cookies.remove('user');
      Cookies.remove('token');
      window.location.href = '/'; // Redirect to login page after logout
    },
    loadSession() {
      try {
        const userCookie = Cookies.get('user');
        const tokenCookie = Cookies.get('token');
        if (userCookie) {
          this.user = JSON.parse(userCookie);
        }
        if (tokenCookie) {
          this.token = tokenCookie;
        }
      } catch (error) {
        console.error('Error loading session from cookies', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await fetch(`${API_URL}/users`, {
          headers: {
            'X-Authorization': `${this.token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          this.users = data; // Assuming data.users contains the list of users
        } else {
          this.error = 'Failed to fetch users'; // Handle server errors
        }
      } catch (error) {
        this.error = error.message || 'An unexpected error occurred'; // Handle network or unexpected errors
      }
    },
    async fetchTasks() {
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          headers: {
            'X-Authorization': `${this.token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          this.tasks = data; // Assuming data.tasks contains the list of tasks
        } else {
          this.error = 'Failed to fetch tasks'; // Handle server errors
        }
      } catch (error) {
        this.error = error.message || 'An unexpected error occurred'; // Handle network or unexpected errors
      }
    },
    async fetchUserByID(userId) {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
          headers: {
            'X-Authorization': `${this.token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          this.singleUser = data; // Assuming data contains the list of tasks
        } else {
          this.error = 'Failed to fetch user'; // Handle server errors
        }
      } catch (error) {
        this.error = error.message || 'An unexpected error occurred'; // Handle network or unexpected errors
      }
    },
  },
});
