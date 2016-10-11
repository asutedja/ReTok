import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router'
import LoginContainer from './Login/LoginContainer.js'
import HomeContainer from './Home/HomeContainer.js'
import PhotoUploadContainer from './PhotoUpload/PhotoUploadContainer.js'
import ProfileContainer from './Profile/ProfileContainer.js'
import AllFriendsContainer from './Profile/AllFriends/AllFriendsContainer.js'
import OnlineFriendsContainer from './Profile/OnlineFriends/OnlineFriendsContainer.js'
import SuggestedContainer from './Profile/Suggested/SuggestedContainer.js'
import StoreContainer from './Store/StoreContainer.js'
import StoreEmojisContainer from './Store/StoreEmojis/StoreEmojisContainer.js'
import StoreUserEmojisContainer from './Store/StoreUserEmojis/StoreUserEmojisContainer.js'
import ChatContainer from './Chat/ChatContainer.js'
import ChatMVPContainer from './Chat/ChatMVPContainer.js'
import TextChatContainer from './TextChat/TextChatContainer.js'
import SearchContainer from './Search/SearchContainer.js'
import MultiChatContainer from './Chat/MultiChatContainer.js'

var Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={HomeContainer}>
      <IndexRoute component={LoginContainer}/>
      <Route path="/profile" component={ProfileContainer}>
        <IndexRoute component={AllFriendsContainer}/>
        <Route path='/online' component={OnlineFriendsContainer}/>
        <Route path='/suggested' component={SuggestedContainer}/>
      </Route>  
      <Route path="/store" component={StoreContainer}>
        <IndexRoute component={StoreEmojisContainer}/>
        <Route path='/userinventory' component={StoreUserEmojisContainer}/>
        </Route>
      <Route path="/search" component={SearchContainer}/>
      <Route path="/chat" component={MultiChatContainer}/>
      <Route path="/text" component={TextChatContainer}/>
      <Route path="/upload" component={PhotoUploadContainer}/>
    </Route>
  </Router>
)


export default Routes