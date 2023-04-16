import React from 'react'
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink';


const GroupsPage = () => {
  return (
    <div>
        <nav className='navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top' role='navigation'>
          <div className='container-fluid'>
          <a className='navbar-brand'>Grupos</a>
            <Nav className='ml-auto'>
              <Nav.Item>
                <Nav.Link href="/newgroup" className='nav-link'>
                  Novo Grupo
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </nav>
        <nav className='navbar sticky-top navbar-light d-block d-lg-none bottom-tab-nav' role='navigation'>
          <div className='container-fluid'>
            <Nav className='w-100'>
              <div className='d-flex flex-row justify-content-around w-100'>
                <Nav.Item>
                  <Nav.Link href="/newgroup" className='nav-link'>
                    Novo Grupo
                  </Nav.Link>
                </Nav.Item>
              </div>
            </Nav>
          </div>
        </nav>
        
        <p>Groups</p>
    </div>
  )
}

export default GroupsPage