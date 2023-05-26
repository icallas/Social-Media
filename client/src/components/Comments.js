import React, { useState, useRef } from 'react'
import CommentService from "../services/comment.service"
import useAutosizeTextArea from "./Autosize.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faSmileBeam } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom';
import Picker from "@emoji-mart/react"

function Comments(props) {
  const [value, setValue] = useState("");
  const textAreaRef = useRef(null);
  const navigate = useNavigate();
  const [pickerVisible, setPickerVisible] = useState(false);
  useAutosizeTextArea(textAreaRef.current, value);

  function createComment(postid, user) {
    if (value) {
      CommentService.createComment(postid, user, value).then(
        (response) => {
          console.log(response)
          setValue("")
          setPickerVisible(false)
        }
      ).catch(e => {
        console.log(e.response.data)
      })
    }
  }

  function insertSomeText(data) {
    const selectionStart = textAreaRef.current.selectionStart;
    const selectionEnd = textAreaRef.current.selectionEnd;

    let newValue =
      value.substring(0, selectionStart) +
      data +
      value.substring(selectionEnd, value.length);
    setValue(newValue);
  };

  function handleNavigate(data) {
    if (data === undefined) {
      navigate("/profile")
      window.location.reload()
    }
    else {
      navigate("/profile", { state: { username: data.username } })
      window.location.reload()
    }
  }

  return (
    <div className="comment-section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-10">
          <div className="card">
            <div className="card-body p-4">
              <div className="form-outline mb-4">
                <textarea
                  spellCheck="false"
                  placeholder="Write a comment..."
                  ref={textAreaRef}
                  value={value}
                  onChange={({ target }) => setValue(target.value)}
                  style={{ marginTop: "10px" }}
                />
                <div className='bottom-section'>
                  <button className="icon-button" onClick={() => setPickerVisible(!pickerVisible)}>
                    <FontAwesomeIcon icon={faSmileBeam} size="xl" />
                  </button>
                  <button className="btn btn-dark btn-sm" style={{ width: "50%", marginLeft: "300px" }} onClick={() => createComment(props.postid, props.user)}>Send</button>
                </div>
              </div>
              <div>
                {pickerVisible && (
                  <Picker
                    categories={"people, nature, foods, activity, places, objects, symbols, flags"}
                    exceptEmojis="relaxed"
                    previewPosition="none"
                    skinTonePosition="none"
                    onEmojiSelect={(e) => {
                      insertSomeText(e.native)
                    }}
                  />
                )}
              </div>
              {props.commentlist.map((data, index) => (
                data.idpost === props.postid && (
                  <div className="comment" key={index}>
                    <div className="card mb-4 " style={{ width: "100%" }}>
                      <div className="card-body">
                        {(props.user === data.username || props.isMod) && (
                          <div className="closebutton" onClick={() => CommentService.deleteComment(data.id)}>
                            &times;
                          </div>
                        )}
                        <p style={{ marginTop: "5px" }}> {data.content} </p>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            {props.userlist.map((_data, _index) => (
                              _data.username === data.username && (
                                <div key={_index}>
                                  <div className="comment-username">
                                    {
                                      props.user === data.username ?
                                        <img
                                          className="comment-userimage" src={"http://localhost:8080/files/" + _data.picture} alt="avatar" width="25"
                                          onClick={() => handleNavigate(undefined)}>
                                        </img> :
                                        <img
                                          className="comment-userimage" src={"http://localhost:8080/files/" + _data.picture} alt="avatar" width="25"
                                          onClick={() => handleNavigate(data)}>
                                        </img>
                                    }
                                    <p>{data.username}</p>
                                  </div>
                                </div>
                              )
                            ))}
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <FontAwesomeIcon icon={faThumbsUp} style={{ marginTop: "-0.16rem" }} />
                            <p className="small text-muted mb-0 ms-1">{/* number of likes */}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments