import axios from "axios";

const API_URL = "http://localhost:3000/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const getUserList = () => {
  return axios.get(API_URL + "getuserlist")
}

const getUser = (username) => {
  return axios.post(API_URL + "getuser", {
    username
  })
}

const updateUser = (username, picture) => {
  return axios.post(API_URL + "updateuser", {
    username,
    picture
  })
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUserList,
  getUser,
  updateUser
}

export default UserService;