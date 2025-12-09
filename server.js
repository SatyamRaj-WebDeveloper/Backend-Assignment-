import dotenv from 'dotenv';
import express, {  json } from 'express';
import { createPool } from 'mysql2';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(json());
app.use(cors());

const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.code);
    } else {
        console.log('Successfully connected to MySQL Database.');
        connection.release();
    }
});


app.get('/search/dishes', (req, res) => {
    const { name, minPrice, maxPrice } = req.query;

    if (!name || !minPrice || !maxPrice) {
        return res.status(400).json({ error: 'Please provide name, minPrice, and maxPrice' });
    }

    const sql = `
        SELECT 
            r.id as restaurantId,
            r.name as restaurantName,
            r.city,
            m.name as dishName,
            m.price as dishPrice,
            COUNT(o.id) as orderCount
        FROM restaurants r
        JOIN menu_items m ON r.id = m.restaurant_id
        LEFT JOIN orders o ON m.id = o.menu_item_id
        WHERE m.name LIKE ? 
        AND m.price >= ? 
        AND m.price <= ?
        GROUP BY r.id, r.name, r.city, m.name, m.price
        ORDER BY orderCount DESC
        LIMIT 10;
    `;

    const searchTerm = `%${name}%`;

    db.query(sql, [searchTerm, minPrice, maxPrice], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        const response = {
            restaurants: results.map(row => ({
                restaurantId: row.restaurantId,
                restaurantName: row.restaurantName,
                city: row.city,
                dishName: row.dishName,
                dishPrice: row.dishPrice,
                orderCount: row.orderCount
            }))
        };

        res.json(response);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});