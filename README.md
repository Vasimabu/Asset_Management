# Asset Management System

Asset Management System is a Node.js and Express.js REST API for managing employees, assets, asset categories, asset issuance, returns, and asset history.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Sequelize CLI
- dotenv

---

## Features

- Employee Management
- Asset Category Management
- Asset Management
- Issue Assets
- Return Assets
- Asset History
- Branch Management
- REST APIs

---

## Project Structure

```
asset-management/
│
├── config/
├── controllers/
├── middleware/
├── migrations/
├── models/
├── routes/
├── services/
├── seeders/
├── app.js
├── package.json
├── .env
└── README.md
```

---

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL
- Git

---

## Clone Repository

```bash
git clone https://github.com/Vasimabu/Asset_Management.git
cd Asset_Management
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=asset_management
DB_USER=postgres
DB_PASSWORD=your_password
```

---

## Database Setup

Create a PostgreSQL database.

```sql
CREATE DATABASE asset_management;
```

---

## Run Migrations

```bash
npx sequelize-cli db:migrate
```

---

## Start Development Server

```bash
npm run dev
```

or

```bash
nodemon app.js
```

---

## Start Production Server

```bash
npm start
```

---

## API Base URL

```
http://localhost:5000
```

---

## API Endpoints

### Employees

| Method | Endpoint |
|---------|----------|
| GET | /api/employees |
| POST | /api/employees |
| PUT | /api/employees/:id |
| DELETE | /api/employees/:id |

### Assets

| Method | Endpoint |
|---------|----------|
| GET | /api/assets |
| POST | /api/assets |
| PUT | /api/assets/:id |
| DELETE | /api/assets/:id |

### Asset Categories

| Method | Endpoint |
|---------|----------|
| GET | /api/asset-categories |
| POST | /api/asset-categories |
| PUT | /api/asset-categories/:id |
| DELETE | /api/asset-categories/:id |

---

## Running Tests

```bash
npm test
```

---

## Git Workflow

```bash
git pull origin main

git checkout -b feature/employee-module

git add .

git commit -m "Added employee module"

git push origin feature/employee-module
```

---

## Author

Vasim Abu

```

### If you're uploading this to GitHub

1. Create a file named `README.md` in the project root.
2. Paste the content above.
3. Save it.
4. Commit and push:

```bash
git add README.md
git commit -m "Add project README"
git push origin main
```

As your project grows, you can also add:
- Screenshots of the API or UI
- Database ER diagram
- Postman collection
- Swagger/OpenAPI documentation
- Deployment instructions
- License information

These additions make the repository much more useful for other developers and interviewers.
