// Frontend FeedbackForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackForm.css';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    email: '',
    starRating: 0,
    review: ''
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('/api/feedbacks');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('/api/feedback', formData);
      alert('Feedback submitted successfully!');
      setFormData({
        email: '',
        starRating: 0,
        review: ''
      });
      fetchFeedbacks(); // Fetch updated feedbacks after submission
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitError('Failed to submit feedback. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-form-container">
      <h1 className="feedback-form-title">Feedback Form</h1>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="starRating">Star Rating:</label>
          <input type="number" id="starRating" name="starRating" min="0" max="5" value={formData.starRating} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="review">Review:</label>
          <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button" disabled={submitting}>Submit Feedback</button>
        {submitError && <p className="error-message">{submitError}</p>}
      </form>
      
      <div className="feedbacks-container">
        <h2>Feedbacks</h2>
        {feedbacks.map((feedback, index) => (
          <div key={index} className="feedback">
            <p><strong>Email:</strong> {feedback.email}</p>
            <p><strong>Star Rating:</strong> {feedback.starRating}</p>
            <p><strong>Review:</strong> {feedback.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackForm;
