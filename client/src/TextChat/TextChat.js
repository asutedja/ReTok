import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

const TextChat = (props) => {

  return (
    <div>
    <h5>
    {props.friend.username}</h5>
    </div>
  )
}


export default TextChat