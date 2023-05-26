import axios from "axios";

const API_URL = "http://localhost:3000/api/comment/";

const getCommentList = () => {
    return axios.get(API_URL + "list");
};

const createComment = (idpost, username, content) => {
    return axios.post(API_URL + "create", {
        idpost,
        username,
        content
    });
};

const deleteComment = (id) => {
    return axios.post(API_URL + "delete", {
        id
    });
};

const PostService = {
    getCommentList,
    createComment,
    deleteComment
}

export default PostService;