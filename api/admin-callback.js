'use strict';
const crypto = require('node:crypto');
const {
  API_CALLBACK_URL, SITE_ADMIN_URL, STATE_COOKIE,
  getConfig, noStore, redirect, adminErrorUrl, createSession,
  readCookies, cookieHeader
} = require('../lib/admin-auth.js');

async function fetchJson(url, options) {
  const response = await fetch(url, {
    ...options,
    headers: {'Accept': 'application/json', 'User-Agent': 'gichul-quiz-admin', ...options.headers},
    signal: AbortSignal.timeout(8000)
  });
  if (!response.ok) throw new Error('GITHUB_UPSTREAM');
  return response.json();
}

module.exports = async function handler(req, res) {
  noStore(res);
  res.setHeader('Set-Cookie', cookieHeader('', 0));
  if (req.method !== 'GET') { res.statusCode = 405; return res.end(); }
  const config = getConfig();
  if (!config.configured) return redirect(res, adminErrorUrl('configuration'));
  if (req.query?.error) return redirect(res, adminErrorUrl('denied'));
  const state = String(req.query?.state || '');
  const code = String(req.query?.code || '');
  const savedState = readCookies(req)[STATE_COOKIE] || '';
  const validState = /^[a-f0-9]{48}$/.test(state) && savedState.length === 48 &&
    crypto.timingSafeEqual(Buffer.from(state), Buffer.from(savedState));
  if (!validState || !/^[a-zA-Z0-9_-]{5,300}$/.test(code)) {
    return redirect(res, adminErrorUrl('invalid_state'));
  }
  try {
    const oauth = await fetchJson('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        redirect_uri: API_CALLBACK_URL
      })
    });
    if (!oauth.access_token || oauth.error) throw new Error('TOKEN_REJECTED');
    const profile = await fetchJson('https://api.github.com/user', {
      method: 'GET',
      headers: {Authorization: 'Bearer ' + oauth.access_token, 'X-GitHub-Api-Version': '2022-11-28'}
    });
    if (String(profile.id) !== config.adminId) return redirect(res, adminErrorUrl('unauthorized'));
    const session = createSession(profile, config.sessionSecret);
    return redirect(res, SITE_ADMIN_URL + '#session=' + encodeURIComponent(session));
  } catch {
    return redirect(res, adminErrorUrl('upstream'));
  }
};
