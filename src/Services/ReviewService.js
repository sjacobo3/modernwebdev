import Parse from "parse";

// apply fields to a review object
const setReviewFields = (review, data) => {
  review.set("courseCode", data.courseCode);
  review.set("rating", parseInt(data.rating));
  review.set("difficulty", parseInt(data.difficulty));
  review.set("comment", data.comment);
  review.set("gradeReceived", data.gradeReceived);
  review.set("takeAgain", data.takeAgain);
  review.set("attendance", data.attendance);
};

// CREATE
export const createReview = (reviewData) => {
  const Review = Parse.Object.extend("Review");
  const review = new Review();

  const currentUser = Parse.User.current();
  if (!currentUser) return Promise.reject("No current user");

  review.set("user", currentUser);
  setReviewFields(review, reviewData);

  return review.save()
    .then((savedReview) => savedReview)
    .catch((err) => {
      console.error("Error creating review:", err);
      throw err;
    });
};

// UPDATE
export const updateReview = (id, reviewData) => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);

  return query.get(id)
    .then((review) => {
      setReviewFields(review, reviewData);
      return review.save();
    })
    .then((updatedReview) => updatedReview)
    .catch((err) => {
      console.error("Error updating review:", err);
      throw err;
    });
};

// GET ALL
export const getAllReviews = () => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  query.include("user");

  return query.find()
    .then((results) => results)
    .catch((err) => {
      console.error("Error fetching all reviews:", err);
      throw err;
    });
};

// GET BY ID
export const getReviewById = (id) => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  query.include("user");

  return query.get(id)
    .then((review) => review)
    .catch((err) => {
      console.error("Error fetching review by ID:", err);
      throw err;
    });
};

// DELETE
export const removeReview = (id) => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);

  return query.get(id)
    .then((review) => {
      const currentUser = Parse.User.current();
      if (!currentUser) throw new Error("No current user");

      const owner = review.get("user");
      if (owner?.id !== currentUser.id) {
        throw new Error("Unauthorized to delete this review");
      }

      return review.destroy();
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error("Error deleting review:", err);
      throw err;
    });
};