export function saveToken(token) {
  localStorage.setItem('p&w-token', token);
}

export function getToken() {
  return localStorage.getItem('p&w-token');
}

export function decodeToken() {
  const token = getToken();
  if (!token) return {};
  const decoded = JSON.parse(atob(token.split('.')[1]));
  return decoded;
}

export function tokenUsername() {
  return decodeToken().username;
}

export function tokenUserId() {
  return decodeToken().sub;
}

export function tokenAccountType() {
  return decodeToken().permission;
}

export function getHeader(){
  return { headers: { Authorization: `Bearer ${getToken()}`}};
}

export function deleteToken() {
  localStorage.removeItem('p&w-token');
}

export function isAuthenticated() {
  return !!getToken();
}

export function isAdmin() {
  return tokenAccountType() === 'admin';
}
