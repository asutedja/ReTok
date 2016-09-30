import React, { PropTypes }  from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import * as userActions from '../Redux/userReducer'
import {emojify} from 'react-emojione';

class StoreContainer extends React.Component {
	constructor(props) {
		super(props)
	}
	//TODO: Finish Store:
	render() {
		return (
			<div>
			{ 
				// () =>  {
				// 	for(var key in emojis) {
				// 		if(emojis[key]) {
	   //    				<Item item={emojify(key)}/>			
				// 		}
				// 	}	
				// }
			}
			</div>
			)
	}
}

function mapStateToProps(state) {
  return {
  		//TODO: Configure server and database to know what kind of object I get back for emojis
  	 emojis: state.userReducer.emojis
  }
}


export default connect(mapStateToProps)(StoreContainer)