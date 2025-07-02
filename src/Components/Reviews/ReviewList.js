import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({reviews, loading}) => {
  return (
    <div className="reviews">
      {loading ? (<p>Loading...</p>) : (
        <div className="review-list">
          {reviews.map((review) => (<ReviewItem key={review.id} review={review}/>))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
