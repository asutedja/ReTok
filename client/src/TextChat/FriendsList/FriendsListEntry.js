import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

const FriendsListEntry = (props) => {

  return (
    <div className= "chatFriendsListEntry" id={props.friend.username}>
    <span onClick={(e)=>{e.preventDefault(); props.joinRoom(props.friend); props.addHighlightClass(props.friend.username)}}>{props.friend.username}</span>
    <button onClick={(e)=>{e.preventDefault();props.videoChat(props.friend)}}>
      Video
    </button>
    </div>
  )
}


export default FriendsListEntry