import React from 'react'
import {emojify} from 'react-emojione';

const TextChatProfile = (props) => {

  const divStyle = {
    backgroundImage: 'url(' +props.user.profilePic+ ')',
    backgroundPosition:'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return(
    <div className = "chatProfile">
      <div className ="chatProfileInfo">
        <div className = "oneFriend" style={divStyle}>
          <div className="oneFriendWrapper">
          </div>
        </div>
        
      </div>
      <div className="chatProfileEmojis">
      </div>
    </div>
    )
}

export default TextChatProfile