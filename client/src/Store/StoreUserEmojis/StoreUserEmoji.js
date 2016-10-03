import React from 'react'
import {emojify} from 'react-emojione';

const StoreUserEmoji = (props) => {

  return(
    <div>

      {emojify(props.emoji.emoji, {output: 'unicode'})}
    </div>
    )
}

export default StoreUserEmoji