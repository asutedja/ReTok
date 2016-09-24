import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import {Grid, Row, Col, Nav, NavItem} from 'react-bootstrap'



const Profile = (props) => {

  // const divStyle = {
  //   backgroundImage: 'url(' +props.userFacebook.profilePhotoUrl+ ')',
  //   backgroundPosition:'center',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat'
  // }


  //hardcoding data for now.
  return (

    <Grid>
      <Row className = "show-grid" id ="userProfileContainer">
        <div>
          <Col sm={4}><img id = "profilePhoto" src='http://az616578.vo.msecnd.net/files/2016/03/26/6359460153364648721927328923_cover.jpg'/></Col>
        </div>
        <Col sm={8}>
        <Row className ="show-grid profileRow">
          <span><b>Name:</b> Jane Doe</span>
        </Row>
          <Row className ="show-grid profileRow">
            <span><b>Email:</b> JaneDoe@gmail.com</span>
          </Row>
          <Row className ="show-grid profileRow">
            <span><b>Birthday:</b> 9/30/1990</span>
          </Row>
          <Row className ="show-grid profileRow">
            <span><b>Friends Count:</b>1</span>
          </Row>
        </Col>
      </Row>
      <div className= "profileNav">
      <Link to="/">All Friends</Link>
      <Link to="/recent">Recent</Link>
      <Link to="/suggested">You Should Talk to...</Link>
      </div>


    </Grid>
  )



}



export default Profile