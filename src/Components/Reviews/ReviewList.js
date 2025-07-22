import React from "react";
import ReviewItem from "./ReviewItem";

import { CircularProgress, Container, Grid, Typography } from "@mui/material";

const ReviewList = ({ reviews = [], loading, onDelete, onEdit, showUser }) => {
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
            <ReviewItem review={review} onDelete={onDelete} onEdit={onEdit} showUser={showUser} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReviewList;
