import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../utils/useAxios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useMediaQuery from "@mui/material/useMediaQuery";
import {createTheme, useTheme, ThemeProvider} from "@mui/material/styles";
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';


const buttonTheme = createTheme({
    palette:{
        primary: {
            main: "#ff735c"
        }
    },
});

const GroupPage = () => {
    const [data, setData] = useState(null)
    const [members, setMembersData] = useState([])
    const {groupId} = useParams()

    const api = useAxios()
    const navigate = useNavigate()

    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md')); // Set breakpoint as per your needs

    useEffect(() => {
        async function fetchPageData() {
            const groupdata = await api.get(`/orgs/organizations/${groupId}/`) 
            setData(groupdata.data)
            const response = await api.get(`/orgs/organizations/${groupId}/members/`)
            setMembersData(response.data)
        }

        fetchPageData()

    },[])

    return (
        <>
            {
                isMobileOrTablet &&
                <Container>
                    <ThemeProvider theme={buttonTheme}>
                        <Button onClick={()=>navigate("/groups/")} variant="text">Back</Button>
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
                <Typography variant='h3' sx={{textAlign: 'center'}} gutterBottom>
                    {data?.name}
                </Typography>
                <Typography variant='subtitle1' sx={{textAlign: 'center'}} gutterBottom>
                    {data?.description}
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead stickyHeader>
                            <TableRow>
                                <TableCell>Full name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members.map((row) => (
                                <TableRow
                                    key={row.full_name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.full_name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                { !isMobileOrTablet &&
                    <ThemeProvider theme={buttonTheme}>
                        <Fab
                            onClick={()=> navigate("/groups/")}
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

export default GroupPage