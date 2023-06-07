import React, {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import useMediaQuery from "@mui/material/useMediaQuery";
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {createTheme, useTheme, ThemeProvider} from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import useAxios from "../utils/useAxios";


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

const NewGroupPage = () => {
    
    const [selectedUsers, setSelectedUsers] = useState([]);
    console.log(selectedUsers)
    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const navigate = useNavigate();

    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md')); // Set breakpoint as per your needs

    const api = useAxios();

    const fetchData = async (value) => {
        try {
            if(value != ''){
                const response = await api.get(`/api/user/${value}`);
                console.log(response);
                setUsers([response.data]);
            } else {
                setUsers([]);
            }   
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {    
        fetchData(inputValue);
    }, [inputValue]);

    const names = [
        "Humaira Sims",
        "Santiago Solis",
        "Dawid Floyd",
        "Mateo Barlow",
        "Samia Navarro",
        "Kaden Fields",
        "Genevieve Watkins",
        "Mariah Hickman",
        "Rocco Richardson",
        "Harris Glenn"
      ];

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
                New Group
            </Typography>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <Box component="form" noValidate sx={{ mt: 1}} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="groupTitle"
                        label="Group title"
                        name="groupTitle"
                        autoComplete="organization"
                        autoFocus
                    />
                    <TextField
                        id="groupDescription"
                        label="Group description"
                        fullWidth
                        multiline
                        rows={4}
                    />
                    <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                        Invite 
                    </Typography>
                    <Autocomplete
                        fullWidth
                        value={selectedUsers}
                        onChange={(e, value)=>setSelectedUsers(value)}
                        multiple
                        id='inviteUsers'
                        options={users}
                        getOptionLabel={(user) => user.full_name}
                        filterOptions={(options, state)=> options}
                        onInputChange={(event, value) => setInputValue(value)}         
                        disableCloseOnSelect
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            variant="outlined"
                            label="Search for users"
                            />            
                        )}
                    />                                      
                </Box>
            </ThemeProvider>
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

export default NewGroupPage