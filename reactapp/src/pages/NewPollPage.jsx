import React, { useState, useEffect, Fragment } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {createTheme, useTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatePicker, { DateObject, Calendar } from "react-multi-date-picker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import "react-multi-date-picker/styles/layouts/mobile.css"
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';


import useAxios from '../utils/useAxios';



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

const NewPollPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateRanges, setDateRanges] = useState([[]]);
    const [earliestRaw, setEarliestRaw] = useState('')
    const [earliest, setEarliest] = useState('')
    const [latest, setLatest] = useState('')
    const [latestRaw, setLatestRaw] = useState('')
    const [durationRaw, setDurationRaw] = useState('')
    const [duration, setDuration] = useState('')
    const [timeError, setTimeError] = useState('')
    const [deadline, setDeadline] = useState('')
    const [displayDeadline, setDisplayDeadline] = useState('')
    const [selectedGroups, setSelectedGroups] = useState([])
    const [options, setOptions] = useState([])
    const [open, setOpen] = useState(false);


    const loading = open && options.length === 0;
    const api = useAxios()

    useEffect(() => {
        let active = true;
    
        if (!loading) {
          return undefined;
        }
    
        (async () => {
            const response = await api.get('/orgs/organizations/user/');
    
            if (active) {
                setOptions(response.data);
            }
        })();
    
        return () => {
          active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
          setOptions([]);
        }
    }, [open]);

    const handleDateChange = (value) => {
        setDateRanges(value)
        handleDeadline()
    }

    const handleDurationChange = (value) => {
        setDurationRaw(value)
        const date = new Date(value.toString())
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        setDuration(formattedTime);
        validateTimes(earliest, latest, formattedTime);
    };

    const handleEarliestChange = (value) => {
        setEarliestRaw(value)
        const date = new Date(value.toString())
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        setEarliest(formattedTime);
        validateTimes(earliest, latest, formattedTime);
    };

    const handleLatestChange = (value) => {
        setLatestRaw(value)
        const date = new Date(value.toString())
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        setLatest(formattedTime);
        validateTimes(earliest, formattedTime, duration);
    };

    const handleDeadline = () => {
        let earliestDate = new Date(dateRanges[0][0]);
        for (const range of dateRanges) {
          const startDate = new Date(range[0]);
          if (startDate < earliestDate) {
            earliestDate = startDate;
          }
        }
    
        earliestDate.setDate(earliestDate.getDate() - 1);
        const year = earliestDate.getFullYear();
        const month = ('0' + (earliestDate.getMonth() + 1)).slice(-2);
        const date = ('0' + earliestDate.getDate()).slice(-2);
        const deadline = `${year}-${month}-${date}T${earliest}`;
        const displayDeadline = `${date}/${month}/${year} - ${earliest}`
    
        setDeadline(deadline);
        setDisplayDeadline(displayDeadline);
    }

    const validateTimes = (start, end, dur) => {
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);
        const [durHour, durMinute] = dur.split(':').map(Number);
    
        if (startHour > endHour || (startHour === endHour && startMinute > endMinute)) {
          setTimeError("The earliest time can't be later than the latest time.");
          return;
        }
    
        const rangeInMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
        const durationInMinutes = durHour * 60 + durMinute;
    
        if (durationInMinutes > rangeInMinutes) {
          setTimeError("The duration cannot exceed the time margin");
          return;
        }
    
        setTimeError('');
        handleDeadline()
    }

    const getParticipantIds = async (selectedGroups) => {
        let participantsTemp = []
        for (const group of selectedGroups) {
          const response = await api.get(`/orgs/organizations/${group.id}/membersonly/`);
          const participants = response.data;
          // participantsTemp = [...participantsTemp, ...participants.map(participant => participant.id)];
          participantsTemp = [...participantsTemp, ...participants.map(participant => ({ receiver: participant.id }))];
        }
        //participantsTemp = [...new Set(participantsTemp)];
    
        return participantsTemp
    }

    const handleSubmit = async (e ) => {
        e.preventDefault()

        
    
        const datetimeRangesData = dateRanges.flatMap(range => {
          const [startDate, endDate] = range;
          const start = new Date(startDate);
          const end = new Date(endDate);
          const result = [];
          for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
            const dateString = date.toISOString().split('T')[0];
            result.push({
              start_time: new Date(dateString + 'T' + earliest + 'Z').toISOString().slice(0,16)+'Z',
              end_time: new Date(dateString + 'T' + latest + 'Z').toISOString().slice(0,16)+'Z'
            });
          }
          return result;
        });
    
        let participantIds = await getParticipantIds(selectedGroups)
    
        if (deadline) {
          let deadlineAux = new Date(deadline).toISOString().slice(0,16) + 'Z';
          setDeadline(deadlineAux);
        } else {
            console.log('Invalid deadline value:', deadline);
        }
    
        const data = {
          name:title,
          description,
          duration,
          datetime_ranges: datetimeRangesData,
          invited: participantIds,
          deadline
        }
        const verify = await api.post('/polls/post/', data);
    
        setTitle('')
        setDescription('')
        setEarliest('')
        setEarliestRaw('')
        setLatest('')
        setLatestRaw('')
        setDuration('')
        setDurationRaw('')
        setDeadline('')
        setDateRanges([[]])
        setSelectedGroups([])
    }

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
                New Poll
            </Typography>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1, justifyContent: 'center', alignItems: 'center', display:"flex", flexDirection: 'column'}} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="pollTitle"
                        label="Poll title"
                        name="title"
                        autoComplete="name"
                        autoFocus
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    />
                    <TextField
                        id="pollDescription"
                        label="Poll description"
                        name='description'
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto', // Add this line to center horizontally
                        }}
                    />
                    <Typography variant='h6' sx={{textAlign: 'center'}} gutterBottom>
                        Date selection
                    </Typography>
                    <Calendar
                        id='newPollCalendar'
                        className='rmdp-mobile red'
                        value={dateRanges}
                        onChange={handleDateChange}
                        range
                        multiple
                        style={{marginBottom:20}}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker 
                            ampm={false} 
                            className='duration'
                            label="Poll duration"
                            value={durationRaw}
                            onChange={(newValue) => handleDurationChange(newValue)} 
                            sx={{
                                mb:3
                            }} 
                        />
                        <TimePicker 
                            ampm={false} 
                            className='earliest'
                            label="Earliest time to start the poll"
                            value={earliestRaw}
                            onChange={(newValue) => handleEarliestChange(newValue)} 
                            sx={{
                                mb:3
                            }} 
                        />
                        <TimePicker 
                            ampm={false} 
                            className='latest'
                            label="Latest time to end the poll"
                            value={latestRaw}
                            onChange={(newValue) => handleLatestChange(newValue)}
                            sx={{
                                mb:3
                            }} 
                        />
                    </LocalizationProvider>
                    <Typography variant='subtitle' sx={{textAlign: 'center', color: 'red'}} gutterBottom>
                        {timeError}
                    </Typography>
                    <Typography variant='h6' sx={{textAlign: 'center'}} gutterBottom>
                        Answer until: {displayDeadline}
                    </Typography>
                    <Autocomplete 
                        id='inviteGroups' 
                        sx={{ width: 300 }}
                        value={selectedGroups}
                        multiple
                        onChange={(e, value) => setSelectedGroups(value)}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        options={options}
                        loading={loading}                    
                        renderInput={(params) => (
                            <TextField 
                                {...params}
                                label="Invite groups"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <Fragment>
                                             {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                             {params.InputProps.endAdornment}
                                        </Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        id='submit'
                        sx={{ mt: 10, mb: 2, width: 300}}
                    >
                        Create poll
                    </Button>  
                </Box>
            </ThemeProvider>
        </Container>
        
    )
}

export default NewPollPage;