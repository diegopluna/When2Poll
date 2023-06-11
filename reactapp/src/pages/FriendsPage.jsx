import React, { useState, useEffect, Fragment, useContext } from 'react';
import {createTheme, useTheme, ThemeProvider, styled} from "@mui/material/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useAxios from "../utils/useAxios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BlockIcon from '@mui/icons-material/Block';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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


const FriendsPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const {user, showSnack, snackSeverity, snackText, setShowSnack, setSnackSeverity, setSnackText} = useContext(AuthContext)
  const api = useAxios();

  const navigate = useNavigate()

  const fetchData = async (value) => {
    try {
        if(value !== ''){
            const response = await api.get(`/api/user/${value}`);                
            setUsers([response.data]);
        } else {
            setUsers([]);
        }   
    } catch (error) {
        return
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await api.put(`/api/friends/invite/${id}/accept/`)
      setShowSnack(true)
      setSnackSeverity('success')
      setSnackText('User added!')    
      navigate(0) 
    } catch (error) {
      return
    }
  }

  const handleBlock = async (id) => {
    try {
      const response = await api.put(`/api/friends/invite/${id}/block/`)  
      setShowSnack(true)
      setSnackSeverity('success')
      setSnackText('User blocked!')  
      navigate(0) 
    } catch (error) {
      return
    }
  }

  const handleUnblock = async (id) => {
    try {
      const response = await api.delete(`/api/blocks/${id}/unblock/`)  
      setShowSnack(true)
      setSnackSeverity('success')
      setSnackText('User unblocked!')  
      navigate(0) 
    } catch (error) {
      return
    }
  }

  const handleBlockFriend = async (id) => {
    try {
      const response = await api.post(`/api/blocks/${id}/block/`)  
      setShowSnack(true)
      setSnackSeverity('success')
      setSnackText('User blocked!')  
      navigate(0) 
    } catch (error) {
      return
    }
  }

  const handleInvite = async (email) => {
    try {   
      const response = await api.post(`/api/friends/invite/${email}/`)
      setShowSnack(true)
      setSnackSeverity('success')
      setSnackText('Invite sent!')
      navigate(0)
      
      // setShowSnack(true)
      // setSnackSeverity('success')
      // setSnackText('Group created')
      // // navigate(0) 
    } catch (error) {
      setShowSnack(true)
      setSnackSeverity('error')
      setSnackText(error.response.data.error)
      setSelectedUsers(null)
    }
  }

  useEffect( () => {


    const getPendingList = async () => {
      const response = await api.get('/api/friends/invites/pending/');
      setPending(response.data)
    }

    getPendingList()

  },[])

  useEffect( () => {


    const getFriendsList = async () => {
      const response = await api.get('/api/friends/');
      setFriends(response.data)
    }

    getFriendsList()

  },[])

  useEffect( () => {


    const getBlocksList = async () => {
      const response = await api.get('/api/blocks/');
      setBlocked(response.data)
    }

    getBlocksList()

  },[])

  useEffect(() => {
    if (inputValue !== ''){    
    fetchData(inputValue);
    }
  }, [inputValue]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnack(false);
  };

  return (
    <Box
      sx={{
        marginTop: '56px',
        marginBottom: '56px',
        paddingBottom: '56px', // Add additional padding at the bottom
        // minHeight:xs=8 'calc(100vh - 56px)', // Set a minimum height to ensure content visibility
      }}
    >
      <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
            <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                Add Friends
            </Typography>
            <ThemeProvider theme={defaultTheme}>
              <Snackbar open={showSnack} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity={snackSeverity}>{snackText}</Alert>
              </Snackbar>
              <Autocomplete
                fullWidth
                value={selectedUsers}
                onChange={(e, value)=>setSelectedUsers(value)}
                id='inviteUsers'
                options={users}
                getOptionLabel={(user) => user.full_name}
                filterOptions={(options, state)=> options}
                onInputChange={(event, value) => setInputValue(value)}         
                renderInput={(params) => (
                    <TextField
                    {...params}
                    variant="outlined"
                    label="Search for users"
                    />            
                )}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                id='submit'
                sx={{ mt: 3, mb: 2}}
                onClick={()=>handleInvite(selectedUsers.email)}
              >
                Add friend
              </Button>  
            </ThemeProvider>
            {pending.length > 0 &&
              <>
                <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                  Pending
                </Typography>
                <Paper elevation={3}>
                  <List>
                    {pending.map(item => (
                      <ListItem 
                        key={item.id}
                        secondaryAction = {
                          <>
                            <IconButton onClick={() => handleBlock(item.id)} sx={{mr:1}} edge='end' aria-label='reject-invite'>
                              <BlockIcon />
                            </IconButton>
                            <IconButton onClick={() => handleAccept(item.id)} edge='end' aria-label='accept-invite'>
                              <PersonAddAlt1Icon />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#ff735c" }} alt={item.from_user.full_name}>
                            {item.from_user.full_name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={item.from_user.full_name}
                          secondary={item.from_user.email}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </>
            }
            {
              blocked.length > 0 &&
              <>
                <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                  Blocked users
                </Typography>
                <Paper elevation={3}>
                  <List>
                    {blocked.map(item => (
                      <ListItem 
                        key={item.id}
                        secondaryAction = {
                          <IconButton onClick={()=>handleUnblock(item.id)} edge='end' aria-label='unblock-user'>
                            <RemoveCircleIcon />
                          </IconButton>
                      }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#ff735c" }} alt={item.blocked_user.full_name}>
                            {item.blocked_user.full_name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={item.blocked_user.full_name}
                          secondary={item.blocked_user.email}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </>
            }
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                Friends
            </Typography>
            {friends.length > 0 ?
              <Paper elevation={3}>
                <List>
                {friends.map(friend => (
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label='remove-friend' onClick={()=>handleBlockFriend((friend.from_user.id === user.user_id)? friend.to_user.id : friend.from_user.id)}>
                        <BlockIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#ff735c" }} alt={(friend.from_user.id === user.user_id)? friend.to_user.full_name : friend.from_user.full_name}>
                        {(friend.from_user.id === user.user_id) ? friend.to_user.full_name.charAt(0) : friend.from_user.full_name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={(friend.from_user.id === user.user_id) ? friend.to_user.full_name : friend.from_user.full_name}
                      secondary={(friend.from_user.id === user.user_id) ? friend.to_user.email : friend.from_user.email}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
              :
            <Typography variant='h6' sx={{textAlign: 'center'}} color="#ff735c" gutterBottom>
                Add some friends
            </Typography>
            }
        </Grid>       
      </Grid>
    </Box>
  )
}

export default FriendsPage