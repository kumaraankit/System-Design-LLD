import crypto from "crypto";

export const generateCode = (length = 6) => {
    const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return code;
}

export const generateHashCode = (originalUrl, length = 10) => {
  return crypto
    .createHash("sha256")
    .update(originalUrl + Date.now().toString())
    .digest("base64url")
    .slice(0, length);
};