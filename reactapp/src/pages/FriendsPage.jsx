import React, { useState, useEffect, Fragment } from 'react';
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
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);

  const api = useAxios();
  const fetchData = async (value) => {

    try {
        if(value != ''){
            const response = await api.get(`/api/user/${value}`);                
            setUsers([response.data]);
        } else {
            setUsers([]);
        }   
    } catch (error) {
        return
    }
  };

  useEffect(() => {    
    fetchData(inputValue);
  }, [inputValue]);

  useEffect( () => {


    const getPendingList = async () => {
      const response = await api.get('/api/friends/invites/pending/');
      setPending(response.data)
    }

    getPendingList()

  },[])

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
            </ThemeProvider>
            {pending &&
              <>
                <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                  Pending
                </Typography>
                <List>
                  {pending.map(item => {
                    <ListItem 
                      secondaryAction = {
                        <>
                          <IconButton edge='end' aria-label='reject-invite'>
                            <BlockIcon />
                          </IconButton>
                          <IconButton edge='end' aria-label='accept-invite'>
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
                  })}
                </List>
              </>
            }
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                Friends
            </Typography>
            {friends ?
              <Typography variant='h6' sx={{textAlign: 'center'}} color="#ff735c" gutterBottom>
                Add some friends
              </Typography>
              :
              <List>
              {friends.map(friend => {
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label='remove-friend'>
                      <PersonRemoveIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#ff735c" }} alt={friend?.full_name}>
                      {friend?.full_name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={friend?.full_name}
                    secondary={friend?.email}
                  />
                </ListItem>
              })}
            </List>
            }
        </Grid>       
      </Grid>
    </Box>
  )
}

export default FriendsPage