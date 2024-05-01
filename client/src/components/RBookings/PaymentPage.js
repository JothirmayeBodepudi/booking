import * as React from 'react';

export default function PaymentPage(props) {
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState('creditCard');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCVV] = React.useState('');

  const handlePay = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      alert('Please fill in all card details.');
      return;
    }
    // Simulate payment processing delay
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setCardNumber('');
    setExpiryDate('');
    setCVV('');
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <div>
      <h2>Payment Page</h2>
      {paymentSuccess ? (
        <div>
          <h3>Payment Successful!</h3>
          <p>Your payment has been successfully processed.</p>
        </div>
      ) : (
        <div>
          <h3>Payment Method</h3>
          <div>
            <input type="radio" id="creditCard" name="paymentMethod" value="creditCard"
                   checked={paymentMethod === 'creditCard'} onChange={handlePaymentMethodChange} />
            <label htmlFor="creditCard">Credit Card</label>
          </div>
          <div>
            <input type="radio" id="debitCard" name="paymentMethod" value="debitCard"
                   checked={paymentMethod === 'debitCard'} onChange={handlePaymentMethodChange} />
            <label htmlFor="debitCard">Debit Card</label>
          </div>
          <div>
            <input type="radio" id="upi" name="paymentMethod" value="upi"
                   checked={paymentMethod === 'upi'} onChange={handlePaymentMethodChange} />
            <label htmlFor="upi">UPI</label>
          </div>
          <br />
          <div className="card-details">
            {(paymentMethod === 'creditCard' || paymentMethod === 'debitCard') && (
              <div className="input-group">
                <p>Enter Card Number:</p>
                <input type="text" className="input-field" value={cardNumber} onChange={handleInputChange(setCardNumber)} placeholder="1234 5678 9012 3456" />
                <p>Expiry Date:</p>
                <input type="text" className="input-field" value={expiryDate} onChange={handleInputChange(setExpiryDate)} placeholder="MM/YY" />
                <p>CVV:</p>
                <input type="text" className="input-field" value={cvv} onChange={handleInputChange(setCVV)} placeholder="CVV" maxLength="3" />
              </div>
            )}
            {paymentMethod === 'upi' && (
              <div className="input-group">
                <p>Enter UPI ID:</p>
                <input type="text" className="input-field" value={cardNumber} onChange={handleInputChange(setCardNumber)} placeholder="example@upi" />
              </div>
            )}
          </div>
          <br />
          <button onClick={handlePay} disabled={!cardNumber || (paymentMethod !== 'upi' && (!expiryDate || !cvv))}>Pay</button>
        </div>
      )}
    </div>
  );
}

// CSS styles
// .input-group { display: flex; flex-direction: column; }
// .input-field { flex-grow: 1; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 10px; }
