import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useAxios from '../utils/useAxios';



const GroupsPage = () => {

  const [data, setData] = useState([])

  const api = useAxios()

  

  useEffect( () => {


    const getGroupsList = async () => {
      const response = await api.get('/orgs/organizations/user/');
      setData(response.data)
    }

    getGroupsList()

  },[])

  return (
    <div className='vh-100' style={styles.body}>
        <nav className='navbar navbar-expand-md navbar-light d-none d-lg-block' role='navigation'>
          <div className='container-fluid'>
          <a style={styles.links} className='navbar-brand font-face-sfbold'>Grupos</a>
            <Nav className='ml-auto'>
              <Nav.Item>
                <Nav.Link style={styles.links} href="/newgroup" className='nav-link font-face-sfbold'>
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
                  <Nav.Link style={styles.links} href="/newgroup" className='nav-link font-face-sfbold'>
                    Novo Grupo
                  </Nav.Link>
                </Nav.Item>
              </div>
            </Nav>
          </div>
        </nav>

        {data.map(item => (
          <div className='d-flex min-vw-90 justify-content-center align-items-center mt-2' >
            <Card style={{width: '80%'}}>
              <Card.Body className='text-center font-face-sfbold'>
                {item.name}
              </Card.Body>                      
              <Card.Footer className='text-center'>
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    window.location.href=`/group/${item.id}/`
                  }} 
                  type='submit' 
                  name={item.name} 
                  className='btn btn-sucess font-face-sfbold' 
                  style={styles.button}>
                    Ver detalhes
                  </button>
              </Card.Footer>
            </Card>
          </div>
        ))}
        
    </div>
  )
}

const styles = {
  body: {
    backgroundColor: '#EEEEEE'
  },
  login: {
    width: "360px",
    height: "min-content",
    padding: "20px",
    // borderRadius: "12px",
    // backgroundColor: '#393E46'
  },
  title: {
    fontSize: "36px",
    marginBottom: "25px",
    // color:'#EEEEEE'
  },
  form: {
    fontSize: "20px",
  },
  formGroup: {
    marginBottom: "12px",
  },
  button: {
    backgroundColor: "#ff735c",
    color: "#000000",
    border: "1px solid #ff735c",
    borderRadius: "7px"
  },
  remember: {
    // color: '#EEEEEE'
  },
  links: {
    color: "#ff735c"
  },
}

export default GroupsPage