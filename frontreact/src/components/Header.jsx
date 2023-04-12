import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { Link, Outlet } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'

const tabs = [{
  route: "/",
  icon: faHome,
  label: "Início"
}]

const Header = (props) => {
  return (
    <>
      <nav className='navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top' role='navigation'>
        <div className='container-fluid'>
          <a className='navbar-brand'>When2Poll</a>
          <Nav className='ml-auto'>
            <Nav.Item>
              <Nav.Link to="/" className='nav-link'>
                Início
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </nav>
      <nav className='navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav' role='navigation'>
        <Nav className='w-100'>
          <div className='d-flex flex-row justify-content-around w-100'>
            {
              tabs.map((tab, index) => (
                <Nav.Item key={`tab-${index}`}>
                  <Nav.Link to={tab.route} className='nav-link bottom-nav-link' activeClassname="active">
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
      <Outlet />
    </>
    
  )
}

export default Header