'use strict';
const crypto = require('node:crypto');
const {
  API_CALLBACK_URL, STATE_LIFETIME_SECONDS, getConfig, noStore, setCors,
  sendJson, redirect, adminErrorUrl, createSession, verifySession, cookieHeader
} = require('../lib/admin-auth.js');

module.exports = async function handler(req, res) {
  noStore(res);
  setCors(req, res);
  if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }
  if (req.method !== 'GET') return sendJson(res, 405, {error: 'METHOD_NOT_ALLOWED'});
  const config = getConfig();
  const mode = req.query?.mode === 'start' ? 'start' : 'verify';
  if (mode === 'start') {
    if (!config.configured) return redirect(res, adminErrorUrl('configuration'));
    const state = crypto.randomBytes(24).toString('hex');
    res.setHeader('Set-Cookie', cookieHeader(state, STATE_LIFETIME_SECONDS));
    const url = new URL('https://github.com/login/oauth/authorize');
    url.searchParams.set('client_id', config.clientId);
    url.searchParams.set('redirect_uri', API_CALLBACK_URL);
    url.searchParams.set('scope', 'read:user');
    url.searchParams.set('state', state);
    return redirect(res, url.toString());
  }
  if (!config.configured) return sendJson(res, 503, {error: 'ADMIN_NOT_CONFIGURED'});
  const match = /^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/.exec(String(req.headers?.authorization || ''));
  const session = match ? verifySession(match[1], config) : null;
  if (!session) return sendJson(res, 401, {error: 'AUTH_REQUIRED'});
  return sendJson(res, 200, {authenticated: true, login: session.login});
};

module.exports._test = {createSession, verifySession};
