'use strict';
const crypto = require('node:crypto');

const SITE_ORIGIN = 'https://jejuzipsa.github.io';
const SITE_ADMIN_URL = SITE_ORIGIN + '/gichul-quiz/admin/';
const API_CALLBACK_URL = 'https://gichul-law-api.vercel.app/api/admin-callback';
const STATE_COOKIE = '__Host-gichul_admin_state';
const SESSION_LIFETIME_SECONDS = 2 * 60 * 60;
const STATE_LIFETIME_SECONDS = 10 * 60;
const CLIENT_ORIGINS = new Set([SITE_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000']);

function getConfig(env = process.env) {
  const id = String(env.GICHUL_GITHUB_CLIENT_ID || '').trim();
  const secret = String(env.GICHUL_GITHUB_CLIENT_SECRET || '').trim();
  const adminId = String(env.GICHUL_ADMIN_GITHUB_ID || '').trim();
  const sessionSecret = String(env.GICHUL_ADMIN_SESSION_SECRET || '');
  return {
    clientId: id,
    clientSecret: secret,
    adminId,
    sessionSecret,
    configured: !!(id && secret && /^[0-9]+$/.test(adminId) && sessionSecret.length >= 32)
  };
}
function noStore(res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
}
function setCors(req, res) {
  const origin = req.headers && req.headers.origin;
  res.setHeader('Vary', 'Origin');
  if (CLIENT_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
  }
}
function sendJson(res, status, data) {
  noStore(res);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}
function redirect(res, url) {
  noStore(res);
  res.statusCode = 302;
  res.setHeader('Location', url);
  res.end();
}
function adminErrorUrl(reason) {
  const valid = new Set(['configuration', 'denied', 'invalid_state', 'unauthorized', 'upstream']);
  return SITE_ADMIN_URL + '#error=' + (valid.has(reason) ? reason : 'upstream');
}
function hmac(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}
function createSession(user, secret, nowSeconds = Math.floor(Date.now() / 1000)) {
  const payload = Buffer.from(JSON.stringify({
    iss: 'gichul-admin',
    sub: String(user.id),
    login: String(user.login || '').slice(0, 80),
    iat: nowSeconds,
    exp: nowSeconds + SESSION_LIFETIME_SECONDS
  })).toString('base64url');
  return payload + '.' + hmac(payload, secret);
}
function verifySession(token, config, nowSeconds = Math.floor(Date.now() / 1000)) {
  if (!config.configured || typeof token !== 'string' || token.length > 2048) return null;
  const pieces = token.split('.');
  if (pieces.length !== 2 || !pieces.every(piece => /^[A-Za-z0-9_-]+$/.test(piece))) return null;
  const expected = Buffer.from(hmac(pieces[0], config.sessionSecret));
  const signature = Buffer.from(pieces[1]);
  if (expected.length !== signature.length || !crypto.timingSafeEqual(expected, signature)) return null;
  try {
    const payload = JSON.parse(Buffer.from(pieces[0], 'base64url').toString('utf8'));
    if (payload.iss !== 'gichul-admin' || payload.sub !== config.adminId) return null;
    if (!Number.isSafeInteger(payload.exp) || payload.exp <= nowSeconds ||
        !Number.isSafeInteger(payload.iat) || payload.iat > nowSeconds + 60) return null;
    if (payload.exp - payload.iat !== SESSION_LIFETIME_SECONDS) return null;
    return {id: payload.sub, login: payload.login};
  } catch {
    return null;
  }
}
function readCookies(req) {
  const cookies = Object.create(null);
  for (const part of String(req.headers?.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) cookies[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return cookies;
}
function cookieHeader(value, maxAge) {
  return STATE_COOKIE + '=' + value + '; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=' + maxAge;
}
module.exports = {
  SITE_ADMIN_URL, API_CALLBACK_URL, STATE_COOKIE, STATE_LIFETIME_SECONDS,
  getConfig, noStore, setCors, sendJson, redirect, adminErrorUrl,
  createSession, verifySession, readCookies, cookieHeader
};
