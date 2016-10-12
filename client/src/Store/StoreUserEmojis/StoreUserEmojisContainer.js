import React, { PropTypes }  from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import * as userActions from '../../Redux/userReducer'
import {emojify} from 'react-emojione';
import StoreUserEmoji from './StoreUserEmoji.js'
import axios from 'axios'


class StoreUserEmojisContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

    axios.get('/auth')
      .then(function(res) {
        console.log('checking auth res data',res.data);

        if(!res.data) {
          this.context.router.push('/');
        }
      })
    
    console.log('hit the store user emoji container');
  }


  render() {
    return (
      <div className="storeEmojisContainer">
      {this.props.userEmojis.map((item, index) => <StoreUserEmoji key={index} index={index} emoji={item}/>)}
      </div>
      )
  }
}


function mapStateToProps(state) {
  return {
    userEmojis: state.userReducer.userEmojis,
    user: state.userReducer.user,

  }
}



export default connect(mapStateToProps)(StoreUserEmojisContainer)
