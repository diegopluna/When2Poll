import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import {createTheme, useTheme, ThemeProvider} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import AuthContext from "../context/AuthProvider.jsx";
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { Outlet, useNavigate, Link } from 'react-router-dom'
import React, {useState, useContext} from "react";

const bottomNavTheme = createTheme({
    palette:{
        primary: {
            main: "#ff735c"
        }
    },
    components:{
        MuiBottomNavigation:{
            styleOverrides:{
                backgroundColor: "white",
            }
        }
    }
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

const Header = () => {

    let {user, logoutUser} = useContext(AuthContext)

    const [anchorElUser, setAnchorElUser] = useState(null);

    const navigate = useNavigate();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [value, setValue] = useState('/');
    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md')); // Set breakpoint as per your needs
    return (
        <>
            {!isMobileOrTablet && ( // Conditionally render AppBar based on screen size
                <ThemeProvider theme={appBarTheme}>
                    <Paper elevation={3}>
                        <AppBar position="fixed">
                            <Container maxWidth="xxl">
                                <Toolbar disableGutters>
                                    <Typography
                                        variant="h5"
                                        noWrap
                                        component="a"
                                        sx={{
                                            mr: 2,
                                            display: { xs: 'none', md: 'flex' },
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        When2Poll
                                    </Typography>
                                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                        <Button
                                            key="Home"
                                            sx={{ my: 2, color: location.pathname === '/' ? '#ffb638' : '#666666', display: 'block' }}
                                            component={Link}
                                            to="/"
                                        >
                                            Home
                                        </Button>
                                        <Button
                                            key="New Poll"
                                            sx={{ my: 2, color: location.pathname === '/newpoll/' ? '#ffb638' : '#666666', display: 'block' }}
                                            component={Link}
                                            to="/newpoll/"
                                        >
                                            New Poll
                                        </Button>
                                        <Button
                                            key="Invites"
                                            sx={{ my: 2, color: location.pathname === '/invites/' ? '#ffb638' : '#666666', display: 'block' }}
                                            component={Link}
                                            to="/invites/"
                                        >
                                            Invites
                                        </Button>
                                        <Button
                                            key="Groups"
                                            sx={{ my: 2, color: location.pathname === '/groups/' ? '#ffb638' : '#666666', display: 'block' }}
                                            component={Link}
                                            to="/groups/"
                                        >
                                            Groups
                                        </Button>
                                    </Box>
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar sx={{ bgcolor: "#ff735c" }} alt={user?.full_name}>
                                                    {user?.full_name.charAt(0)}
                                                </Avatar>
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        > 
                                            <Box sx={{
                                                py: 1.5,
                                                px: 2
                                                }}
                                            >
                                                <Typography variant="overline">
                                                    Account
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    variant="body2"
                                                >
                                                    {user?.full_name}
                                                </Typography>
                                            </Box>
                                            <Divider />
                                            <MenuItem key="logout" onClick={logoutUser}>
                                                <ListItemIcon>
                                                    <Logout fontSize='small' />
                                                </ListItemIcon>
                                                <Typography textAlign="center">Logout</Typography>
                                            </MenuItem>
                                            
                                        </Menu>
                                    </Box>
                                </Toolbar>
                            </Container>
                        </AppBar>
                    </Paper>
                    <Toolbar />
                </ThemeProvider>
            )}
            {
                isMobileOrTablet && (
                    <>
                        <ThemeProvider theme={appBarTheme}>
                            <Paper elevation={3}>
                                <AppBar position="fixed">
                                    <Container maxWidth="md">
                                        <Toolbar disableGutters>
                                            <Typography
                                                variant="h5"
                                                noWrap
                                                component="a"
                                                sx={{
                                                    mr: 2,
                                                    display: { xs: 'flex', md: 'none' },
                                                    flexGrow: 1,
                                                    fontFamily: 'monospace',
                                                    fontWeight: 700,
                                                    color: 'inherit',
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                When2Poll
                                            </Typography>
                                            <Box sx={{ flexGrow: 0 }}>
                                                <Tooltip title="Open settings">
                                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                        <Avatar sx={{ bgcolor: "#ff735c" }} alt={user?.full_name}>
                                                            {user?.full_name.charAt(0)}
                                                        </Avatar>
                                                    </IconButton>
                                                </Tooltip>
                                                <Menu
                                                    sx={{ mt: '45px' }}
                                                    id="menu-appbar"
                                                    anchorEl={anchorElUser}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    open={Boolean(anchorElUser)}
                                                    onClose={handleCloseUserMenu}
                                                >
                                                    <Box sx={{
                                                        py: 1.5,
                                                        px: 2
                                                        }}
                                                    >
                                                        <Typography variant="overline">
                                                            Account
                                                        </Typography>
                                                        <Typography
                                                            color="text.secondary"
                                                            variant="body2"
                                                        >
                                                            {user?.full_name}
                                                        </Typography>
                                                    </Box>
                                                    <Divider />
                                                    <MenuItem key="logout" onClick={logoutUser}>
                                                        <ListItemIcon>
                                                            <Logout fontSize='small' />
                                                        </ListItemIcon>
                                                        <Typography textAlign="center">Logout</Typography>
                                                    </MenuItem>                                                 
                                                </Menu>
                                            </Box>
                                        </Toolbar>
                                    </Container>
                                </AppBar>
                            </Paper>
                            <Toolbar />
                        </ThemeProvider>
                        <ThemeProvider theme={bottomNavTheme} >
                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }} elevation={3}>
                                <BottomNavigation
                                    showLabels
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                        navigate(newValue)
                                    }}
                                >
                                    <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
                                    <BottomNavigationAction label="New Poll" value="/newpoll" icon={<AddIcon  />} />
                                    <BottomNavigationAction label="Invites" value="/invites" icon={<EmailIcon />} />
                                    <BottomNavigationAction label="Groups" value="/groups" icon={<GroupsIcon />} />
                                </BottomNavigation>
                            </Paper>
                        </ThemeProvider>
                    </>
                )
            }
            <Outlet />
        </>
    );
}

export default Header