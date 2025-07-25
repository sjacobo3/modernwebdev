import Parse from "parse";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  IconButton,
  Avatar,
  Typography,
  Box,
  TextField,
} from "@mui/material";

import {
  isUserAuthenticated,
  //getCurrentUser,
} from "../../Services/AuthService";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";


  //make replies array to collect responses
  //const navigate = useNavigate();
//
function ReviewItem({ review, onDelete, onEdit, showUser, onReply, replies = [], onDeleteReply, canDeleteReplies = true, seeReplyButton  }) { //make replies array to collect responses
 const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [likes, setLikes] = useState(review.get("likes") || []);
  const navigate = useNavigate();

  const course = review.get("course") || "";
  const rating = review.get("rating");
  const difficulty = review.get("difficulty");
  const comment = review.get("comment");
  const professor = review.get("professor") || "";
  const majorRequirement = review.get("majorRequirement");
  const semesterTaken = review.get("semesterTaken");

  const userAuthenticated = isUserAuthenticated();

  //like stuff 
  const currentUser = Parse.User.current();
  //like stuff
  //const currentUser = getCurrentUser();
  const hasLiked = currentUser && likes.includes(currentUser.id);

  const handleReplySubmit = () => {
    if (onReply && replyText.trim()) {
      onReply(review.id, replyText);
    }
    setReplyText("");
    setIsReplying(false);
  };

  const handleToggleLike = async () => {
    try {
      const Review = Parse.Object.extend("Review");
      const query = new Parse.Query(Review);
      const updatedReview = await query.get(review.id);

      const existingLikes = updatedReview.get("likes") || [];
      const userId = currentUser.id;

      if (existingLikes.includes(userId)) {
        updatedReview.set(
          "likes",
          existingLikes.filter((id) => id !== userId)
        );
      } else {
        updatedReview.set("likes", [...existingLikes, userId]);
      }

      const saved = await updatedReview.save();
      setLikes(saved.get("likes") || []);
    } catch (err) {
      console.error("Error toggling like:", err);
      alert("Failed to like/unlike");
    }
  };

  const user = review.get("user");
  const firstName = user?.get("firstName");
  const lastName = user?.get("lastName");

  return (
    <Card variant="outlined" sx={{ height: "100%", p: 1 }}>
      <CardContent>
        {showUser && (
          <Box display="flex" gap={1} alignItems="center">
            <IconButton>
              <Avatar sx={{ width: 30, height: 30, fontSize: 18 }} />
            </IconButton>
            <Typography variant="h6">
              {userAuthenticated ? `${firstName} ${lastName}` : "Anonymous"}
            </Typography>
          </Box>
        )}

        <Typography variant="h6">
          {course && typeof course.get === "function"
            ? course.get("code")
            : course || ""}
        </Typography>

        <Typography variant="body2">
          <b>Professor:</b>{" "}
          {professor && typeof professor.get === "function"
            ? professor.get("name")
            : professor || ""}
        </Typography>

        <Typography variant="body2">
          <b>Rating:</b> {rating}
        </Typography>

        <Typography variant="body2">
          <b>Difficulty:</b> {difficulty}
        </Typography>

        <Typography variant="body2">
          <b>Major Requirement:</b> {majorRequirement ? "Yes" : "No"}
        </Typography>

        <Typography variant="body2">
          <b>Semester Taken:</b> {semesterTaken}
        </Typography>

        <Typography variant="body2">
          <b>Comment:</b> {comment}
        </Typography>

        {/*list replys */}
        {replies.length > 0 && (
          <Box mt={2} pl={2} borderLeft="2px solid #ddd">
            <Typography variant="subtitle2" gutterBottom>
              Replies:
            </Typography>
            {replies.map((r, idx) => {
              const replyText = r.get("userReply");
              const replyUser = r.get("user");

              const replyUserId = replyUser?.id || replyUser?.get("objectId");
              const currentUser = Parse.User.current();
              const isOwner = currentUser && replyUserId === currentUser.id;


             // const currentUser = Parse.User.current();
             // const replyUserId = replyUser?.id || replyUser?.get("objectId");
              //const isOwner = currentUser && replyUserId === currentUser.id;
              //const isOwner =
               // currentUser && replyUser && replyUser.id === currentUser.id;

              return (
                <Box
                  key={idx}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
                • {replyText}
                </Typography>
            
              {canDeleteReplies && isOwner && (
                <Button
                  color="error"
                  size="small"
                  onClick={() => onDeleteReply && onDeleteReply(r.id)}
                  >
                  Delete
                </Button>
              )}
            </Box>
          );
        })}
      </Box> 
    )}
          {/*reply button and text field */}
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Stack direction="row" spacing={1}>
          {onEdit && (
            <Button onClick={() => onEdit(review)} variant="outlined">
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              onClick={() => onDelete(review.id)}
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
          )}
          {seeReplyButton && (
            <Button
              onClick={() => {
                if (!currentUser) {
                  navigate("/auth/login"); //redirect to login page if user is not logged in
                  return;
                }
                setIsReplying(!isReplying);
              }}
              variant="outlined"
            >
              {isReplying ? "Cancel" : "Reply"}
            </Button>
          )}
        </Stack>
        <Button
          onClick={handleToggleLike}
          color={hasLiked ? "primary" : "inherit"}
          startIcon={<ThumbUpAltIcon />}
        >
          {likes.length}
        </Button>
      </CardActions>
      {isReplying && (
        <Box p={2}>
          <TextField //reply box
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            fullWidth
            multiline
            minRows={2}
          />
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            onClick={handleReplySubmit}
          >
            Submit Reply
          </Button>
        </Box>

        //</Card> </Stack>
        //</CardActions>
      )}
    </Card>
  );
}

export default ReviewItem;