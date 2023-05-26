import axios from "axios";

const API_URL = "http://localhost:3000/api/post/";

const getPostList = () => {
  return axios.get(API_URL + "list");
};

const getPostListByUser = (username) => {
  return axios.post(API_URL + "userlist", {
    username
  });
};

const createPost = (username, content, filename) => {
  return axios.post(API_URL + "create", {
    username,
    content,
    filename
  });
};

const deletePost = (id) => {
  return axios.post(API_URL + "delete", {
    id
  });
};

const PostService = {
  getPostList,
  getPostListByUser,
  createPost,
  deletePost
}

export default PostService;