// index.js
import express from "express"
import dotenv from "dotenv"
import pool from './db.js'
import urlRoutes from './routes/urlRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());

// Test route
app.use('/api', urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
});
