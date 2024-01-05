import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976D2', // Blue color
        },
        secondary: {
            main: '#757575', // Grey color
        },
    },
});

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState("");
    const Navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        const data = { username, password, name, email };
        e.preventDefault();
        try {
            let result = await fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            setError("");

            let text = await result.text()

            if (!result.ok) {
                setError(text);
                return;
            }
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
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            inputProps={{
                                minLength: 6,
                                maxLength: 16,
                            }}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            inputProps={{
                                minLength: 4,
                                maxLength: 12,
                            }}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </form>
                    <div><span>{error}</span></div>
                    <Typography variant='body1'>If You Have an Account you can <Link component={RouterLink} to={"/register"} underline="hover">Login</Link> here </Typography>

                </div>
            </Container>
        </ThemeProvider>
    );
};

export default Register;
