require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const port = process.env.PORT || 3005;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use('/api/employees', require('./routes/employee'));
app.use('/api/branches', require('./routes/branch'));
app.use('/api/assets', require('./routes/scrap-asset'));
app.use('/api/assets', require('./routes/asset'));
app.use('/api/asset-categories', require('./routes/asset-category'));
app.use('/api/stocks', require('./routes/stock'));
app.use('/api/asset-issues', require('./routes/asset-issue'));
app.use('/api/asset-returns', require('./routes/asset-return'));
app.use('/api/asset-history', require('./routes/asset-history'));

app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  swaggerOptions: { persistAuthorization: true }
}));

const pages = {
  '/': 'dashboard',
  '/employees': 'employee/index',
  '/employees/new': 'employee/create',
  '/employees/:id/edit': 'employee/edit',
  '/employees/:id': 'employee/view',
  '/assets': 'assets/index',
  '/assets/new': 'assets/create',
  '/asset-categories': 'category/index',
  '/asset-categories/new': 'category/create',
  '/stock': 'stock/index',
  '/asset-issues': 'assets/issue',
  '/asset-returns': 'assets/return',
  '/assets/scrapped': 'assets/scrap',
  '/asset-history': 'assets/history'
};

Object.entries(pages).forEach(([route, view]) => app.get(route, (req, res) => res.render(view)));

app.use((req, res) => res.status(404).send('Page not found'));

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully');
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
}

startServer();
