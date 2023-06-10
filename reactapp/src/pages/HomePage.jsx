import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {createTheme, useTheme, ThemeProvider, styled} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Calendar } from "react-multi-date-picker";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import useAxios from "../utils/useAxios";

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


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const HomePage = () => {
    const api = useAxios();
    const [polls, setPolls] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchPollData = async () => {
        const response = await api.get('/polls/get/');
        setPolls(response.data);
        };
        fetchPollData();
    }, []);

    return (
        <Container 
            sx={{
                marginTop: '56px',
                marginBottom: '56px',
                paddingBottom: '56px', // Add additional padding at the bottom
                // minHeight:xs=8 'calc(100vh - 56px)', // Set a minimum height to ensure content visibility
            }}
        >
            <Typography variant='h3' sx={{textAlign: 'center'}} gutterBottom>
                Next polls
            </Typography>
            <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box sx={{ mt: 1, justifyContent: 'center', alignItems: 'center', display:"flex", flexDirection: 'column'}}>
                <Calendar
                    id='pollCalendar'
                    className='rmdp-mobile red'
                    readOnly
                    style={{marginBottom:20}}
                />
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead stickyHeader>
                            <TableRow>
                                <TableCell>Poll</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Start time</TableCell>
                                <TableCell align="right">Duration</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant='h5' sx={{textAlign: 'center'}} gutterBottom>
                    Undefined polls
                </Typography>
                <Paper elevation={3}>
                    <List>
                        {polls.map(poll => (
                            
                                <ListItem
                                    secondaryAction={
                                        <IconButton onClick={()=>navigate(`/poll/${poll.id}/`)} edge="end" aria-label='details'>
                                            <KeyboardArrowRightIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText 
                                        primary={poll.name}
                                    />
                                </ListItem>                         
                        ))}
                    </List>
                </Paper>
            </Box>
            </ThemeProvider>
        </Container>
    )
}

export default HomePage;

