import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {createTheme, useTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import useAxios from '../utils/useAxios';




const buttonTheme = createTheme({
    palette:{
        primary: {
            main: "#ff735c"
        }
    },
});

const defaultTheme = createTheme({
    palette: {
        background:{
            paper: '#FFFFFF',
            default: '#FFFFFF'
        },
        primary:{
            main: '#ff735c'
        },
        secondary:{
            main: '#ffb638'
        }
    },
});

const PollAnswerPage = () => {

    const {pollInviteId} = useParams()

    const [available, setAvailable] = useState(true);
    const [justification, setJustification] = useState('')

    const [pollData, setPollData] = useState(null)
    const [dateTimeRanges, setDateTimeRanges] = useState([])

    const api = useAxios()

    console.log(pollData)

    useEffect(()=>{
        const fetchPollData = async () => {
            const response = await api.get(`/polls/invites/${pollInviteId}/poll/`)
            setPollData(response.data)
            setDateTimeRanges(response.data.datetime_ranges)
        }
        fetchPollData()
    },[])
    
    return (
    <Container 
        sx={{
            marginTop: '56px',
            marginBottom: '56px',
            paddingBottom: '56px', // Add additional padding at the bottom
            // minHeight: 'calc(100vh - 56px)', // Set a minimum height to ensure content visibility
        }}
    >
        <Typography variant='h3' sx={{textAlign: 'center'}} gutterBottom>
            Answer poll: {pollData?.name}
        </Typography>
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box component="form" noValidate sx={{ mt: 1, justifyContent: 'center', alignItems: 'center', display:"flex", flexDirection: 'column'}} >
            <FormControlLabel
                value={available}
                control={<Switch onChange={() => setAvailable(!available)} defaultChecked color="primary" />}
                label="Available"
                labelPlacement="start"
            />
            {available ? 
                dateTimeRanges.map(item => (
                    <h1>{item.start_time}</h1>
                ))
                :
                <TextField
                    id="answerJustification"
                    label="Justify unavailability"
                    name='justification'
                    fullWidth
                    multiline
                    rows={4}
                    value={justification}
                    onChange={e=>setJustification(e.target.value)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto', // Add this line to center horizontally
                    }}
                />
            }
            </Box>
        </ThemeProvider>
    </Container>
    )
}

export default PollAnswerPage