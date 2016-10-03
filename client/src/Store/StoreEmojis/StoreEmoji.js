import React from 'react'
import {emojify} from 'react-emojione'

const StoreEmoji = (props) => {

  return(
      <div className="oneEmoji hvr-bob">
        <div className="emojiWrapper">
          {emojify(props.emoji.emoji, {output: 'unicode'})}
        </div>
      <div className="storeButtonWrapper">
        <button className="storeButton" onClick={(e)=>{e.preventDefault(); props.buyEmoji(props.emoji, props.index)}}>Buy Emoji</button>
      </div>
      </div>

    )
}

export default StoreEmoji

