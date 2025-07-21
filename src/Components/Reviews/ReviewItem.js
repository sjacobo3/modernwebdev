import React from "react";

function ReviewItem({ review, onDelete, onEdit }) {
  return (
    <div className="review-item">
      <b>{review.get("courseCode")}</b> <br />
      Rating: {review.get("rating")} <br />
      Difficulty: {review.get("difficulty")}<br />
      Comment: {review.get("comment")} <br />
      Grade Received: {review.get("gradeReceived")} <br />
      Date: {review.createdAt.toLocaleDateString()} <br />
      Would take again: {review.get("takeAgain") ? "Yes" : "No"} <br />
      Attendance: {review.get("attendance") ? "Yes" : "No"}<br />

      {(onDelete || onEdit) && (
        <div>
          {onEdit && (
            <button onClick={() => onEdit(review)}>
              Edit Review
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(review.id)}>
              Delete Review
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ReviewItem;