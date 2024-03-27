const localStorageUser = localStorage.getItem('user');
export const getUserData = localStorageUser
  ? JSON.parse(localStorageUser)
  : null;
