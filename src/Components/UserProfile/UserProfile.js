import React, { useEffect, useState } from "react";
import { fetchUserReviews } from "../../Services/AuthService";
import { createReview, updateReview, removeReview } from "../../Services/ReviewService";

import ReviewList from "../Reviews/ReviewList";
import ReviewForm from "../Reviews/ReviewForm";

import { Box, Button, Container, Typography } from "@mui/material";

const UserProfile = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const userReviews = await fetchUserReviews();
      setReviews(userReviews);
    } catch (err) {
      alert("Failed to load reviews");
    }
    setLoading(false);
  };

  // Called when ReviewForm submits
  const handleFormSubmit = async (formData) => {
    try {
      if (editingReview) {
        await updateReview(editingReview.id, formData);
      } else {
        await createReview(formData);
      }
      resetForm();
      await loadReviews();
    } catch (err) {
      alert("Failed to save review");
    }
  };

  // Called when user clicks "Edit" on a review
  const handleEdit = (review) => {
    setEditingReview(review);
    setFormVisible(true);
  };

  // Called when user clicks "Delete" on a review
  const handleDelete = async (id) => {
    try {
      await removeReview(id);
      await loadReviews();
    } catch (err) {
      alert("Failed to delete review");
    }
  };

  const resetForm = () => {
    setEditingReview(null);
    setFormVisible(false);
  };

  return (
    <Container maxWidth="xl" sx={{ mt:4 }}>
      <Typography variant="h1" align="center" gutterBottom>
        Your Profile
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          onClick={() => {
            resetForm(); // clear editing state when toggling form
            setFormVisible(!isFormVisible);
          }}
        >
          {isFormVisible ? "Cancel" : "Add Review"}
        </Button>
      </Box>
      

      {isFormVisible && (
        // will be making a component to pop up
        <Box>
          <Typography variant="h2">{editingReview ? "Edit Review" : "Add New Review"}</Typography>
          <ReviewForm
            initialValues={editingReview}
            onSubmit={handleFormSubmit}
            onCancel={resetForm}
          />
        </Box>
      )}

      <Typography variant="h4" gutterBottom>Your Reviews</Typography>
      <ReviewList
        reviews={reviews}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Container>
  );
};

export default UserProfile;