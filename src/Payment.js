import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51Qb3ZsLLIhJNNpeLvtagNcsg8YUeV2BuISpDCq6oGNbIQ318cZ0BO8nm8LgWw115wTW2tFNVwP39UqbUb8r4wviP00HD9RVjOH');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Card details not found.');
      setLoading(false);
      return;
    }

    try {
      // Fetch client secret from backend
      const response = await fetch('http://localhost:5000/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 5000, // Amount in cents ($50)
          currency: 'usd',
          description: 'Test Payment',
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm the card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setSuccess(true);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-form">
      <h2>Complete Your Payment</h2>
      {success ? (
        <p className="success-message">Payment succeeded! Thank you.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement options={{ hidePostalCode: true }} />
          <button type="submit" disabled={!stripe || loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
