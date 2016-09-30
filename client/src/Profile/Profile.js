import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import {Grid, Row, Col, Nav, NavItem} from 'react-bootstrap'



const Profile = (props) => {


  return (

    <Grid>
      <Row className = "show-grid" id ="userProfileContainer">
        <div>
          <Col sm={4}><img id = "profilePhoto" src={props.user.profilePic ? props.user.profilePic : ""}/></Col>
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
      <Link to="/profile">All Friends</Link>
      <Link to="/online">Online</Link>
      <Link to="/suggested">You Should Talk to...</Link>
      </div>


    </Grid>
  )



}



export default Profile