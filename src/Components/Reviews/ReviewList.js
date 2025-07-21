import React from "react";
import ReviewItem from "./ReviewItem";

import { CircularProgress, Container, Grid, Typography } from "@mui/material";

const ReviewList = ({ reviews = [], loading, onDelete, onEdit }) => {
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
      <Grid container spacing={3} mt={2} sx={{ border: "1px solid red" }}>
        {reviews.map((review) => (
          <Grid key={review.id}>
            <ReviewItem review={review} onDelete={onDelete} onEdit={onEdit} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReviewList;
