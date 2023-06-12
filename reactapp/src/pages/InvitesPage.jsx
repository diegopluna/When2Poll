import React, { useState, useEffect } from 'react'
import useAxios from '../utils/useAxios'
import { useNavigate} from 'react-router-dom'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { styled, createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const buttonTheme = createTheme({
    palette:{
        primary: {
            main: "#ff735c"
        }
    },
});

const InvitesPage = () => {

    const [groupInvites, setGroupInvites] = useState([])
    const [pollInvites, setPollInvites] = useState([])
    const [pollData, setPollData] = useState({})
    const [orgData, setOrgData] = useState({})
    const api = useAxios()

    const navigate = useNavigate()

    async function rejectPollInvite(pollInviteId) {
        await api.get(`/polls/invites/${pollInviteId}/reject/`)
        navigate(0)
    }

    async function acceptPollInvite(pollInviteId) {
        await api.get(`/polls/invites/${pollInviteId}/accept/`)
        navigate(`/answerpoll/${pollInviteId}`)
    }

    async function acceptInvite(inviteId) {
        await api.get(`/orgs/invitation/${inviteId}/accept/`)
        navigate(0)
    }

    async function rejectInvite(inviteId) {
        await api.get(`/orgs/invitation/${inviteId}/reject/`)
        navigate(0)
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
        <Container 
            sx={{
                marginTop: '56px',
                marginBottom: '56px',
                paddingBottom: '56px', // Add additional padding at the bottom
                // minHeight: 'calc(100vh - 56px)', // Set a minimum height to ensure content visibility
            }}
        >
            {(groupInvites.length > 0 || pollInvites.length > 0) ?

                <Stack spacing={2}>
                {groupInvites.map(item=> (
                    <Item elevation={8}>
                        <CardHeader 
                            title = {orgData[item.organization]?.name}
                            subheader = "Group"
                        />
                        <CardActions disableSpacing>
                            <IconButton  
                                sx={{
                                    marginLeft: 'auto', 
                                    ":hover": {
                                        color: "#ff735c"
                                    }}} 
                                onClick={() => rejectInvite(item.id)}
                                id={`reject${orgData[item.organization]?.name}`}
                            >
                                <CloseIcon />
                            </IconButton>
                            <IconButton 
                                sx={{ 
                                    ":hover": {
                                        color: "#ff735c"
                                    }}} 
                                onClick={() => acceptInvite(item.id)}
                                id={`accept${orgData[item.organization]?.name}`}
                            >
                                <CheckIcon />
                            </IconButton>
                        </CardActions>
                    </Item>
                ))}
                {pollInvites.map(item=> (
                    <Item elevation={8}>
                        <CardHeader 
                            title = {pollData[item.poll]?.name}
                            subheader = {`Poll - Answer until ${pollData[item.poll]?.deadline}`}
                        />
                        <CardActions disableSpacing>
                            <IconButton  
                                sx={{
                                    marginLeft: 'auto', 
                                    ":hover": {
                                        color: "#ff735c"
                                    }}} 
                                id={`reject${pollData[item.poll]?.name}`}
                                onClick={()=> rejectPollInvite(item.id)}
                            >
                                <CloseIcon />
                            </IconButton>
                            <IconButton 
                                sx={{ 
                                    ":hover": {
                                        color: "#ff735c"
                                    }}}                                
                                id={`accept${pollData[item.poll]?.name}`}
                                onClick={()=> acceptPollInvite(item.id)}
                            >
                                <CheckIcon />
                            </IconButton>                        
                        </CardActions>
                    </Item>
                ))}
                </Stack>
                :
                <Typography variant='h6' sx={{textAlign: 'center'}} color="#ff735c" gutterBottom>
                    No invites found!
                </Typography>
            }
            
        </Container>
    )
}

export default InvitesPage;