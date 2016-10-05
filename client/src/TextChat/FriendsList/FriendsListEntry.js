import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

const FriendsListEntry = (props) => {

  return (
    <div className= "chatFriendsListEntry" id={props.friend.username}>
    <h4 onClick={(e)=>{e.preventDefault(); props.joinRoom(props.friend); props.addHighlightClass(props.friend.username)}}>{props.friend.username}</h4>
    </div>
  )
}


export default FriendsListEntry