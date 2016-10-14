import React, {PropTypes} from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars';
import TextChat from './TextChat.js'
import FriendsListContainer from './FriendsList/FriendsListContainer.js'
import EmojiChatContainer from './EmojiChatContainer/EmojiChatContainer.js'
import shortToUnicode from '../../shortToUnicode.js'
import unicodeToShort from '../../unicodeToShort.js'
import axios from 'axios'
import * as userActions from '../Redux/userReducer'
import updateHelper from '../updateHelper.js'

class TextChatContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatSelected: false,
      currentFriend: null,
      newChatHistoryLog: {} 
    }
  }

  componentWillMount() {
    let context = this;
    axios.get('/auth')
      .then(function(res) {

        if(!res.data) {
          console.log('no session...redirecting to sign up page');
              var socket = context.props.socket;
              axios.get('/logout').then( () => {
              context.props.dispatch(userActions.toggleLogIn(false));

              let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
              let options = {

                method: 'POST',
                headers: myHeaders,
                body: `mutation
                  {
                    updateUser(username:"${context.props.user.username}" online: false) 
                    {
                      username
                      online
                    }
                  }`
              };
              fetch('/graphql', options).then((res) =>{
                return res.json().then((data) => {
              socket.emit('updateFriends', context.props.friends);
                    socket.emit('endTextChat', context.props.user.username, context.props.user.coin);
                    socket.disconnect()
                    context.props.dispatch(userActions.sendSocket(null))
                    context.context.router.push('/')
                  })
              })
              .catch((error) => console.log(error))
           })
            .catch( (error) => console.log(error))
          } else {
        let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
        let options1 = {

          method: 'POST',
          headers: myHeaders,
          body: `
              mutation {
              updateUser(username: \"${context.props.user.username}\" online: true)  {
                username
              }
              }
              `
        };
        fetch('/graphql', options1)
      }
     })     
    .catch((error) => console.log(error))


    let socket = this.props.socket
    socket.emit('login', this.props.user.username)
    socket.emit('updateFriends', this.props.friends);
    var username = this.props.user.username   

    socket.on('update', () => updateHelper(this))
    updateHelper(this); 

    socket.on('update', () => updateHelper(this))
    updateHelper(this); 


    let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
    let options = {

      method: 'POST',
      headers: myHeaders,
      body: `
           {
          findChatsRedis(user: \"${this.props.user.username}\")  {
            room
            text
          }
          }
          `

    };
    fetch('/graphql', options).then((res) =>{
      return res.json().then((data) => {
        let findChatsData = data.data.findChatsRedis;
        let newChatLog = {};

        for (var i = 0; i < findChatsData.length; i++) {

          var myChatData = findChatsData[i]['text'].split('#^');

            for (var j = 0; j < myChatData.length; j++) {
              myChatData[j] = decodeURI(myChatData[j]); 
            }


          newChatLog[findChatsData[i]['room']] = myChatData;
        }
        context.props.dispatch(userActions.updateChatLog(newChatLog));

      })
    })


    this.props.dispatch(userActions.createRoom(''));

    let chatLogCopy = Object.assign({}, this.props.chatLog);


    socket.on('textmessagereceived', function(message) {
   
      let chat = context.props.currentChat.slice();
      chat.push(message);

      context.props.dispatch(userActions.updateCurrentChat(chat));
      var logCopy = Object.assign({}, context.props.chatLog);
      logCopy[context.props.room] = chat;
      context.props.dispatch(userActions.updateChatLog(logCopy));

      let logComponentCopy = Object.assign({}, context.state.newChatHistoryLog);

      logComponentCopy[context.props.room] = logComponentCopy[context.props.room] || [];
      logComponentCopy[context.props.room].push(message);
      context.setState({
        newChatHistoryLog: logComponentCopy
      })
    });

    socket.on('joinRoomSuccess', function(room, friend) {
      context.setState({
        chatSelected: true,
        currentFriend: friend
      })

      let oldRoom = context.props.room;

      let chatLogCopy = Object.assign({}, context.props.chatLog);
      chatLogCopy[oldRoom] = context.props.chatLog[oldRoom] || context.props.currentChat;
      context.props.dispatch(userActions.createRoom(room));
      if(!chatLogCopy.hasOwnProperty(room)) {
        chatLogCopy[room] = [];
        context.props.dispatch(userActions.updateChatLog(chatLogCopy));
        context.props.dispatch(userActions.updateCurrentChat([]));
      } else {
        context.props.dispatch(userActions.updateChatLog(chatLogCopy));
        context.props.dispatch(userActions.updateCurrentChat(chatLogCopy[room]));
      }
    })
  }


  componentWillUnmount() {
    let socket = this.props.socket;
    let clearChat = [];


    this.props.dispatch(userActions.updateCurrentChat(clearChat));
    if(socket) {
    socket.removeAllListeners("joinRoomSuccess");
    socket.removeAllListeners("textmessagereceived");
    };
    let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
    let options = {

      method: 'POST',
      headers: myHeaders,
      body: `
          mutation {
          updateUser(username: \"${this.props.user.username}\" coin:${this.props.user.coin})  {
            username
          }
          }
          `

    };
    fetch('/graphql', options).then((res) =>{
      return res.json().then((data) => {
        console.log('unmounting');
      })
    })

  }


  sendChat(message) {

    let updatedCoin = this.props.user.coin + this.state.currentFriend.score;
    let userCopy = Object.assign({},this.props.user, {coin: updatedCoin});
    this.props.dispatch(userActions.updateUser(userCopy));
    message = this.props.user.username+": "+message;
    this.props.socket.emit('textmessagesent', message, this.props.room);
    const emojiEscapedString = encodeURI(unicodeToShort(message));

    let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
    let chatOptions = {
      method: 'POST',
      headers: myHeaders,
      body: `
          mutation {
          addChatRedis(room: \"${this.props.room}\" text: \"${emojiEscapedString}\")  {
            room
          }
          }
          `
    };
    fetch('/graphql', chatOptions).then((res) =>{
      return res.json().then((data) => {
        console.log('sending chat to Redis');
      })
    })

  }

  goToProfile() {
    this.setState({
      chatSelected: false,
      currentFriend: null
    })

    if(document.getElementsByClassName('chatFriendListSelected')[0]) {
      let oldSelectedEntry = document.getElementsByClassName('chatFriendListSelected')[0];
      oldSelectedEntry.classList.remove('chatFriendListSelected');
    }
    let socket = this.props.socket;

    socket.emit('leavetextchatview', this.props.room, this.props.user.username);
    this.props.dispatch(userActions.createRoom(this.props.user.username));
  }


  goToUploadView() {

    this.context.router.push('/upload');
  }


  render() {
    let pic = this.props.user.profilePic || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAPFBMVEXl5+SXmZaUlpPo6ufh4+DP0c7b3dqRk5CjpaKfoZ7r7ere4N29v7zAwr+OkI2cnpupq6iytLHV19TIysevvj8CAAADjElEQVRoge2ay6KrMAhFjSTxXTX+/79eY21rq+YBRO/g7FFnqyAQQsiyP/3pvxdY3YHNMm3ULNNkV/4ByPQ0DkLkVkJUY6cv4kPTDWKBvjT/rlqTJaeD7Kot980Xo6kTk9ui2IOf9MdoEpoOpjww+UPvu3TwUbjQs4pBJqGDHDxka3qVwu+QBaCt3/nhoI+i+9Dvihse4vCX5dzwYLRNdc0KH8PRM7yUfGRQZwXlBD7yGd70Ueg53iYuOER5fFHF5HXQcR5fDG+ZDI83W4hec5DBxJPncOMxPCK1Nyo4vniDITOFeosyW4iBjs6c7YJLioyWWHRObmKgi0/ulT2Q2ZjkfqqnRrocsGiRGyJbxx4jGzY1y1BFbWUTSxtMBDbxFIeOwCZWF8BWNcsu72OLisau8elNZt9pN+l7U2ONkmPUgq4IbGrbdGdNpZwl1OaBcoY2VPaE7x2I6NnpWLM5OnS006mtQ/z99y2OHlmWKDTL3aDGldWCGuWLom/+VkyjB2gxX5weaYsQacaQ3E8hmraCb7oYG+psZtscjw11lonHCo8rbpzztVlVDJx8gn0pqnfim+yt8PYR7HHyxXsHDx438YzWviQDBy/cHrcKnPExpvYWHtIvp0HbYPd7ved9M9jCfSca/0PNB+4Jdv702rA7Dzvho6R39MPUMRyqcZ+mnA9EO9XOD54qwVa28zDNx5TP7+7RbpEy1Dy3lITZbWVcR+kjLbtxsvlPz3A2a6+0k77P7jvj3P1Ql7S2eNuHBP3SCy191+E+zX6LRXvbxbxMtFyjAzrVvEzRNNWqD1uumZh32QB0+ILLwLjLNtuhxiCjV7gYFcsiH9SZ6crQhaIXvSg7k9UkPEAzWywiyQs9F/2oGrT1UOv2cEEwmF+1GmU8SDUQwC98qaIzHuQU+5FP6VMUHUBV2Ln5Ab6awj0PCr3kcEIvA7spkC2Lt7/geRvk+LDaGU0Xkx9NeYV00z2mBxyTeBXOA9azeEuVa3sVdNT4EAM/O93B+HZ+6XBxbHlQX0KGn/Q1F6BtX3PEpqwXxMDHvccJL92R8H19TRziG/bvHkTIzJAN/nt7wW1E4tg/1zZ9HXqGf92V8U/sKPb3XfmiBFvZX06X1YXon2cNwoocSptI982HubVd03aPSfmVD5/hZ43f3sGp37CDH96Y9PiwnRO7JOz3FBDMlZXF6vM2j95hwbOXJPsHHK0uVxYc5/8AAAAASUVORK5CYII="
    const divStyle = {
      backgroundImage: 'url(' + pic + ')',
      backgroundPosition:'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }


    let context = this;
    let chat = context.props.currentChat.map((message) => <div><div className="oneChatMessage">{shortToUnicode(message, context.props.userEmojis, context.props.user.username)}</div></div>);


    let chatInputWindow;
    if(this.state.chatSelected) {
      chatInputWindow = <div className ="chatWrapper">
      <div className= "chatHeader">
      <h4>Chatting With: <b>{this.state.currentFriend.username}</b></h4>
      </div>
      <div className="chatWindow">

            <Scrollbars style={{ height: 700 }}>

              {chat}

            </Scrollbars>
          </div>
          <div className="chatInputWrapper">

          <div className="chatInputWindow">
            <form id="chatInput" onSubmit={(e)=>{e.preventDefault(); this.sendChat(document.getElementById("chatInputField").value); document.getElementById("chatInput").reset();}}>
              <input id="chatInputField"/>
              <button className="textChatButton">
                Send Chat
              </button>
            </form>
          </div>
          </div>
          </div>
    } else {
      chatInputWindow = <div className = "chatProfile">
      <div className ="chatProfileInfo">
        <div className = "oneFriend" style={divStyle} onClick={()=>{this.goToUploadView();}}>
          <div className="oneFriendWrapper">

          </div>
        </div>
        <div className="chatUserInfo">
          <div className="chatUserInfoEntry"><b>User Name:</b> {this.props.user.username}</div>
          <div className="chatUserInfoEntry"><b>Name:</b> <span>{this.props.user.firstName}</span><span> {this.props.user.lastName}</span></div>
          <div className="chatUserInfoEntry"><b>Coins:</b>{this.props.user.coin}</div>
          
        </div>
      </div>
    </div>
    }

    return (
      <div className="textChatWrapper">


          <div className="chatFriendsList">

            <Scrollbars style={{ height: 700 }}>
              <FriendsListContainer goToProfile={this.goToProfile.bind(this)}/>
            </Scrollbars>

          </div>
          {this.props.children}
        <div className="chatInputWrapper">
         {chatInputWindow} 
        </div>
      </div>
      )


  }

};


function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    room: state.userReducer.room,
    socket: state.userReducer.socket,
    friends: state.userReducer.friends,
    chatLog: state.userReducer.chatLog,
    currentChat: state.userReducer.currentChat,
    userEmojis: state.userReducer.userEmojis
  }
}

TextChatContainer.contextTypes = {
  router: PropTypes.object.isRequired
}



export default connect(mapStateToProps)(TextChatContainer);
