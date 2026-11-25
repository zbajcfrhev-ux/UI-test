import express from 'express';
import cors from 'cors';
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log('Получен запрос:', req.method, req.url);
  next();
});
app.get('/api/hello', (req, res) => {
  res.send('Express работает!');
});

// Подключение к PostgreSQL
const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Проверка подключения к базе
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT current_database()');

    res.json({
      message: 'Подключение к PostgreSQL успешно!',
      database: result.rows[0].current_database,
    });
  } catch (error) {
    console.error('Ошибка подключения к БД:', error.message);
    res.status(500).json({ message: 'Ошибка подключения к базе данных' });
  }
});

// Получение товаров
app.get('/api/products', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM products WHERE is_active = true ORDER BY product_id'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения товаров:', error.message);
    res.status(500).json({ message: 'Не удалось получить товары' });
  }
});

// Получение категорий
console.log('Маршрут категорий загружен');

app.get('/api/categories', async (req, res) => {
  try {
    console.log('Получен запрос на категории');
    const result = await db.query(
      'SELECT * FROM categories ORDER BY category_id'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения категорий:', error.message);
    res.status(500).json({ message: 'Не удалось получить категории' });
  }
});

// Запуск сервера
console.log(
  app.router.stack
    .filter((r) => r.route)
    .map((r) => r.route.path)
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});