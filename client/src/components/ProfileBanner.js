import React, { useState } from 'react'
import AuthService from "../services/auth.service";
import UploadService from '../services/FileUploadService';
import UserService from '../services/user.service';
import "./Profile.css"


function ProfileBanner(data) {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const currentUser = AuthService.getCurrentUser();

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handlePost = (picture) => {
    UploadService.upload(currentFile, () => {
      setPreviewImage(undefined)
    })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
        }
      });
    UserService.updateUser(currentUser.username, picture)
  }

  return (

    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div id="content" className="content content-full-width">
            <div className="profile">
              <div className="profile-header">
                <div className="profile-header-cover"></div>
                <div className="profile-header-content">
                  {previewImage ?
                    <div className='profile-header-img'>
                      <img className="preview" src={previewImage} alt="" height="115px" />
                    </div>
                    :
                    <div className="profile-header-img">
                      <img className="preview" src={"http://localhost:8080/files/" + data.userData.picture} alt="" height="115px" />
                    </div>
                  }

                  <div className="profile-header-info">
                    {data.username ? <div> <h4 className="m-t-10 m-b-5">{data.userData.username} </h4> <i className="m-b-10">{data.userData.email}</i> </div>
                      : <div> <h4 className="m-t-10 m-b-5">{currentUser.username} </h4> <i className="m-b-10">{currentUser.email}</i> </div>}
                    <div className='buttons'>
                      <label htmlFor="picture-input">
                        {!data.username && (<p className="btn btn-dark btn-sm">Edit Profile</p>)}
                      </label>
                      <input style={{ display: "none" }} id="picture-input" type="file" accept="image/*" onChange={selectFile} />
                      {previewImage && (
                        <div>
                          <button className='confirm-button btn btn-dark btn-sm' onClick={() => handlePost(currentFile.name)}> Confirm </button>
                          <button className='cancel-button btn btn-dark btn-sm' onClick={() => setPreviewImage(undefined)}> Cancel </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileBanner