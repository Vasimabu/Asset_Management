# 🚀 Asset Management System

A full-stack Asset Management System built with **Node.js, Express.js, PostgreSQL, and Sequelize ORM** to efficiently manage employees, company assets, asset allocation, returns, stock tracking, and asset history.

---

## 📌 Features

### 👨‍💼 Employee Management
- Create Employee
- Update Employee
- Delete Employee
- Search Employees
- Employee Details

### 🏢 Branch Management
- Create Branch
- Update Branch
- Delete Branch
- View Branch List

### 📦 Asset Category Management
- Create Asset Category
- Update Asset Category
- Delete Asset Category

### 💻 Asset Management
- Add Assets
- Edit Assets
- Delete Assets
- Search Assets
- Asset Availability Status

### 📊 Stock Management
- Available Assets
- Issued Assets
- Returned Assets
- Scrapped Assets

### 🔄 Asset Issue
- Issue Asset to Employee
- Prevent Duplicate Issue
- Track Issue Date

### ↩️ Asset Return
- Return Issued Assets
- Update Asset Status
- Store Return Date

### 📝 Asset History
- Complete Asset Lifecycle
- Purchase
- Issue
- Return
- Scrap
- Search Asset History

### 📖 REST APIs

All modules are exposed through RESTful APIs.

### 📄 Swagger API Documentation

Interactive API documentation available using Swagger UI.

```
http://localhost:3005/api-docs
```

Swagger JSON

```
http://localhost:3005/api-docs.json
```

---

# 🛠 Tech Stack

| Technology | Version |
|------------|----------|
| Node.js | 18+ |
| Express.js | Latest |
| PostgreSQL | Latest |
| Sequelize ORM | Latest |
| Swagger UI Express | Latest |
| OpenAPI | 3.0 |
| dotenv | Latest |

---

# 📁 Project Structure

```
asset-management
│
├── config/
├── controller/
├── migrations/
├── models/
├── public/
│   ├── css/
│   └── js/
├── routes/
├── service/
├── views/
│   ├── assets/
│   ├── employee/
│   ├── category/
│   ├── stock/
│   └── layouts/
├── swagger.js
├── app.js
├── package.json
├── .env
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Vasimabu/Asset_Management.git
```

```bash
cd Asset_Management
```

---

## Install Dependencies

```bash
npm install
```

---

# 🔧 Environment Variables

Create a `.env` file in the project root.

```env
PORT=3005

DB_HOST=localhost
DB_PORT=5432
DB_NAME=asset_management
DB_USER=postgres
DB_PASSWORD=your_password
```

---

# 🗄 Database Setup

Create PostgreSQL Database

```sql
CREATE DATABASE asset_management;
```

Run Migrations

```bash
npx sequelize-cli db:migrate
```

---

# ▶️ Run Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 📚 API Documentation

Open Swagger UI

```
http://localhost:3005/api-docs
```

OpenAPI JSON

```
http://localhost:3005/api-docs.json
```

---

# 🌐 REST API Endpoints

## Employees

| Method | Endpoint |
|---------|----------|
| GET | /api/employees |
| GET | /api/employees/:id |
| POST | /api/employees |
| PUT | /api/employees/:id |
| DELETE | /api/employees/:id |

---

## Branches

| Method | Endpoint |
|---------|----------|
| GET | /api/branches |
| POST | /api/branches |
| PUT | /api/branches/:id |
| DELETE | /api/branches/:id |

---

## Asset Categories

| Method | Endpoint |
|---------|----------|
| GET | /api/asset-categories |
| POST | /api/asset-categories |
| PUT | /api/asset-categories/:id |
| DELETE | /api/asset-categories/:id |

---

## Assets

| Method | Endpoint |
|---------|----------|
| GET | /api/assets |
| POST | /api/assets |
| PUT | /api/assets/:id |
| DELETE | /api/assets/:id |

---

## Stock

| Method | Endpoint |
|---------|----------|
| GET | /api/stocks |

---

## Asset Issue

| Method | Endpoint |
|---------|----------|
| POST | /api/asset-issues |

---

## Asset Return

| Method | Endpoint |
|---------|----------|
| POST | /api/asset-returns |

---

## Asset History

| Method | Endpoint |
|---------|----------|
| GET | /api/asset-history |
| GET | /api/asset-history/:assetId |

---

# 📸 Screenshots

### Dashboard

(Add Screenshot Here)

### Swagger UI

(Add Screenshot Here)

### Employee Module

(Add Screenshot Here)

### Asset Module

(Add Screenshot Here)

---

# 🔄 Git Workflow

```bash
git clone <repository-url>

git checkout -b feature/module-name

git add .

git commit -m "Implemented feature"

git push origin feature/module-name
```

---

# 👨‍💻 Author

**Vasim Abu**

Full Stack Developer

---

# 📄 License

This project is developed for learning, interview demonstration, and portfolio purposes.

---

⭐ If you found this project useful, consider giving it a star on GitHub.