import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import firebase from '../firebase'
import React from 'react'

function NavBar(props) {
  return (
    <Navbar collapseOnSelect expand="xl" fixed="top" bg="dark" variant="dark">
      <Navbar.Brand href="/userHome">
        <i className="fas fa-feather" />
        {'      '} Flock
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" />
        <Nav>
          <Nav.Link
            eventKey={2}
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(function() {})
                .catch(function(error) {
                  console.log(error)
                })
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
