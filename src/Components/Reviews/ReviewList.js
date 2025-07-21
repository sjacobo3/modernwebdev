import React from "react";
import ReviewItem from "./ReviewItem";

import { CircularProgress, Grid, Typography } from "@mui/material";

const ReviewList = ({ reviews = [], loading, onDelete, onEdit }) => {
  if (loading) {
    return (
      <Grid container justifyContent="center" mt={4}>
        <CircularProgress />
      </Grid>
    )
  }

  if (!loading && reviews.length === 0) {
    return (
      <Typography align="center" mt={16}>
        No reviews found.
      </Typography>
    )
  }

  return (
    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 12, sm: 9, md: 6 }} >
      {reviews.map((review) => (
        <Grid item size={6} key={review.id}>
          <ReviewItem 
            review={review}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReviewList;
