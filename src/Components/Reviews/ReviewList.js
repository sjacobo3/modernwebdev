import React, { useEffect, useState } from "react";

import ReviewItem from "./ReviewItem";
import { getAllReviews } from "../../Services/ReviewService";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReviews() 
    .then((results) => {
      setReviews(results);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    })
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      {loading ? (<p>Loading...</p>) : (
        <ul>
          {reviews.map((review) => (<ReviewItem key={review.id} review={review}/>))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
