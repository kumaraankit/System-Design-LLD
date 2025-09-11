import pool from "../db.js";
import { createShortUrl, getUrlByCode, getUrlByOriginal } from "../models/urlModels.js";
import { checkIfUrlIsMalicious } from "../utils/aiutils.js";
import { generateCode } from "../utils/generateCode.js";

export const shortenUrl = async (req, res) => {
    const { originalUrl, expiresAt } = req.body;
    if (!originalUrl) {
        return res.status(400).json({ error: "Original URL is required" });
    }

    let shortCode;
    let exists = true;
    while (exists) {
        shortCode = generateCode(6);
        const existing = await getUrlByCode(shortCode);
        if (!existing) exists = false;
    }
    try {
        const ifUrlSafe = await checkIfUrlIsMalicious(originalUrl);
        if (!ifUrlSafe) {
            return res.status(400).json({ error: "The provided URL is identified as malicious." });
        }
        const existingUrl = await getUrlByOriginal(originalUrl);
        if (existingUrl) {
            return res.status(200).json({ shortCode: existingUrl.short_code, originalUrl: existingUrl.original_url, expiresAt: existingUrl.expires_at, message: 'URL is already shortened' });
        }
        let shortCode;
        const MAX_ATTEMPTS = 8;
        let attempts = 0;

        do {
            shortCode = generateCode(6);
            attempts++;
        } while (await getUrlByCode(shortCode) && attempts < MAX_ATTEMPTS);

        if (await getUrlByCode(shortCode)) {
            shortCode = generateCode(8);
        }

        if (await getUrlByCode(shortCode)) {
            shortCode = generateHashCode(originalUrl, 10);
        }
        const newUrl = await createShortUrl(shortCode, originalUrl, expiresAt);
        return res.status(201).json({ shortCode: newUrl.short_code, originalUrl: newUrl.original_url, expiresAt: newUrl.expires_at });
    }
    catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;
    if (!shortCode) {
        return res.status(400).json({ error: "Short code is required" });
    }

    try {
        const url = await getUrlByCode(shortCode);
        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }
        if (url.expires_at && new Date() > url.expires_at) {
            return res.status(410).json({ error: "Short URL has expired" });
        }

        await pool.query(
            'UPDATE urls SET visit_count = visit_count + 1,last_accessed = NOW() WHERE short_code = $1',
            [shortCode]
        );
        return res.redirect(url.original_url);
    } catch (error) {
        console.error("Error redirecting URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
