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
import React from 'react';

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

const HomePage = () => {
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
            </Box>
            </ThemeProvider>
        </Container>
    )
}

export default HomePage;

