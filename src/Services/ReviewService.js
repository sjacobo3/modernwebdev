import Parse from "parse";
import { getCurrentUser } from "./AuthService";

// apply fields to a review object
const setReviewFields = (review, data) => {
  review.set("user", data.user);
  review.set("department", data.department);
  review.set("professor", data.professor);
  review.set("professorName", data.professorName);
  review.set("courseCode", data.courseCode);
  review.set("course", data.course);
  review.set("rating", parseInt(data.rating));
  review.set("difficulty", parseInt(data.difficulty));
  review.set("comment", data.comment);
  review.set("majorRequirement", data.majorRequirement); 
  review.set("semesterTaken", data.semesterTaken);
};

// CREATE - create a new review
export const createReview = async (reviewData) => {
  const Review = Parse.Object.extend("Review");
  const review = new Review();

  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error("No current user");
  review.set("user", currentUser);

  setReviewFields(review, reviewData);

  return review.save()
    .then((savedReview) => {
      console.log("Review created:", savedReview);
      return savedReview;
    })
    .catch((err) => {
      console.error("Error creating review:", err);
      throw err;
    });
};

// UPDATE - update a review
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

// GET ALL - get all reviews
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

// GET BY ID - get a review by id
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

// DELETE - delete a review
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

// GET USER REVIEWS - get all reviews for a user
export const fetchUserReviews = async () => {
  const currentUser = Parse.User.current();
  if (!currentUser) return [];

  const Review = Parse.Object.extend('Review');
  const query = new Parse.Query(Review);
  query.equalTo('user', currentUser); // Query reviews where user field matches current user
  const results = await query.find();
  return results; // Return Parse objects, not JSON
};

//like button 
export const toggleLikeReview = async (reviewId) => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  const currentUser = Parse.User.current();
  if (!currentUser) throw new Error("User must be logged in");

  const review = await query.get(reviewId);
  const likes = review.get("likes") || [];
  const userId = currentUser.id;

  if (likes.includes(userId)) {
    // Unlike
    review.set("likes", likes.filter((id) => id !== userId));
  } else {
    // Like
    review.set("likes", [...likes, userId]);
  }

  await review.save();
  return review;
};