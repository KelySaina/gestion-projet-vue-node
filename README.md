# Gestion Projet Vue Node

A project management application using Vue.js for the front-end and Node.js for the back-end.

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/KelySaina/gestion-projet-vue-node.git
cd gestion-projet-vue-node
```

### 2. Backend Setup
```bash
cd back-end
npm install
```

### 3. Frontend Setup
In another terminal
```bash
cd /path/to/gestion-projet-vue-node
cd front-end
npm install
```

### 4. Environment Variables
Create `.env` files in both `back-end` and `front-end` directories according to .env.example

### 5. Create a database
Create a database with the same name as you specified in .env
After the database is created, migrate the database using sequelize:
```bash
cd /path/to/gestion-projet-vue-node
cd back-end
npm run migration
```

Seed the database with default Users and Tasks
```bash
npm run seed
```
## Usage

To start back-end:
```bash
npm start
```

To start front-end:
```bash
npm run dev
```
OU
```bash
npm run serve
```

Access the application at `http://localhost:5173`.

The default credentials are:
- For an `admin` user: `email` : `test.admin@project.management` | `password` : `admin`
- For an `user` user: `email` : `test.user@project.management` | `password` : `user`