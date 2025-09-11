import pool from '../db.js';
export const createShortUrl = async (shortCode, originalUrl,expiresAt=null) => {
    const result = await pool.query(
        'INSERT INTO urls (short_code, original_url,expires_at) VALUES ($1, $2,$3) RETURNING *',
        [shortCode, originalUrl,expiresAt]
    );
    return result.rows[0];
}

export const getUrlByCode = async (shortCode) => {
    const result = await pool.query(
        'SELECT * FROM urls WHERE short_code = $1',
        [shortCode]
    );
    return result.rows[0];
}

export const getUrlByOriginal = async (originalUrl) => {
    const result = await pool.query(`SELECT * FROM urls WHERE original_url = $1`, [originalUrl])
    return result.rows[0];
}