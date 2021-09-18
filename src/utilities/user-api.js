import { getToken } from './user-service';
const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function getFavorites() {
  const options = {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }
  return fetch(`${BASE_URL}/favorites`, options).then(res => res.json());
}

export function manageFavorites(typeface) {
  // typeface['favorite'] = true;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  }
  return fetch(`${BASE_URL}/favorites/${btoa(JSON.stringify(typeface))}`, options).then(res => res.json());
}


async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  // Add the token
  const token = getToken();
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);
  // res.ok is false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}