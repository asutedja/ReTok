import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import {Grid, Row, Col, Nav, NavItem} from 'react-bootstrap'



const Profile = (props) => {


  return (

    <Grid>
      <Row className = "show-grid" id ="userProfileContainer">
        <div>
          <Col sm={4}><img id = "profilePhoto" onClick={(e)=>{e.preventDefault(); props.goToUploadView();}} src={props.user.profilePic ? props.user.profilePic : "http://cdn.curvve.com/wp-content/uploads/2013/10/anonymous_user_profile.jpg"}/></Col>
        </div>
        <Col sm={8}>
        <Row className ="show-grid profileRow">
          <span><b>Name: </b>{props.user.firstName}</span>
        </Row>
          <Row className ="show-grid profileRow">
            <span><b>Email: </b>{props.user.email}</span>
          </Row>
          <Row className ="show-grid profileRow">
            <span><b>User Name:</b>{props.user.username}</span>
          </Row>
          <Row className ="show-grid profileRow">
            <span><b>Friends Count:</b>{props.friendCount}</span>
          </Row>
        </Col>
      </Row>
      <div className= "profileNav">
      <Link to="/profile" className="subNavLinks">All Friends</Link>
      <Link to="/online" className="subNavLinks">Online</Link>
      <Link to="/suggested" className="subNavLinks">You Should Talk to...</Link>
      </div>


    </Grid>
  )



}



export default Profile