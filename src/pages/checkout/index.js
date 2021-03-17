import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Checkout.css";
import CheckoutForm from "./CheckForm";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51HsS5KBeEawBZYmYR7UQkwPjClQvmK8OWeLsrkofsILRAfnCrSE0f9QcmFLjcvYBrXG3fu9e9dgMIruqZEUbEVfz00hI0nLOpA");

export default function Checkout() {
  return (
    <div className="App">
        <Layout>
            <div className="p-3 text-center">
                    <p>Check out Page. Make Payment to get the Products</p>
                    <Link to="/cart" className="btn btn-primary btn-sm">Review Cart</Link>
                </div>
                <div className="container d-flex justify-content-center">
                <Elements stripe={promise}>
        <CheckoutForm/>
      </Elements>
                </div>
      
      </Layout>
    </div>
  );
}
