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
import Button from '@mui/material/Button';

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
    const [pollSlots, setPollSlots] = useState(null)

    const [availability, setAvailability] = useState([]);


    const api = useAxios()

    console.log(pollSlots)

    const createSlots = (start, end) => {
        const timeDiff = (end.getTime() - start.getTime())/1000/60
        const timeSlots = Math.floor(timeDiff/15)
        const result = []
        const currentTime = start
        while (currentTime <= end) {
            result.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
            currentTime.setMinutes(currentTime.getMinutes() + 15)
        }
        const timeDictionary = result.reduce((acc, time) => {
            acc.push({ [time]: 0 });
            return acc;
        }, [])

        return timeDictionary
    }

    useEffect(()=>{
        const fetchPollData = async () => {
            const response = await api.get(`/polls/invites/${pollInviteId}/poll/`)
            setPollData(response.data)
            setDateTimeRanges(response.data.datetime_ranges)
            let start = new Date(response.data.datetime_ranges[0]?.start_time)
            let end = new Date(response.data.datetime_ranges[0]?.end_time)
            setPollSlots(createSlots(start,end))
        }
        fetchPollData()
    },[])

    const handleAvailabilityChange = (day, startTime, endTime) => {
        // Update availability array
        setAvailability(prevAvailability => {
          const updatedAvailability = prevAvailability.filter(item => item.day !== day);
          const slots = calculateSlots(startTime, endTime, day);
          updatedAvailability.push({ day, slots });
          return updatedAvailability;
        });
    };

    const calculateSlots = (startTime, endTime, day) => {
        const slots = [];
        const start = new Date(startTime);
        const end = new Date(endTime);
    
        // Iterate over 15-minute intervals
        while (start <= end) {
          const time = start.getTime();
          slots.push({ time, available: isSlotAvailable(day, time) });
          start.setMinutes(start.getMinutes() + 15);
        }
    
        return slots;
    };

    const isSlotAvailable = (day, time) => {
        const daySlots = availability.find(item => item.day === day)?.slots;
        if (!daySlots) return false;
        return daySlots.some(slot => slot.time === time);
    };

    const handleTimeChange = (day, field, event) => {
        const { value } = event.target;
    
        // Update time slot in availability array
        setAvailability(prevAvailability =>
          prevAvailability.map(item => {
            if (item.day === day) {
              const updatedSlots = item.slots.map(slot => {
                const { time } = slot;
                return { time, available: isSlotAvailable(day, time) };
              });
              const updatedRange = calculateSlots(
                field === 'startTime' ? value : item.startTime,
                field === 'endTime' ? value : item.endTime,
                day
              );
              updatedRange.forEach(updatedSlot => {
                const index = updatedSlots.findIndex(slot => slot.time === updatedSlot.time);
                if (index !== -1) {
                  updatedSlots[index].available = updatedSlot.available;
                }
              });
              return { ...item, slots: updatedSlots, [field]: value };
            }
            return item;
          })
        );
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Log user responses
        console.log(availability)     
    };
    
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
            {pollData?.name}
        </Typography>
        <Typography variant='h5' sx={{textAlign: 'center'}} gutterBottom>
            {pollData?.description}
        </Typography>
        <Typography variant='subtitle1' sx={{textAlign: 'center'}} gutterBottom>
            Duration: {pollData?.duration}
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
                
                dateTimeRanges.map(item => {

                    let dateObjectStart = new Date(item.start_time)
                    let dateObjectEnd = new Date(item.end_time)
                    let day = dateObjectStart.getDate().toString().padStart(2, "0");
                    let month = (dateObjectStart.getMonth() + 1).toString().padStart(2, "0");
                    let year = dateObjectStart.getFullYear();
                    let formattedDate = `${day}/${month}/${year}`;

                    let start_hours = dateObjectStart.getHours().toString().padStart(2, "0");
                    let start_minutes = dateObjectStart.getMinutes().toString().padStart(2, "0");
                    let end_hours = dateObjectEnd.getHours().toString().padStart(2, "0");
                    let end_minutes = dateObjectEnd.getMinutes().toString().padStart(2, "0");
                    let start_Time = `${start_hours}:${start_minutes}`;
                    let end_Time = `${end_hours}:${end_minutes}`;

                    const timeDiff = (dateObjectEnd.getTime() - dateObjectStart.getTime())/1000/60

                    const timeSlots = Math.floor(timeDiff/15)
                    const daySlotsArray = new Array(timeSlots).fill(0);


                    
                    return (
                        <>
                            <h1>Date: {formattedDate}</h1>
                            <p>Choose your availability for this day:</p>
                            <label>
                                <input
                                type="checkbox"
                                onChange={event =>
                                    handleAvailabilityChange(item.id, item.start_time, item.end_time, event)
                                }
                                />
                                Available
                            </label>
                            {availability.some(avail => avail.day === item.id) && (
                                <div>
                                <label>
                                    Start Time:
                                    <input
                                    type="time"
                                    onChange={event => handleTimeChange(item.id, 'startTime', event)}
                                    />
                                </label>
                                <label>
                                    End Time:
                                    <input
                                    type="time"
                                    onChange={event => handleTimeChange(item.id, 'endTime', event)}
                                    />
                                </label>
                                </div>
                            )}
                           
                        </>
                    )
                })
                
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
                <Button
                    // type="submit"
                    variant="contained"
                    fullWidth
                    id='submit'
                    onClick={handleSubmit}
                    sx={{ mt: 10, mb: 2, width: 1}}
                >
                    Answer poll
                </Button>  
            </Box>
        </ThemeProvider>
    </Container>
    )
}

export default PollAnswerPage