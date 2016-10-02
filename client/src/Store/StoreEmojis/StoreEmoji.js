import React from 'react'
import {emojify} from 'react-emojione';

const StoreEmoji = (props) => {
  //inline CSS-style. fills the entire AllFriends div with photo
    // const divStyle = {
    //   backgroundImage: 'url(' +props.friend.profilePic+ ')',
    //   backgroundPosition:'center',
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat'
    // }
  return(
    <div>
      hi
      {emojify(props.emoji.emoji)}
      <button onClick={(e)=>{e.preventDefault(); props.buyEmoji(props.emoji, props.key)}}>Buy Emoji</button>
    </div>
    )
}

export default StoreEmoji