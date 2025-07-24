import Parse from "parse"; 

//create a reply 
export const createReply = async (reviewId, userReply) => {
  const Reply = Parse.Object.extend("Reply");
  const reply = new Reply();

  const currentUser = Parse.User.current();
  if (!currentUser) return Promise.reject("No current user");

  const Review = Parse.Object.extend("Review");
  const review = new Review();
  review.id = reviewId;

  reply.set("user", currentUser); //user
  reply.set("review", review); //review pointer          
  reply.set("userReply", userReply); //reply text stuff 

  return reply.save()
    .then((savedReply) => {
      console.log("reply saved", savedReply);
      return savedReply;
    })
    .catch((err) => {
      console.error("Error creating reply:", err);
      throw err;
    });
};

// get replies for a specific review
export const fetchRepliesForReview = async (reviewId) => {
  const Reply = Parse.Object.extend("Reply");
  const query = new Parse.Query(Reply);

  const Review = Parse.Object.extend("Review");
  const review = new Review();
  review.id = reviewId;

  query.equalTo("review", review);
  query.ascending("createdAt");
  query.include("user"); //user data for replies or not ? 

  return query.find()
    .then((results) => {
      console.log(results);
      return results;
    })
    .catch((err) => {
      console.error("Error fetching all reviews:", err);
      throw err;
    });
};


// Delete a reply
export const removeReply = (replyId) => {
  const Reply = Parse.Object.extend("Reply");
  const query = new Parse.Query(Reply);

  return query.get(replyId)
    .then((reply) => {
      const currentUser = Parse.User.current();
      if (!currentUser) throw new Error("No current user");

      const owner = reply.get("user");
      if (owner?.id !== currentUser.id) {
        throw new Error("Unauthorized to delete this reply");
      }

      return reply.destroy();
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error("Error deleting reply:", err);
      throw err;
    });
};