import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useAxios from '../utils/useAxios';



const GroupsPage = () => {

  const [data, setData] = useState([])

  const api = useAxios()

  

  useEffect(async () => {


    const getGroupsList = async () => {
      const response = await api.get('/orgs/organizations/user/');
      console.log(response)
      setData(response.data)
    }

    getGroupsList()

  },[])

  return (
    <div>
        <nav className='navbar navbar-expand-md navbar-light d-none d-lg-block' role='navigation'>
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
        <nav className='navbar navbar-light d-block d-lg-none' role='navigation'>
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

        {data.map(item => (
          <div className='d-flex min-vw-100 justify-content-center align-items-center mt-2' >
            <Card style={{width: '80%'}}>
              <Card.Body className='text-center'>
                {item.name}
              </Card.Body>
              <Card.Footer className='text-center'>
                <Button className='text-center' variant="primary">Ver detalhes</Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
        
    </div>
  )
}

export default GroupsPage