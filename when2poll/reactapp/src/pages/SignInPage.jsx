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
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button"
import { createTheme, ThemeProvider} from "@mui/material/styles";
import background from '../assets/background.jpg';
import {useContext, useState} from "react";
import AuthContext from "../context/AuthProvider.jsx";



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

export default function SignInPage() {

    let {loginUser} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false);

    const handleSubmit = async (event) => {
        setShow(false)
        const signInReturn = await loginUser(event );
        setShow(signInReturn);
        setEmail('')
        setPassword('')
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
                            Sign in
                        </Typography>
                        {show && <Alert severity="error">Wrong username or password</Alert>}
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email address"
                                name="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                autoComplete="current-password"
                                type="password"
                            />
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox value="remember" color="primary" />}*/}
                            {/*    label="Remember me"*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                {/*<Grid item xs>*/}
                                {/*    <Link href="#" variant="body2">*/}
                                {/*        Forgot password?*/}
                                {/*    </Link>*/}
                                {/*</Grid>*/}
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign up"}
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
