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

//import React from "react";        

function ReviewItem({ review, onDelete, onEdit, showUser, onReply, replies = [], onDeleteReply, canDeleteReplies = false  }) { //make replies array to collect responses
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const courseCode = review.get("courseCode");
  const rating = review.get("rating");
  const difficulty = review.get("difficulty");
  const comment = review.get("comment");
  const grade = review.get("gradeReceived");
  const takeAgain = review.get("takeAgain");
  const attendance = review.get("attendance");

<<<<<<< HEAD
  const handleReplySubmit = () => {
    if (onReply && replyText.trim()) {
      onReply(review.id, replyText);
    }
    setReplyText("");
    setIsReplying(false);
  };
=======
  const user = review.get("user");
  const firstName = user?.get("firstName");
  const lastName = user?.get("lastName");
>>>>>>> 9d915ebee9a41689d29e26a46a65a47c6b58bc60

  return (
    <Card variant="outlined" sx={{ height: "100%", p: 1 }}>
      <CardContent>
        {showUser && (  
          <Box display="flex"  gap={1} alignItems="center">
            <IconButton>
              <Avatar sx={{ width: 30, height: 30, fontSize: 18 }} />
            </IconButton>
            <Typography variant="h6"  >
              {firstName} {lastName}
            </Typography>
          </Box>
        )}

        <Typography variant="h6"  >
          {courseCode}
        </Typography>
    
        <Typography variant="body2">
          <b>Rating:</b> {rating}
        </Typography>

        <Typography variant="body2">
          <b>Difficulty:</b> {difficulty}
        </Typography>

        <Typography variant="body2">
          <b>Grade Received:</b> {grade}
        </Typography>

        <Typography variant="body2">
          <b>Attendance:</b> {attendance ? "Yes" : "No"}
        </Typography>

        <Typography variant="body2">
          <b>Would Take Again:</b> {takeAgain ? "Yes" : "No"}
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
              const currentUser = Parse.User.current();
              const isOwner = currentUser && replyUser && replyUser.id === currentUser.id;

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
            <Button onClick={() => setIsReplying(!isReplying)} variant="outlined">
            {isReplying ? "Cancel" : "Reply"}
          </Button>
        </Stack>
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
