import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Avatar, Box, Tabs, Tab, Typography } from '@mui/material';
import { useEditProfileMutation } from '../apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import OrdersList from './OrdersList';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


const Profile = () => {
    const user = useSelector((state) => (state.user));
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [errors, setErrors] = useState("");
    const [editProfile, { error, isError }] = useEditProfileMutation();
    const [imgSrc, setImgSrc] = useState(null);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleEditProfile = async (e) => {
        e.preventDefault();

        if (!password && !profilePicture && email == user.email && name == user.name) {
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profilePicture', profilePicture);
        try {
            const res = await editProfile(formData);
            if (res.error) {
                setErrors(res.error.data.error);
            }

            else {

                setErrors("");
                const data = {};
                if (name) {
                    data.name = name;
                }
                if (email) {
                    data.email = email;
                }

                setErrors("Success")
            }
        }
        catch (ex) {
            setErrors(ex);
        }


    };
    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch("http://localhost:3000/api/user/getpicture", {
                headers: {
                    "Authorization": user.token
                },
                mode: "cors"
            });
            let blob = await response.blob();
            const dataUrl = URL.createObjectURL(blob);
            setImgSrc(dataUrl);
        }
        setTimeout(fetchData, 300);
    }, [user.token, user.profile])

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const maxSizeInBytes = 10 * 1024 * 1024;
        if (selectedFile && selectedFile.size > maxSizeInBytes) {
            setErrors('File size exceeds the limit (10 MB). Please choose a smaller file.');
            e.target.value = null;
        } else {
            setProfilePicture(selectedFile);
        }
    };


    return (

        <Container component="main" >
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} >
                        <Tab label={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}><AccountCircleIcon sx={{ alignSelf: "baseline" }} /> Profile</div>} id="0" sx={{ margin: "auto" }} />
                        <Tab label={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}><ReceiptLongIcon sx={{ alignSelf: "baseline" }} /> Orders</div>} id="1" sx={{ margin: "auto" }} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0} >
                    <div>
                        <form onSubmit={handleEditProfile}>
                            {imgSrc ? <Avatar sx={{ width: 300, height: 300, margin: "auto" }} src={imgSrc} alt="Current Profile" /> : <Spinner />}


                            <TextField
                                variant="outlined"
                                margin="normal"
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
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                inputProps={{
                                    minLength: 6,
                                    maxLength: 16,
                                }}
                            />
                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: "10px", display: "block" }} />

                            <Button
                                type="submit"

                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 3, margin: "auto", display: "block" }}

                            >
                                Save Changes
                            </Button>

                        </form>
                        <div style={{ textAlign: "center" }}><span >{errors}</span></div>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <OrdersList />
                </CustomTabPanel>

            </Box>

        </Container >
    );
};

export default Profile;
