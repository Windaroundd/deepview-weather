export const USER_DATA_LOCAL = "USER_DATA_LOCAL";

export const userDataLocal = {
  set: (userData) => {
    let userDataJson = JSON.stringify(userData);
    localStorage.setItem(USER_DATA_LOCAL, userDataJson);
  },
  get: () => {
    let userDataJson = localStorage.getItem(USER_DATA_LOCAL);
    if (userDataJson) {
      return JSON.parse(userDataJson);
    }
  },
};
