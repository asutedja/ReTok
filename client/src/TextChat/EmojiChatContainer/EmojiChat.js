import React from 'react'
import {emojify} from 'react-emojione';

const EmojiChat = (props) => {

  return(
    <div className="oneEmojiChat hvr-bob" onClick={(e)=>{e.preventDefault(); props.useEmojiChat(props.emoji.emoji)}}>
      <div className="emojiChatWrapper">
        {emojify(props.emoji.emoji, {output: 'unicode'})}
      </div>
    </div>
    )
}

export default EmojiChat