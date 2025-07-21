import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews = [], loading, onDelete, onEdit }) => {
  if (loading) return <p>Loading...</p>;

  if (reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewItem 
          key={review.id} 
          review={review}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ReviewList;
