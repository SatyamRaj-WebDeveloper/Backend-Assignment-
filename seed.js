import dotenv from 'dotenv'
import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    multipleStatements: true
});


const sqlPath = path.resolve('database_setup_file.sql');
const sql = fs.readFileSync(sqlPath).toString();

console.log("Connecting to Railway Database...");

connection.connect((err) => {
    if (err) {
        console.error('Connection Error:', err);
        return;
    }
    console.log('Connected! Sending data...');

    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Seeding Failed:', err);
        } else {
            console.log('✅ Database seeded successfully!');
        }
        connection.end();
    });
});