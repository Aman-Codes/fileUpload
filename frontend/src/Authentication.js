const Authentication = {
  isAuthenticated: false,
  signin(callback) {
    Authentication.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    Authentication.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { Authentication };