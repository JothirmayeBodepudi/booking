import * as React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button'; // Import Button from MUI
import './Book.css'; // Import your CSS file

export default function ACheckout() {
  
  return (
    <div className="address-form-container">
      <div className="address-form-box">
        <Typography variant="h6" gutterBottom className="address-form__title">
          Address
        </Typography>
        <Grid container spacing={3} className="address-form">
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              className="address-form__input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              className="address-form__input"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="aadhar"
              name="aadhar"
              label="Aadhar Number"
              fullWidth
              autoComplete="aadhar-number"
              variant="outlined"
              className="address-form__input"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="mobile"
              name="mobile"
              label="Mobile Number"
              fullWidth
              autoComplete="mobile"
              variant="outlined"
              className="address-form__input"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address "
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              className="address-form__input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="outlined"
              className="address-form__input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="outlined"
              className="address-form__input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal Code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              className="address-form__input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="outlined"
              className="address-form__input"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="saveAddress" value="yes" className="address-form__checkbox" />}
              label="Use this address for payment details"
              className="address-form__checkbox-label"
            />
          </Grid>
          {/* Button to proceed to payment */}
          <Grid item xs={12}>
            <Link to="/RBookings/PaymentPage">
              <Button variant="contained" color="primary">
                Proceed to Payment
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
