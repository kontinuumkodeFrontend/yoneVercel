import React from "react";
import RationgEmojiList from "./RationgEmojiList";
import { toast } from "react-toastify";

export const Feedback = ({
  isFeedback,
  setMessage,
  setRating,
  msg,
  rating,
  feedbackHandler,
}) => {

  const ratingHandler = (e) => {
    toast.dismiss();
    e.preventDefault();
    if (rating) {
      feedbackHandler();
    } else {
      toast.info("Please select a rating");
    }
  };

  return (
    <form
      onSubmit={ratingHandler}
      className={isFeedback ? "feedback-card pe-none" : "feedback-card"}
    >
      <h4>{isFeedback ? "My Feedback" : "Give feedback"}</h4>
      <p>
        {isFeedback
          ? "My think of Yone Travel & Tour"
          : "What do you think of Yone Travel & Tour?"}
      </p>

      <RationgEmojiList rating={rating} setRating={setRating} />

      <div className="cmt-bx">
        <label>Do you have any thoughts you’d like to share?</label>
        {isFeedback ? (
          <p>{msg}</p>
        ) : (
          <textarea
            rows={4}
            placeholder="Write here your thoughts"
            onChange={(e) => setMessage(e.target.value)}
            value={msg}
          ></textarea>
        )}
      </div>
      {isFeedback ? (
        ""
      ) : (
        <div className="fb-btn-wpr">
          <button className="btn-design" type="submit">
            Send
          </button>
          <button
            className="btn-stroke" type="button"
            onClick={() => { setMessage(''); setRating(null)}}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};
