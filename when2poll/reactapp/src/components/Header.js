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
        <nav className='navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top' role='navigation'>
          <div className='container-fluid'>
            <a className='navbar-brand'>When2Poll</a>
            <Nav className='ml-auto'>
              <Nav.Item>
                <Nav.Link href="/" className='nav-link'>
                  Início
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/newpoll"  className='nav-link'>
                  Nova Reunião
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/invites'  className='nav-link'>
                  Convites
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/groups'  className='nav-link'>
                  Grupos
                </Nav.Link>
              </Nav.Item>
              <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>{user?.full_name}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logoutUser}>Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </div>
        </nav>

        <nav className='navbar sticky-top navbar-light d-block d-lg-none bottom-tab-nav' role='navigation'>
          <div className='container-fluid'>
            <a className='navbar-brand'>When2Poll</a>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>{user?.full_name}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logoutUser}>Sair</Dropdown.Item>
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
                        <FontAwesomeIcon size='lg' icon={tab.icon} />
                        <div className='bottom-tab-label'>{tab.label }</div>
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

export default Header