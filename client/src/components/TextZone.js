import React, { useRef, useState } from 'react'
import useAutosizeTextArea from "./Autosize.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import Picker from "@emoji-mart/react"
import PostService from "../services/post.service.js";
import AuthService from "../services/auth.service";
import UploadService from "../services/FileUploadService";

function TextZone(pickerHeight) {
  const [value, setValue] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [currentFile, setCurrentFile] = useState("");
  const [previewImage, setPreviewImage] = useState(undefined);
  const textAreaRef = useRef(null);
  useAutosizeTextArea(textAreaRef.current, value);

  function insertSomeText(data) {
    const selectionStart = textAreaRef.current.selectionStart;
    const selectionEnd = textAreaRef.current.selectionEnd;

    let newValue =
      value.substring(0, selectionStart) +
      data +
      value.substring(selectionEnd, value.length);
    setValue(newValue);
  };

  const handlePost = () => {
    if (currentFile) {
      UploadService.upload(currentFile, () => {
        setValue("");
        setCurrentFile("");
        setPickerVisible(false);
        setPreviewImage(undefined);
      })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
          }
        });
    }
    const currentUser = AuthService.getCurrentUser()
    if (value) {
      PostService.createPost(currentUser.username, value, currentFile.name).then(
        (response) => {
          setPickerVisible(false);
        }
      )
    }
  };

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="user">
      <div className="card card-container">
        <div className="post-input-container">
          <textarea
            spellCheck="false"
            placeholder="What's on your mind ?"
            ref={textAreaRef}
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
          {previewImage && (
            <div>
              <img className="preview" src={previewImage} alt="" height="250px" />
            </div>
          )}
          <div className='card-bottom'>
            <label htmlFor="file-input">
              <FontAwesomeIcon icon={faImage} size="2xl" />
            </label>
            <input style={{ display: "none" }} id="file-input" type="file" accept="image/*" onChange={selectFile} />
            <button className="icon-button" onClick={() => setPickerVisible(!pickerVisible)}>
              <FontAwesomeIcon icon={faSmileBeam} size="2xl" style={{ marginBottom: "3px" }} />
            </button>
            <button onClick={handlePost} type="button" className="btn btn-dark btn-sm"> Send </button>
          </div>
        </div>
      </div>
      {pickerHeight.pickerHeight === "1" &&
        <div className="picker">
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
      }
      {pickerHeight.pickerHeight === "2" &&
        <div className="picker2">
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
      }

    </div>
  )
}

export default TextZone;