import React, {useState, useEffect, useContext, Fragment} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
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
import AuthContext from '../context/AuthProvider';


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
    
    let {user, setShowSnack, setSnackSeverity, setSnackText} = useContext(AuthContext)

    const [friends, setFriends] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([])
    const loading = open && friends.length === 0;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md')); // Set breakpoint as per your needs

    const api = useAxios();

    console.log(selectedFriends)

    useEffect(()=> {
        let active = true

        if (!loading) {
            return undefined
        }

        (async ()=> {
            const response = await api.get('/api/friends/');

            if (active) {
                setFriends(response.data)
            }
        })();

        return () => {
            active = false
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setFriends([]);
        }
    }, [open])

    const handleSubmit = async (e ) => {

        e.preventDefault();

        const response = await api.post('/orgs/organizations/',{
            name: e.target.title.value,
            description: e.target.description.value
          });
        const data = response.data

        for (let index = 0; index < selectedFriends.length; index++) {
            const userid = selectedFriends[index].from_user.id === user.user_id ? selectedFriends[index].to_user.id : selectedFriends[index].from_user.id;
            const inviteResponse = await api.post('/orgs/organizations/'+data.id+'/invite/',{
                user: userid
            });        
        }
        setDescription('')
        setTitle('')
        setSelectedFriends([])
        setShowSnack(true)
        setSnackSeverity('success')
        setSnackText('Group created')
        navigate('/groups/');
    }

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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="groupTitle"
                        label="Group title"
                        name="title"
                        autoComplete="organization"
                        autoFocus
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    />
                    <TextField
                        id="groupDescription"
                        label="Group description"
                        name='description'
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                    />
                    <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                        Invite 
                    </Typography>
                    <Autocomplete 
                        id='inviteFriends' 
                        fullWidth
                        value={selectedFriends}
                        multiple
                        onChange={(e, value) => setSelectedFriends(value)}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        isOptionEqualToValue={(option, value) => (option.from_user.id === user.user_id) ? option.to_user.id === value.id : option.from_user.id === value.id}
                        getOptionLabel={(option) => (option.from_user.id === user.user_id)?option.to_user.full_name:option.from_user.full_name}
                        options={friends}
                        loading={loading}                    
                        renderInput={(params) => (
                            <TextField 
                                {...params}
                                label="Invite friends"
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
                        fullWidth
                        variant="contained"
                        id='submit'
                        sx={{ mt: 10, mb: 2}}
                    >
                        Create group
                    </Button>                                      
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