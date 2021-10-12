import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import "./styles.css";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            // iconColor: "#c4f0ff",
            color: "#000000",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                color: "#00000"
            },
            "::placeholder": {
                color: "#00000"
            }
        },
        invalid: {
            iconColor: "red",
            color: "red"
        }
    }
};

const CardField = ({ onChange }) => (
    <div className="FormRow">
        <CardElement
            options={CARD_OPTIONS}
            onChange={onChange}
            placeholder="Number Card"
        />
    </div>
);

const CheckoutForm = ({ stripe, elements }) => {
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);

    return (
        <form className="Form">
            <CardField
                onChange={(e) => {
                    console.log(e)
                    setError(e.error);
                    setCardComplete(e.complete);
                }}
            />
        </form>
    )
};


export default CheckoutForm;
