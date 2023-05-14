import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faPlus, faEnvelope, faUsers} from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../context/AuthProvider'

const tabs = [{
  route: "/",
  icon: faHome,
  label: "Início"
}, {
  route: "/newpoll",
  icon: faPlus,
  label: "Nova Reunião"
}, {
  route: "/invites",
  icon: faEnvelope,
  label: "Convites"
}, {
  route: "/groups",
  icon: faUsers,
  label: "Grupos"
}]

const Header = (props) => {

  let {user, logoutUser} = useContext(AuthContext)


  return (
    <>
      <div>
        <nav  className='navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top' role='navigation'>
          <div className='container-fluid'>
            <a style={styles.links} className='navbar-brand font-face-sfbold'>When2Poll</a>
            <Nav className='ml-auto'>
              <Nav.Item>
                <Nav.Link style={styles.links} href="/" className='nav-link font-face-sfbold'>
                  Início
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={styles.links} href="/newpoll"  className='nav-link font-face-sfbold'>
                  Nova Reunião
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={styles.links} href='/invites'  className='nav-link font-face-sfbold'>
                  Convites
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={styles.links}  href='/groups'  className='nav-link font-face-sfbold'>
                  Grupos
                </Nav.Link>
              </Nav.Item>
              <Dropdown as={NavItem}>
                <Dropdown.Toggle style={styles.user} className='font-face-sfbold' as={NavLink}>{user?.full_name}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className='font-face-sfbold' onClick={logoutUser}>Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </div>
        </nav>

        <nav className='navbar sticky-top navbar-light d-block d-lg-none bottom-tab-nav' role='navigation'>
          <div className='container-fluid'>
            <a style={styles.links} className='navbar-brand font-face-sfbold'>When2Poll</a>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle style={styles.user} className='font-face-sfbold' as={NavLink}>{user?.full_name}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className='font-face-sfbold' onClick={logoutUser}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav className='w-100'>
            <div className='d-flex flex-row justify-content-around w-100'>
              
            </div>
          </Nav>
          </div>
        </nav>


        <nav className='navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav' role='navigation'>
          <Nav className='w-100'>
            <div className='d-flex flex-row justify-content-around w-100'>
              {
                tabs.map((tab, index) => (
                  <Nav.Item key={`tab-${index}`}>
                    <Nav.Link href={tab.route} className='nav-link bottom-nav-link' activeClassname="active">
                      <div className='row d-flex flex-column justify-content-center align-items-center'>
                        <FontAwesomeIcon color='#ff735c' size='lg' icon={tab.icon} />
                        <div style={styles.links} className='bottom-tab-label font-face-sfregular'>{tab.label }</div>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                ))
              }
            </div>
          </Nav>
        </nav>


      </div>
      <Outlet />
    </>
  );
}

const styles = {
  links: {
    color: "#ff735c"
  },
  user: {
    color: "#ffb638"
  },
  body: {
    backgroundColor: "#EEEEEE"
  }
}

export default Header