import React, { PropTypes } from 'react'

const PhotoUpload = (props) => {
  
  
  return (
    <div>
      <form id="ProfilePhotoUpload" onSubmit={(event) =>{event.preventDefault(); props.changeProfilePhoto(event);}}>
      <input className="editProfileInput" id="uploadedPhoto" type="file" name="photo" onChange={(e) =>props.handleImageChange(e)} />
      <button className="editProfileButton">
      Upload Profile Photo
      </button>
      </form>
    </div>

  )


}

export default PhotoUpload