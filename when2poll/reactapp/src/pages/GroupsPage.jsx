import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from 'react-router-dom';


import {createTheme, useTheme, ThemeProvider} from "@mui/material/styles";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const buttonTheme = createTheme({
    palette:{
        primary: {
            main: "#ff735c"
        }
    },
});

const appBarTheme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "white",
                    color: "#ff735c"
                }
            }
        }
    }
});

const GroupsPage = () => {

    const [data, setData] = useState([])

    const api = useAxios()

    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md')); // Set breakpoint as per your needs

    const navigate = useNavigate()
    

    useEffect( () => {


        const getGroupsList = async () => {
          const response = await api.get('/orgs/organizations/user/');
          setData(response.data)
        }
    
        getGroupsList()
    
      },[])

    return (
        <>
            {
                isMobileOrTablet &&
                <Container>
                    <ThemeProvider theme={buttonTheme}>
                        <Button onClick={()=>navigate("/newgroup/")} variant="text">New Group</Button>
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
                <Stack spacing={2}>
                    {data.map(item => (
                        <Item>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                {item.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ThemeProvider theme={buttonTheme}>
                                    <Button size="small" color="primary" onClick={() => navigate(`/group/${item.id}/`)}>
                                    Details
                                    </Button>
                                </ThemeProvider>
                            </CardActions>
                        </Card>
                    </Item>
                    ))}
                </Stack>
                { !isMobileOrTablet &&
                <ThemeProvider theme={buttonTheme}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={()=>navigate("/newgroup/")}
                        sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        zIndex: 10, // Set a higher z-index value
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </ThemeProvider>
                }
            </Container>
        </>
        
    )
}

export default GroupsPage;