import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import useMediaQuery from "@mui/material/useMediaQuery";
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import {createTheme, useTheme, ThemeProvider} from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useParams } from 'react-router-dom'
import React, {useState, useEffect, useContext} from 'react'
import useAxios from "../utils/useAxios";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const buttonTheme = createTheme({
    palette:{
        primary: {
            main: "#ff735c"
        }
    },
});

const PollPage = () => {
    const {user} = useContext(AuthContext)
    const [poll, setPoll] = useState(null);
    const api = useAxios();
    const {pollId} = useParams()
    const navigate = useNavigate()

    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

    async function setAdmin(admin,userId){
        const data = {
          admin: admin
        }
        const response = await api.put(`/polls/${pollId}/admin/set/${userId}/`, data)
        navigate(0)
    }

    useEffect(() => {
        const fetchPollData = async () => {
          const response = await api.get(`/polls/get/?poll_id=${pollId}`);
          setPoll(response.data);
        };
        fetchPollData();
    }, []);

    if (!poll) {
        return (
            <ThemeProvider theme={buttonTheme}>
                <CircularProgress 
                    size={40}
                />
            </ThemeProvider>
        );
    }
    
    return (
        <>
            {
                isMobileOrTablet &&
                <Container>
                    <ThemeProvider theme={buttonTheme}>
                        <Button onClick={()=>navigate("/")} variant="text">Back</Button>
                    </ThemeProvider>
                </Container>
            }
            <Container 
                sx={{
                    marginTop: '56px',
                    marginBottom: '56px',
                    paddingBottom: '56px', // Add additional padding at the bottom
                    // minHeight: 'calc(100vh - 56px)', // Set a minimum height to ensure content visibility
                }}
            >
                <Typography id="title" variant='h3' sx={{textAlign: 'center'}} gutterBottom>
                        {poll?.name}
                </Typography>
                <Typography id="description" variant='subtitle1' sx={{textAlign: 'center'}} gutterBottom>
                    {poll?.description}
                </Typography>
                <Typography id="description" variant='subtitle1' sx={{textAlign: 'center'}} gutterBottom>
                    Deadline: {poll?.deadline}
                </Typography>
                <TableContainer component={Paper}>
                    {user.user_id===poll.owner.pk ?
                        <Table aria-label="simple table">
                            <TableHead stickyHeader>
                                <TableRow>
                                    <TableCell>Full name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Admin</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    key={poll.owner.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{poll.owner.name}</TableCell>
                                    <TableCell align="right">{poll.owner.email}</TableCell>
                                    <TableCell align="right">Owner</TableCell>
                                    <TableCell align="right" padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        disabled 
                                        checked
                                    />
                                    </TableCell>
                                </TableRow>
                                {poll.participants.map((participant) => (
                                    <TableRow
                                        key={participant.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{participant.name}</TableCell>
                                        <TableCell align="right">{participant.email}</TableCell>
                                        {participant.admin ? 
                                            <TableCell align="right">Administrator</TableCell>
                                            :
                                            <TableCell align="right">Member</TableCell>
                                        }
                                        <TableCell align="right" padding="checkbox">
                                            <ThemeProvider theme={buttonTheme}>
                                                <Checkbox
                                                    id={participant.name}
                                                    color="primary"
                                                    onChange={()=> setAdmin(!participant.admin,participant.pk)} 
                                                    checked={participant.admin}
                                                />
                                            </ThemeProvider>
                                        </TableCell>                         
                                    </TableRow>
                                ))}
                                {poll.invited_users.map((invited) => (
                                    <TableRow
                                        key={invited.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{invited.name}</TableCell>
                                        <TableCell align="right">{invited.email}</TableCell>
                                        <TableCell align="right">Invited</TableCell>
                                        <TableCell align="right" padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                disabled 
                                            />
                                        </TableCell>                       
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        
                        :

                        <Table aria-label="simple table">
                            <TableHead stickyHeader>
                                <TableRow>
                                    <TableCell>Full name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    key={poll.owner.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{poll.owner.name}</TableCell>
                                    <TableCell align="right">{poll.owner.email}</TableCell>
                                    <TableCell align="right">Owner</TableCell>
                                </TableRow>
                                {poll.participants.map((participant) => (
                                    <TableRow
                                        key={participant.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{participant.name}</TableCell>
                                        <TableCell align="right">{participant.email}</TableCell>
                                        {participant.admin ? 
                                            <TableCell align="right">Administrator</TableCell>
                                            :
                                            <TableCell align="right">Member</TableCell>
                                        }                         
                                    </TableRow>
                                ))}
                                {poll.invited_users.map((invited) => (
                                    <TableRow
                                        key={invited.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{invited.name}</TableCell>
                                        <TableCell align="right">{invited.email}</TableCell>
                                        <TableCell align="right">Invited</TableCell>                     
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                    
                </TableContainer>
                { !isMobileOrTablet &&
                    <ThemeProvider theme={buttonTheme}>
                        <Fab
                            onClick={()=> navigate("/")}
                            color="primary"
                            aria-label="back"
                            sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            zIndex: 10, // Set a higher z-index value
                            }}
                        >
                            <ArrowBackIcon />
                        </Fab>
                    </ThemeProvider>
                }
            </Container>
        </>
    )
}

export default PollPage;