import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51OUwSRE0fFduA220FwYbwjjeSqSCBDwVO5w1YODwTlB2XqRitGsr1FtFAKde6VJpGi926XLXJER3AHFpJkHfndoy00GtdC4vBy');

export default function Checkout(props) {
    const { state } = useLocation();
    const clientSecret = state?.key;
    const amount = state?.amount;

    if (!state) {
        return <Navigate to="/cart" />
    }
    return (
        <Elements stripe={stripePromise} options={{
            clientSecret: clientSecret
        }}>
            <PaymentForm amount={amount} />
        </Elements>
    );
}