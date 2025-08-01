import React from "react";
import '../css/customerfeedback.css';

export default function CustomerFeedbackForm({ onSubmit }) {
  return (
    <form className="c-feedback-form" onSubmit={e => {e.preventDefault(); onSubmit && onSubmit();}}>
      <h2 className="c-feedback-title">We Value Your Feedback</h2>
      
      {/* 1. Satisfaction */}
      <label className="c-feedback-label" htmlFor="satisfaction">
        1. How satisfied were you with your consultation?
        <div className="c-feedback-stars">
          {[1,2,3,4,5].map(n => (
            <label key={n} className="c-star">
              <input type="radio" name="satisfaction" value={n} required />
              <span>{n}</span>
            </label>
          ))}
        </div>
      </label>

      {/* 2. Fee fairness */}
      <label className="c-feedback-label">
        2. Was the consultation fee fair?
        <select name="fee_fairness" required>
          <option value="">Select...</option>
          <option>Too High</option>
          <option>Reasonable</option>
          <option>Too Low</option>
          <option>Not Sure</option>
        </select>
      </label>
      
      {/* 3. Payment issue */}
      <label className="c-feedback-label">
        3. Did you face any issue in paying the lawyer?
        <select name="payment_issue" required>
          <option value="">Select...</option>
          <option>Yes</option>
          <option>No</option>
          <option>Didn’t pay yet</option>
        </select>
      </label>
      
      {/* 4. Prefer Counvo payment */}
      <label className="c-feedback-label">
        4. Would you prefer to pay everything on Counvo next time?
        <select name="prefer_counvo" required>
          <option value="">Select...</option>
          <option>Yes, it’s easier that way</option>
          <option>No, I prefer paying lawyer directly</option>
          <option>Doesn’t matter</option>
        </select>
      </label>

      {/* 5. Fixed or Flexible fee */}
      <label className="c-feedback-label">
        5. Do you like fixed or flexible consultation fee?
        <select name="fee_type" required>
          <option value="">Select...</option>
          <option>Fixed</option>
          <option>Flexible</option>
        </select>
      </label>

      {/* 6. Suggestions */}
      <label className="c-feedback-label">
        6. Any feedback or suggestions for us? <span className="c-feedback-optional">(optional)</span>
        <textarea name="suggestions" rows={2} maxLength={300} placeholder="Your thoughts..." />
      </label>
      
      <button type="submit" className="c-feedback-btn">Submit</button>
    </form>
  );
}
