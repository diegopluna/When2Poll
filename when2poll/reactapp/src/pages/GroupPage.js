import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import { useParams } from 'react-router-dom'
import useAxios from '../utils/useAxios'

const GroupPage = () => {

    const [data, setData] = useState(null)
    const [ownerData, setOwnerData] = useState(null)
    const [members, setMembersData] = useState([])
    const [invited, setInvited] = useState([])
    const {groupId} = useParams()

    const api = useAxios()

    useEffect(() => {
        async function fetchPageData() {
            await api.get(`/orgs/organizations/${groupId}/`)
                .then(response => {
                    setData(response.data)
                    return response.data
                })
                .then(data => {
                   return api.get(`/api/users/${data.owner}/`)
                })
                .then(response=> {
                    setOwnerData(response.data)
                    return(response.data)
                })
                .then((data) => {
                    return api.get(`/orgs/organizations/${groupId}/members/`)
                })
                .then(response => {
                    console.log(response)
                    setMembersData(response.data)
                    return response.data
                })
                .then((data) => {
                    return api.get(`/orgs/organizations/${groupId}/invited/`)
                })
                .then(response => {
                    console.log(response)
                    setInvited(response.data)
                    return response.data
                })
        }

        fetchPageData()

    },[])

  return (
    <div>

        <nav className='navbar navbar-expand-md navbar-light d-none d-lg-block' role='navigation'>
          <div className='container-fluid'>
          <a className='navbar-brand'>{data?.name}</a>
            <Nav className='ml-auto'>
              <Nav.Item>
                <Nav.Link href="/groups" className='nav-link'>
                  Voltar
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
                  <Nav.Link href="/groups" className='nav-link'>
                    Voltar
                  </Nav.Link>
                </Nav.Item>
              </div>
            </Nav>
          </div>
        </nav>
        <div className='d-flex min-vw-100 justify-content-center align-items-center' >
          <div  style={styles.login} >
                <h1 className='display-1 text-center' style={styles.title} >{data?.name}</h1>
                <p className='h3 text-center mt-2'>{data?.description}</p>
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col">{ownerData?.full_name}</th>
                            <th scope="col">{ownerData?.email}</th>
                            <th scope="col">Criador</th>
                        </tr>
                        {members.map(item => (
                            <tr>
                                <th scope="col">{item.full_name}</th>
                                <th scope="col">{item.email}</th>
                                <th scope="col">Membro</th>
                            </tr>
                        ))}
                        {invited.map(item => (
                            <tr>
                                <th scope="col">{item.full_name}</th>
                                <th scope="col">{item.email}</th>
                                <th scope="col">Convidado</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
          </div>
      </div>
    </div>
  )
}

const styles = {
    body: {
      backgroundColor: '#222831'
    },
    login: {
      width: "360px",
      height: "min-content",
      padding: "20px",
    //   borderRadius: "12px",
    //   backgroundColor: '#393E46'
    },
    title: {
      fontSize: "36px",
      marginBottom: "25px",
    //   color:'#EEEEEE'
    },
    form: {
      fontSize: "20px"
    },
    formGroup: {
      marginBottom: "12px"
    },
    button: {
      backgroundColor: "#00ADB5"
    },
    remember: {
      color: '#EEEEEE'
    },
    desc : {
        resize: 'none'
    }
  }

export default GroupPage