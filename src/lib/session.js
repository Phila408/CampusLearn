const KEY = 'campuslearn_user';

export function getUser() {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
}
export function setUser(user) { localStorage.setItem(KEY, JSON.stringify(user)); }
export function logout() { localStorage.removeItem(KEY); }
