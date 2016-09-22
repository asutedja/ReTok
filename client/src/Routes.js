import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import LoginContainer from './Login/LoginContainer.js'
import HomeContainer from './Home/HomeContainer.js'
import ProfileContainer from './Profile/ProfileContainer.js'
import AllFriendsContainer from './Profile/AllFriends/AllFriendsContainer.js'
import StoreContainer from './Store/StoreContainer.js'
import ChatContainer from './Chat/ChatContainer.js'

var Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={HomeContainer}>
      <IndexRoute component={ProfileContainer}>
        <IndexRoute component={AllFriendsContainer}/>
      </IndexRoute>  
      <Route path='/login' component={LoginContainer}/>
      <Route path="/store" component={StoreContainer}/>
      <Route path="/chat" component={ChatContainer}/>
    </Route>
  </Router>
)

export default Routes
 
// render((
//   <Router history={browserHistory}>
//   	<Route path="/" component={HomeContainer}>
//       <IndexRoute component={ProfileContainer}>
//         <IndexRoute component={AllFriendsContainer}/>
//       </IndexRoute>  
//       <Route path='/login' component={LoginContainer}/>
//       <Route path="/store" component={StoreContainer}/>
//       <Route path="/chat" component={ChatContainer}/>
//     </Route>
//   </Router>
// ), document.getElementById('app'))