import Parse from "parse";
import { useEffect, useState } from "react";
import { logoutUser } from "../../Services/AuthService";
import { fetchUserReviews } from "../../Services/ReviewService";
import {
  createReview,
  updateReview,
  removeReview,
} from "../../Services/ReviewService";
import { useNavigate } from "react-router-dom";

import ReviewList from "../Reviews/ReviewList";
import ReviewForm from "./ReviewForm";
import { removeReply } from "../../Services/ReplyService";

import { Box, Button, Container, Typography } from "@mui/material";

const UserProfile = () => {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logoutUser().then(() => {
      navigate("/home");
    });
  };

  //delte replies
  const handleDeleteReply = async (replyId) => {
    try {
      await removeReply(replyId);
      loadReviews(); // or trigger state update for replies
    } catch (err) {
      alert("Failed to delete reply");
    }
  };

  const userFullName = Parse.User.current()
    ? Parse.User.current().get("firstName") +
      " " +
      Parse.User.current().get("lastName")
    : "";

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography variant="h1" align="center" sx={{ mb: 4 }}>
        {userFullName}
      </Typography>

      <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
        <Button
          onClick={() => {
            resetForm(); // clear editing state when toggling form
            setFormVisible(!isFormVisible);
          }}
        >
          Add Review
        </Button>
      </Box>

      {isFormVisible && (
        // will be making a component to pop up
        <ReviewForm
          initialValues={editingReview}
          onSubmit={handleFormSubmit}
          onCancel={resetForm}
          isEditing={editingReview !== null}
        />
      )}

      <Typography variant="h4" align="center">
        Your Reviews
      </Typography>

      <ReviewList
        reviews={reviews}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        showUser={true}
        onDeleteReply={handleDeleteReply}
        canDeleteReplies={true}
        replyButton={false}
      />

      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
