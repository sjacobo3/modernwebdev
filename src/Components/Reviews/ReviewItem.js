import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  IconButton,
  Avatar,
  Typography,
  Box
} from "@mui/material";
import React from "react";

function ReviewItem({ review, onDelete, onEdit, showUser }) {

  const courseCode = review.get("courseCode");
  const rating = review.get("rating");
  const difficulty = review.get("difficulty");
  const comment = review.get("comment");
  const grade = review.get("gradeReceived");
  const takeAgain = review.get("takeAgain");
  const attendance = review.get("attendance");

  return (
    <Card variant="outlined" sx={{ height: "100%", p: 1 }}>

      <CardContent>
        {showUser && (  
          <Box display="flex"  gap={1} alignItems="center">
            <IconButton>
              <Avatar sx={{ width: 30, height: 30, fontSize: 18 }} />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Anonymous
            </Typography>
          </Box>
        )}

        <Typography variant="h6" gutterBottom>
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
      </CardContent>

      {(onEdit || onDelete) && (
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Stack direction="row" spacing={1}>
            {onEdit && (
              <Button onClick={() => onEdit(review)} variant="outlined">
                Edit
              </Button>
            )}
          </Stack>

          <Stack direction="row" spacing={1}>
            {onDelete && (
              <Button
                onClick={() => onDelete(review.id)}
                color="error"
                variant="outlined"
              >
                Delete
              </Button>
            )}
          </Stack>
        </CardActions>
      )}
    </Card>
  );
}

export default ReviewItem;
