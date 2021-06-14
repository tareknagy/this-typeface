import * as usersAPI from './user-api';

export async function signUp(userData) {
    try {
        const token = await usersAPI.signUp(userData);
        localStorage.setItem('token', token);
        return getUser();
    } catch {
        throw new Error('Invalid Sign Up');
    }
}

export async function login(userData) {
    try {
        const token = await usersAPI.login(userData);
        localStorage.setItem('token', token);
        return getUser();
    } catch {
        throw new Error('Bad Credentials!');
    }
}

export function getToken() {
    // null if there's no string
    const token = localStorage.getItem('token');
    if (!token) return null;
    // expired?
    const payload = JSON.parse(atob(token.split('.')[1]));
    // convert to ms
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      return null;
    }
    return token;
}

export function logOut() {
    localStorage.removeItem('token');
}
  
export function getUser() {
    const token = getToken();
    // token ? user in the payload : null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}


// testing validation of token, not needed.
export function checkToken() {
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr));
}