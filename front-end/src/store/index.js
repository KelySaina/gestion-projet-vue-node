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
      this.error = null;
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
          this.error = data.msg || 'Login failed';
        }
      } catch (error) {
        this.error = error.message || 'An unexpected error occurred';
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.error = null;
      Cookies.remove('user');
      Cookies.remove('token');
      window.location.href = '/';
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
          this.users = data;
        } else {
          this.error = 'Failed to fetch users';
        }
      } catch (error) {
        this.error = error.message || 'An unexpected error occurred';
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
          this.tasks = data;
        } else {
          this.error = 'Failed to fetch tasks';
        }
      } catch (error) {
        this.error = error.message || 'An unexpected error occurred';
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
          this.singleUser = data;
        } else {
          this.error = 'Failed to fetch user';
        }
      } catch (error) {
        this.error = error.message || 'An unexpected error occurred';
      }
    },
    async createUser(newUser) {
      try {
        const response = await fetch(`${API_URL}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${this.token}`
          },
          body: JSON.stringify(newUser)
        });

        const data = await response.json();

        if (response.ok) {
          this.users.push(data);
        } else {
          this.error = data.msg || 'Failed to create user';
        }
      } catch (error) {
        this.error = error.message || 'An unexpected error occurred';
      }
    },
    async deleteUser(userId) {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'X-Authorization': `${this.token}`
          }
        });

        if (response.ok) {
          this.users = this.users.filter(user => user.id !== userId);
        } else {
          const data = await response.json();
          this.error = data.msg || 'Failed to delete user';
        }
      } catch (error) {
        this.error = error.message || 'An unexpected error occurred';
      }
    }
  },
});
