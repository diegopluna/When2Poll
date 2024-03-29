import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import { createTheme, ThemeProvider} from "@mui/material/styles";
import background from "../assets/background.jpg";
import {useContext, useState} from "react";
import AuthContext from "../context/AuthProvider.jsx";
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            <Link color="inherit" href="https://www.freepik.com/free-vector/date-picker-concept-illustration_11641634.htm#page=2&query=calendar&position=12&from_view=search&track=sph">
                Image by storyset
            </Link>{' '}
            {' on Freepik'}
        </Typography>
    );
}

const defaultTheme = createTheme({
    palette: {
        background:{
            paper: '#FFFFFF',
            default: '#EEEEEE'
        },
        primary:{
            main: '#ff735c'
        },
        secondary:{
            main: '#ffb638'
        }
    },
});

export default function SignUpPage() {

    let {signUpUser, showSnack, snackSeverity, snackText, setShowSnack, setSnackSeverity, setSnackText} = useContext(AuthContext)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const navigate = useNavigate()

    const handleSubmit =async (event) => {
        setShowSnack(false)
        const signUpReturn = await signUpUser(event );
        setSnackSeverity(signUpReturn[1])
        setSnackText(signUpReturn[0])
        setShowSnack(signUpReturn[2])
        if (signUpReturn[3] === 1)
        {
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setPasswordConfirm('')
            navigate('/signin/')
        } else if (signUpReturn[3] === 2) {
            setEmail('')
            setPassword('')
            setPasswordConfirm('')
        } else if (signUpReturn[3] === 3) {
            setPassword('')
            setPasswordConfirm('')
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowSnack(false);
      };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh'}}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgColor: 'secondary.main'}}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        {/* {show && <Alert severity={alertType}>{alertText}</Alert>} */}
                        <Snackbar open={showSnack} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity={snackSeverity}>{snackText}</Alert>
                        </Snackbar>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        value={firstName}
                                        onChange={event => setFirstName(event.target.value)}
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        value={lastName}
                                        onChange={event => setLastName(event.target.value)}
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="passwordConfirm"
                                        label="Confirm password"
                                        type="password"
                                        id="passwordConfirm"
                                        value={passwordConfirm}
                                        onChange={event => setPasswordConfirm(event.target.value)}
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                id="submit"
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                {/*<Grid item xs>*/}
                                {/*    <Link href="#" variant="body2">*/}
                                {/*        Forgot password?*/}
                                {/*    </Link>*/}
                                {/*</Grid>*/}
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        {"Already have an account? Sign in"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5}} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}