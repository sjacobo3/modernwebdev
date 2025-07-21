import React, { useEffect, useState } from "react";
import { fetchUserReviews } from "../../Services/AuthService";
import { createReview, updateReview, removeReview } from "../../Services/ReviewService";
import ReviewList from "../Reviews/ReviewList";
import ReviewForm from "../Reviews/ReviewForm";

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
    <div className="container">
      <h1>Your Profile</h1>
      <button
        onClick={() => {
          resetForm(); // clear editing state when toggling form
          setFormVisible(!isFormVisible);
        }}
      >
        {isFormVisible ? "Cancel" : "Add Review"}
      </button>

      {isFormVisible && (
        <div>
          <h2>{editingReview ? "Edit Review" : "Add New Review"}</h2>
          <ReviewForm
            initialValues={editingReview}
            onSubmit={handleFormSubmit}
            onCancel={resetForm}
          />
        </div>
      )}

      <ReviewList
        reviews={reviews}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default UserProfile;