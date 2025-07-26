import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";

import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import {
  fetchRepliesForReview,
  createReply,
} from "../../Services/ReplyService";

const ReviewList = ({
  reviews = [],
  loading,
  onDelete,
  onEdit,
  showUser,
  canDeleteReplies = false,
  onDeleteReply,
  seeReplyButton,
}) => {
  const [replies, setReplies] = useState({});

  // Load replies for each review
  useEffect(() => {
    const loadAllReplies = async () => {
      const repliesData = {};
      for (const review of reviews) {
        const reviewId = review.id;
        const fetched = await fetchRepliesForReview(reviewId);
        repliesData[reviewId] = Array.isArray(fetched) ? fetched : [];
      }
      setReplies(repliesData);
    };

    if (!loading && reviews.length > 0) {
      loadAllReplies();
    }
  }, [reviews, loading]);

  const handleReply = async (reviewId, replyText) => {
    try {
      //const newReply = await createReply(reviewId, replyText);
      await createReply(reviewId, replyText);
      const updatedReplies = await fetchRepliesForReview(reviewId);
      setReplies((prev) => ({
        ...prev,
        [reviewId]: updatedReplies,
      }));
    } catch (err) {
      console.error("Error submitting reply:", err);
      alert("Failed to add reply");
    }
  };

  //  const handleReply = (reviewId, replyText) => {
  // setReplies((Prev) => ({
  //    ...Prev,
  //      [reviewId]: [...(Prev[reviewId] || []), replyText],
  //    }));

  if (loading) {
    return (
      <Grid container justifyContent="center" mt={4}>
        <CircularProgress />
      </Grid>
    );
  }

  if (!loading && reviews.length === 0) {
    return (
      <Typography align="center" mt={16}>
        No reviews found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} mt={2}>
        {reviews.map((review) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={review.id}>
            <ReviewItem
              review={review}
              onDelete={onDelete}
              onEdit={onEdit}
              showUser={showUser}
              replies={replies[review.id] || []}
              onReply={handleReply}
              onDeleteReply={onDeleteReply}
              //canDeleteReplies={true}
              seeReplyButton={true}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReviewList;
