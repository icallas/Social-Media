import React, { useState, useEffect } from "react";
import ProfileBanner from "./ProfileBanner";
import TextZone from "./TextZone";
import Comments from "./Comments";
import EventBus from "../common/EventBus";
import PostService from "../services/post.service";
import CommentService from "../services/comment.service";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';

function Profile() {
  const location = useLocation();
  const [locationUsername] = useState(location.state);
  const currentUser = AuthService.getCurrentUser();
  const [userData, setUserData] = useState("");
  const [content, setContent] = useState("");
  const [userList, setUserList] = useState("");
  const [commentList, setCommentList] = useState("");
  const [isMod, setIsMod] = useState(false);
  const [postLoad, setPostLoad] = useState(true);
  const [userLoad, setUserLoad] = useState(true);
  const [commentLoad, setCommentLoad] = useState(true);
  const [expandedComments, setExpandedComments] = useState([]);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {

    if (locationUsername) {
      PostService.getPostListByUser(locationUsername.username).then(
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

      UserService.getUser(locationUsername.username).then(
        (response) => {
          setUserData(response.data);
          setUserLoad(false);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setUserData(_content);

          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }

    else {
      const currentUser = AuthService.getCurrentUser()
      PostService.getPostListByUser(currentUser.username).then(
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

      UserService.getUser(currentUser.username).then(
        (response) => {
          setUserData(response.data);
          setUserLoad(false);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setUserData(_content);

          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }

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

    const currentUser = AuthService.getCurrentUser()
    if (currentUser.roles.includes("ROLE_MODERATOR"))
      setIsMod(true)

  }, [locationUsername, commentList]);

  const getTimeAgo = (time) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const inSeconds = new Date(time).getTime();
    return (timeAgo.format(inSeconds - 0 * 1000))
  }

  function deletePost(id) {
    PostService.deletePost(id).then(
    ).catch(e => {
      console.log(e.response.message)
    })
  }

  function handleComments(index) {
    expandedComments.includes(index) ?
      setExpandedComments(current => current.filter(value => value !== index)) :
      setExpandedComments(current => [...current, index])
  }

  if (postLoad || userLoad || commentLoad) {
    return <div></div>
  }

  return (
    <div>
      <ProfileBanner userData={userData[0]} username={locationUsername} />
      {!locationUsername && (
        <TextZone pickerHeight="2" />
      )}
      <div className="post">
        {content.map((data, index) => (
          <div key={index}>
            <div className="card card-container align-center">
              <div className="card-header">
                <p> <img className=" userimage" src={"http://localhost:8080/files/" + userData[0].picture} alt=""></img> {data.username} </p>
                {(!locationUsername || isMod) && (
                  <div className="closebtn" onClick={() => deletePost(data.id)}>
                    &times;
                  </div>
                )}
              </div>
              <p className="card-body"> {data.content} </p>
              {
                data.filename && (
                  <img className="card-body" src={"http://localhost:8080/files/" + data.filename} alt="" height="400px" style={{ marginBottom: "30px" }} />
                )
              }
              <p className="card-body timeago"> {getTimeAgo(data.createdAt)}</p>
              <div className='card-footer'>
                {isLike ?
                  <FontAwesomeIcon className='solidthumb' icon={faThumbsUpSolid} style={{ marginTop: "2px" }} onClick={() => setIsLike(false)} /> :
                  <FontAwesomeIcon className='icon' icon={faThumbsUp} style={{ marginTop: "2px" }} onClick={() => setIsLike(true)} />
                }

                <p className='small' style={{ marginLeft: "10px" }} >Like</p>
                <FontAwesomeIcon className='icon' icon={faComment} style={{ marginLeft: "360px", marginTop: "2px" }} onClick={() => handleComments(index)} />
                <p className='small' style={{ marginLeft: "10px" }} >Comment</p>
              </div>
            </div>
            {expandedComments.includes(index) && (
              <Comments postid={data.id} user={currentUser.username} userlist={userList} commentlist={commentList} location="profile" isMod={isMod} />
            )}
          </div>
        ))}
        <div className="bottom-space" />
      </div >
    </div >
  );
};

export default Profile;