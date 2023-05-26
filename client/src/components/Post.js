import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextZone from "./TextZone";
import Comments from "./Comments";
import EventBus from "../common/EventBus";
import LikeService from "../services/like.service";
import CommentService from "../services/comment.service"
import PostService from "../services/post.service";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons';

function Post() {
  const currentUser = AuthService.getCurrentUser()
  const navigate = useNavigate();
  const [userList, setUserList] = useState("");
  const [likeList, setLikeList] = useState([]);
  const [commentList, setCommentList] = useState("");
  const [content, setContent] = useState("");
  const [isMod, setIsMod] = useState(false);
  const [postLoad, setPostLoad] = useState(true);
  const [userLoad, setUserLoad] = useState(true);
  const [likeLoad, setLikeLoad] = useState(true);
  const [commentLoad, setCommentLoad] = useState(true);
  const [expandedComments, setExpandedComments] = useState([])

  useEffect(() => {
    PostService.getPostList().then(
      (response) => {
        setContent(response.data);
        setPostLoad(false);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    UserService.getUserList().then(
      (response) => {
        setUserList(response.data);
        setUserLoad(false);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setUserList(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    CommentService.getCommentList().then(
      (response) => {
        setCommentList(response.data);
        setCommentLoad(false)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setCommentList(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    LikeService.getLikeList().then(
      (response) => {
        setLikeList(response.data);
        setLikeLoad(false)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLikeList(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    const currentUser = AuthService.getCurrentUser()
    if (currentUser.roles.includes("ROLE_MODERATOR"))
      setIsMod(true)

  }, [commentList, likeList]);

  const getTimeAgo = (time) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const inSeconds = new Date(time).getTime();
    return (timeAgo.format(inSeconds - 0 * 1000))
  }

  function handleComments(index) {
    expandedComments.includes(index) ?
      setExpandedComments(current => current.filter(value => value !== index)) :
      setExpandedComments(current => [...current, index])
  }

  function deletePost(id) {
    PostService.deletePost(id).then(
    ).catch(e => {
      console.log(e.response.message)
    })
  }

  function numberOfLikes(idpost) {
    let likes = 0
    likeList.map((data) => (
      idpost === data.idpost && (likes = likes + 1)
    ))

    return likes
  }

  function doesUserLikes(idpost) {
    let result = false
    likeList.map((data) => (
      currentUser.username === data.username && idpost === data.idpost && (result = true)
    ))

    return result
  }

  function removeLike(idpost) {
    likeList.map((data) => (
      currentUser.username === data.username && idpost === data.idpost && (
        LikeService.removeLike(data.id)
      )
    ))
  }

  function addLike(idpost) {
    LikeService.addLike(idpost, currentUser.username)
  }

  if (postLoad || userLoad || commentLoad || likeLoad) {
    return <div></div>
  }

  return (

    <div>
      <TextZone pickerHeight="1" />
      <div className="post">
        {content.map((data, index) => (
          <div key={index}>
            <div className="card card-container align-center">
              {userList.map((_data, _index) => (
                _data.username === data.username && (
                  <div className="card-user" key={_index}>
                    <div className="card-header">
                      <p>
                        {currentUser.username === data.username ?
                          <img
                            className=" userimage" src={"http://localhost:8080/files/" + _data.picture} alt=""
                            onClick={() => navigate("/profile")}>
                          </img> :
                          <img
                            className=" userimage" src={"http://localhost:8080/files/" + _data.picture} alt=""
                            onClick={() => navigate("/profile", { state: { username: data.username } })}>
                          </img>}
                        {data.username}
                      </p>
                      {isMod && (
                        <div className="closebtn" onClick={() => deletePost(data.id)}>
                          &times;
                        </div>
                      )}
                    </div>
                  </div>
                )
              ))}

              <p className="card-body"> {data.content} </p>
              {data.filename && (
                <img className="card-body" src={"http://localhost:8080/files/" + data.filename} alt="" height="350px" style={{ marginBottom: "30px" }} />
              )}
              <p className="card-body timeago"> {getTimeAgo(data.createdAt)}</p>
              <div className='card-footer'>
                {doesUserLikes(data.id) ?
                  <FontAwesomeIcon className='solidthumb' icon={faThumbsUpSolid} style={{ marginTop: "2px" }} onClick={() => removeLike(data.id)} /> :
                  <FontAwesomeIcon className='icon' icon={faThumbsUp} style={{ marginTop: "2px" }} onClick={() => addLike(data.id)} />
                }
                <p className='small' style={{ marginLeft: "10px", display: "flex" }} > {numberOfLikes(data.id) > 0 && (numberOfLikes(data.id))} </p>

                <FontAwesomeIcon className='icon' icon={faComment} style={{ marginLeft: "450px", marginTop: "2px" }} onClick={() => handleComments(index)} />
                <p className='small' style={{ marginLeft: "10px" }} > </p>
              </div>
            </div>
            {expandedComments.includes(index) && (
              <Comments postid={data.id} user={currentUser.username} userlist={userList} commentlist={commentList} location="home" isMod={isMod} />
            )}
          </div>
        ))}
        <div className="bottom-space" />
      </div>
    </div >
  );
};

export default Post;