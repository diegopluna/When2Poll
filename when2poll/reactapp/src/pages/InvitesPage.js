import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import useAxios from '../utils/useAxios'

const InvitesPage = () => {

  const [groupInvites, setGroupInvites] = useState([])
  const [orgData, setOrgData] = useState(null)

  const api = useAxios()

  async function acceptInvite(inviteId) {
    await api.get(`invitation/${inviteId}/accept/`)
  }

  async function getOrgData(groupId) {
    const response = await api.get(`/orgs/organizations/${groupId}/`)
    setOrgData(response.data)
  }

  useEffect(async () => {

    const getGroupInvitesList = async () => {
      const response = await api.get('/orgs/user/invites/');
      setGroupInvites(response.data)
    }

    getGroupInvitesList()

  },[])

  return (
    <div>
        <nav className='navbar navbar-expand-md navbar-light d-none d-lg-block' role='navigation'>
          <div className='container-fluid'>
          <a className='navbar-brand'>Convites</a>
          </div>
        </nav>

        {groupInvites.map(item => {

          getOrgData(item.organization)

          return (
            <div className='d-flex min-vw-90 justify-content-center align-items-center mt-2' >
            <Card style={{width: '80%'}}>
              <Card.Body className='text-center'>
                {orgData?.name}
              </Card.Body>                      
              <Card.Footer className='text-center'>
                {/* <button  className='text-center' variant="primary" onClick={acceptInvite(item.id)}>Aceitar Convite</button> */}
              </Card.Footer>
            </Card>
          </div>
          )    
          })}
    </div>
  )
}

export default InvitesPage