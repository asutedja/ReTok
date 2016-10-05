import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars';
import io from 'socket.io-client'
import * as userActions from '../../Redux/userReducer'
import EmojiChat from './EmojiChat'
import {emojify} from 'react-emojione';


class EmojiChatContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {

    let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});


    let optionsUserEmoji = {

      method: 'POST',
      headers: myHeaders,
      body: `
        {  
          getEmoji(username: \"${this.props.user.username}\")
          {
            emoji
            price
              }
        }`
    };


    fetch('/graphql', optionsUserEmoji).then((res) =>{
      return res.json().then((data) => {
        console.log('checking data for user emoji', data);
        this.props.dispatch(userActions.updateUserEmojis(data.data.getEmoji));

      })
      })    


    console.log('checking emojis for users', this.props.userEmojis);
  }

  useEmojiChat(emoji) {
    console.log('what is emoji', emoji);
    var inputEmoji=emojify(emoji, {output: 'unicode'});
    document.getElementById('chatInputField').value+=inputEmoji;
  }


  render() {

    return (
      <div className="emojiChatContainer">
      {this.props.userEmojis.map((item, index) => <EmojiChat key={index} index={index} emoji={item} useEmojiChat={this.useEmojiChat.bind(this)}/>)}
      </div>
    )


  }

};


function mapStateToProps(state) {
  return {

    room: state.userReducer.room,
    userEmojis: state.userReducer.userEmojis,
    user: state.userReducer.user,

  }
}

export default connect(mapStateToProps)(EmojiChatContainer);

