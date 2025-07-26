import Parse from "parse";
import { getCurrentUser } from "./AuthService";

const setReviewFields = async (review, data) => {
  review.set("user", data.user);
  review.set("rating", parseInt(data.rating));
  review.set("difficulty", parseInt(data.difficulty));
  review.set("comment", data.comment);
  review.set("majorRequirement", data.majorRequirement);
  review.set("semesterTaken", data.semesterTaken);
  // set pointers  
  review.set("course", data.course);
  review.set("professor", data.professor);
  review.set("department", data.department);
};

// CREATE A REVIEW
export const createReview = async (reviewData) => {
  const Review = Parse.Object.extend("Review");
  const review = new Review();

  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error("No current user");
  review.set("user", currentUser);

  await setReviewFields(review, reviewData);

  return review
    .save()
    .then((savedReview) => {
      console.log("Review created:", savedReview);
      return savedReview;
    })
    .catch((err) => {
      console.error("Error creating review:", err);
      throw err;
    });
};

// UPDATE A REVIEW
export const updateReview = async (id, reviewData) => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);

  try {
    const review = await query.get(id);
    await setReviewFields(review, reviewData);
    const updatedReview = await review.save();
    return updatedReview;
  } catch (err) {
    console.error("Error updating review:", err);
    throw err;
  }
};

// GET ALL REVIEWS
export const getAllReviews = async () => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  query.include("user");
  query.include("professor");
  query.include("course");
  query.include("department");
  query.descending("createdAt");

  try {
    return await query.find();
  } catch (err) {
    console.error("Error fetching all reviews:", err);
    throw err;
  }
};

// DELETE A REVIEW
export const removeReview = (id) => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);

  return query
    .get(id)
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

// GET ALL USER REVIEWS 
export const fetchUserReviews = async () => {
  const currentUser = Parse.User.current();
  if (!currentUser) return [];

  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  query.equalTo("user", currentUser);

  query.include("course");
  query.include("professor");
  query.include("department");
  
  try {
    const results = await query.find();
    return results;
  } catch (err) {
    console.error("Error fetching user reviews:", err);
    throw err;
  }
};

// GET REVIEWS BY COURSE
export const getReviewsByCourse = async (course) => {
  if (!course) return [];

  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  query.equalTo("course", course);
  query.include("user");
  query.include("professor");
  query.descending("createdAt");
  
  try {
    return await query.find();
  } catch (err) {
    console.error("Error fetching reviews by course:", err);
    throw err;
  }
};

// GET REVIEWS BY DEPARTMENT
export const getReviewsByDepartment = async (department) => {
  if (!department) return [];

  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  query.equalTo("department", department);
  query.include("user");
  query.include("professor");
  query.include("course");
  query.descending("createdAt");
  
  try {
    return await query.find();
  } catch (err) {
    console.error("Error fetching reviews by department:", err);
    throw err;
  }
};

// LIKE A REVIEW
export const toggleLikeReview = async (reviewId) => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error("User must be logged in");

  const review = await query.get(reviewId);
  const likes = review.get("likes") || [];
  const userId = currentUser.id;

  if (likes.includes(userId)) {
    // Unlike
    review.set(
      "likes",
      likes.filter((id) => id !== userId)
    );
  } else {
    // Like
    review.set("likes", [...likes, userId]);
  }

  await review.save();
  return review;
};
