import React, { useEffect, useState } from "react";

// need to add "getByProfessor,"
import {
  createReview,
  getAllReviews,
  removeReview,
} from "../../Services/ReviewService";

import ReviewForm from "./ReviewForm";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState();
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState("");

  useEffect(() => {
    getAllReviews().then((reviews) => {
      console.log("Fetched reviews:", reviews);
      setReviews(reviews);
    });
  }, []);

  useEffect(() => {
    if (name && add) {
      createReview(name).then((newReview) => {
        setAdd(false);
        setReviews([...reviews, newReview]);
        // setName("");
      });
    }

    if (remove.length > 0) {
      // filter old list to get a new list to remove review
      const newReviews = reviews.filter((r) => r.id !== remove);
      setReviews(newReviews);

      removeReview(remove).then(() => {
        console.log("Removed review with ID: ", remove);
      });

      setRemove("");
    }
  }, [name, reviews, add, remove]);

  // Handler to handle event passed from child submit button
  const onClickHandler = (e) => {
    e.preventDefault();
    // Trigger add flag to create lesson and
    // re-render list with new lesson
    setAdd(true);
  };

  // Handler to track changes to the child input text
  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    // Continuously updating name to be added on submit
    setName(e.target.value);
  };

  return (
    <div>
      <h1>Reviews</h1>
      <ReviewForm
        onChange={onChangeHandler}
        onClick={onClickHandler}
        value={name}
      />
      <ul>
        {reviews.map((r) => (
          <li key={r.id}>
            {r.get ? r.get("name") : r.name}
            <button onClick={() => setRemove(r.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
