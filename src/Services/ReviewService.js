import Parse from "parse";

// CREATE operation - new review with Name
export const createReview = (name) => {
  console.log("Creating: ", name);
  const Review = Parse.Object.extend("Review");
  const review = new Review();

  // using .set() to UPDATE the object
  review.set("name", name);
  return review.save().then((result) => result);
};

// READ operation - get all reviews in Parse class Review
export const getAllReviews = () => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  return query.find().then((results) => results);
};

// READ operation - get review by id
export const getByProfessor = (id) => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  return query.get(id);
};

// DELETE operation - remove review by id
export const removeReview = (id) => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  return query.get(id).then((review) => review.destroy());
};
