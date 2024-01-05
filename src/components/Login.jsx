import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../userSlice';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976D2',
        },
        secondary: {
            main: '#757575',
        },
    },
});

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const handleLogin = async (e) => {
        const data = { username, password };
        e.preventDefault();
        try {
            let token = await fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            setError("");

            if (!token.ok) {
                let text = await token.text()
                setError(text);
                return;
            }
            let user = await token.json();

            dispatch(loggedIn({ token: `Bearer ${user.token}`, name: user.name, email: user.email }));
            Navigate("/");
        }
        catch (ex) {
            setError(ex.msg || ex.message);
        }


    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <div>
                    <form>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            inputProps={{
                                minLength: 4,
                                maxLength: 15,
                            }}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            inputProps={{
                                minLength: 6,
                                maxLength: 16,
                            }}
                        />

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </form>
                    <div><span >{error}</span></div>
                </div>
                <Typography variant='body1'>If You Don't Have an Account you can <Link component={RouterLink} to={"/register"} underline="hover">Register</Link> here </Typography>

            </Container>
        </ThemeProvider>
    );
};

export default Login;
