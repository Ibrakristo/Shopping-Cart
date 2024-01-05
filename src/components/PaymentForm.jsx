
import React, { useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import {
    Button,
    Paper,
    Typography,
    Box,
    Backdrop
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePaymentMutation } from '../apiSlice';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const PaymentForm = ({ amount }) => {
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const Navigate = useNavigate();
    const [payment, { isError, error: errorPayment }] = usePaymentMutation();
    const [open, setOpen] = useState(false);
    const [timeoutid, setTimeoutId] = useState();
    const handleSubmit = async (event) => {
        event.preventDefault();



        if (!stripe || !elements) {
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });
        if (error) {
            setError(error.message);
            return;
        };
        const id = paymentIntent.id;
        const res = await payment({ id });
        if (res.error) {
            setErrors(res.error.data.error);
        }
        if (isError) {
            setError(errorPayment.data);
        }

        setOpen(true);
        const test = setTimeout(() => {
            setOpen(false);
            Navigate("/");
        }, 3000);
        setTimeoutId(test);
    }

    function handleClose() {
        setOpen(false);
        clearTimeout(timeoutid);
        Navigate("/");
    }
    return (
        <>
            <Paper
                style={{
                    maxWidth: 400,
                    margin: 'auto',
                    padding: 16,
                    backgroundColor: '#f0f0f0'
                }}
            >
                <PaymentElement />
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: '#1976D2',
                        color: '#fff',
                        marginTop: "15px"
                    }}
                >
                    Pay {"$" + amount}
                </Button>
                {error && (
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                )}
            </Paper >
            <Backdrop
                sx={{ color: '#fff', zIndex: 1 }}
                open={open}
                onClick={handleClose}
            >
                <Box>
                    <Typography variant="h4" component={"h5"} textAlign={"center"}>Congraulations! You've Successfully Bought The Items.</Typography>
                    <Box width={"fit-content"} marginX="auto" marginY={3}>
                        <CheckCircleOutlineIcon fontSize="large" color="success!important" />
                    </Box>
                </Box>
            </Backdrop>
        </>
    );

}
export default PaymentForm;
