import axios from "axios";

const API_URL = "http://localhost:3000/api/like/";

const getLikeList = () => {
    return axios.get(API_URL + "list");
};

const addLike = (idpost, username) => {
    return axios.post(API_URL + "likepost", {
        idpost,
        username
    });
};

const removeLike = (id) => {
    return axios.post(API_URL + "delete", {
        id
    });
};

const LikeService = {
    getLikeList,
    addLike,
    removeLike
}

export default LikeService;