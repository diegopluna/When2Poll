import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import useAxios from '../utils/useAxios'
import Button from 'react-bootstrap/esm/Button';


const InvitesPage = () => {

  const [groupInvites, setGroupInvites] = useState([])
  const [pollInvites, setPollInvites] = useState([])
  const [pollData, setPollData] = useState({})
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

  async function getPollData(pollId) {
    const response = await api.get(`/polls/${pollId}`)
    setPollData((prevPollData) => ({ ...prevPollData, [pollId]: response.data }))
  }

  useEffect(() => {

    const getGroupInvitesList = async () => {
      const response = await api.get('/orgs/user/invites/');
      setGroupInvites(response.data)
    }

    const getPollInvitesList = async () => {
      const response = await api.get('/polls/invites/')
      setPollInvites(response.data)
    }

    getGroupInvitesList()
    getPollInvitesList()
  },[])

  useEffect(() => {
    groupInvites.forEach((invite) => {
      if(!orgData[invite.organization]) {
        getOrgData(invite.organization)
      }
    })

    pollInvites.forEach((invite) => {
      if(!pollData[invite.poll]) {
        getPollData(invite.poll)
      }
    })

  }, [groupInvites, orgData, pollInvites, pollData])

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
            <Card.Body className='text-center font-face-sfbold'>
              Grupo: {orgData[item.organization]?.name}
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
      {pollInvites.map(item => (
        <div className='d-flex min-vw-90 justify-content-center align-items-center mt-2' key={item.id}>
          <Card style={{width: '80%'}}>
            <Card.Body className='text-center font-face-sfbold'>
              Reunião: {pollData[item.poll]?.name}
            </Card.Body>
            <Card.Footer className='text-center button'>
              <p className='font-face-sfregular'>Responder até: {pollData[item.poll]?.deadline}</p>
              <Button className='font-face-sfregular' style={styles.button} onClick={() => window.location.href = `/invites/poll/${item.poll}`}>Responder</Button>
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
  answerBtn: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    border: "1px solid #FFFFFF",
    borderRadius: "7px"
  }
}

export default InvitesPage