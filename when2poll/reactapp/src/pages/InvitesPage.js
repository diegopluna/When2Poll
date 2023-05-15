import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import useAxios from '../utils/useAxios'


const InvitesPage = () => {

  const [groupInvites, setGroupInvites] = useState([])
  const [orgData, setOrgData] = useState({})
  const api = useAxios()

  async function acceptInvite(inviteId) {
    await api.get(`/orgs/invitation/${inviteId}/accept/`)
    window.location.reload(true)
  }

  async function rejectInvite(inviteId) {
    await api.get(`/orgs/invitation/${inviteId}/reject/`)
    window.location.reload(true)
  }

  async function getOrgData(groupId) {
    const response = await api.get(`/orgs/organizations/${groupId}/`)
    setOrgData((prevOrgData) => ({ ...prevOrgData, [groupId]: response.data }))
  }

  useEffect(() => {

    const getGroupInvitesList = async () => {
      const response = await api.get('/orgs/user/invites/');
      setGroupInvites(response.data)
    }

    getGroupInvitesList()
  },[])

  useEffect(() => {
    groupInvites.forEach((invite) => {
      if(!orgData[invite.organization]) {
        getOrgData(invite.organization)
      }
    })
  }, [groupInvites, orgData])

  return (
    <div className='vh-100' style={styles.body}>
      <nav  className='navbar navbar-expand-md navbar-light d-none d-lg-block' role='navigation'>
        <div className='container-fluid'>
          <a style={styles.links} className='navbar-brand font-face-sfbold'>Convites</a>
        </div>
      </nav>

      {groupInvites.map(item => (
        <div className='d-flex min-vw-90 justify-content-center align-items-center mt-2' key={item.id} >
          <Card style={{width: '80%'}}>
            <Card.Body className='text-center font-face-sfregular'>
              {orgData[item.organization]?.name}
            </Card.Body>                      
            <Card.Footer className='text-center button'>
              <Dropdown >
                <Dropdown.Toggle name={orgData[item.organization]?.name} style={styles.button} variant='success' id = "dropdown-basic">
                  Ação
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className='font-face-sfregular' onClick={() => acceptInvite(item.id)}>Aceitar</Dropdown.Item>
                  <Dropdown.Item className='font-face-sfregular' onClick={() => rejectInvite(item.id)}>Recusar</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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

export default InvitesPage