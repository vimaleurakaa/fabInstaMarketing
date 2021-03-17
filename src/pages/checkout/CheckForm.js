import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "./Checkout.css";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: ""
  });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] })
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: billingDetails?.email,
      payment_method: {
        card: elements.getElement(CardElement)
      },
      billing_details: billingDetails
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };


  const Field = ({
    label,
    id,
    type,
    placeholder,
    required,
    autoComplete,
    value,
    onChange
  }) => (
    <div className="FormRow">
      <label htmlFor={id} className="FormRowLabel">
        {label}
      </label>
      <input
        className="FormRowInput"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  return (
    <form id="payment-form" onSubmit={handleSubmit}>

      <Field
        label="Name"
        id="name"
        type="text"
        placeholder="Enter your Name"
        required
        autoComplete="name"
        value={billingDetails.name}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, name: e.target.value });
        }}
      />
      <Field
        label="Email"
        id="email"
        type="email"
        placeholder="***@gmail.com"
        required
        autoComplete="email"
        value={billingDetails.email}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, email: e.target.value });
        }}
      />
      <Field
        label="Phone"
        id="phone"
        type="tel"
        placeholder="(941) 555-XXXX"
        required
        autoComplete="tel"
        value={billingDetails.phone}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, phone: e.target.value });
        }}
      />
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        className="button-checkout"
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text" className="button-checkout">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
              "Pay now"
            )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  );
}
