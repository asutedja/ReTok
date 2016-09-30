import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

const LoggedInNav = (props) => {

  return (
    <div className="mainNav">
      <Link to="/profile" className="logo">ReTok</Link>
      <form id= "searchForm" onSubmit={(event)=>{event.preventDefault(); props.searchReTok(document.getElementById('usernameSearch').value);}}>
        <input id ="usernameSearch" className="NavInputForm" placeholder="search users"/>
        <button className = "searchButton">
          search ReTok!
        </button>
      </form>
      {props.hide ? <Link id="chat" onClick={props.accept} to="/chat">Chat</Link> : null}
      <Link to="/store">Store</Link>
<<<<<<< 67d3187b3a249a68169a0c847b09c55c020d3e4a
      <Link to="/upload">Upload</Link>
      <Link to="/logout">Logout</Link>
=======
      <Link onClick={props.logout}>Logout</Link>
>>>>>>> create sockets for video chat
    </div>
  )
}

export default LoggedInNav