import { useEffect, useState } from "react";

import { Box, Button, FormControl, MenuItem, TextField, Select, InputLabel } from "@mui/material";

const ReviewForm = ({ initialValues, onSubmit, onCancel }) => {
  // Internal state for form inputs
  const [courseCode, setCourseCode] = useState("");
  const [attendance, setAttendance] = useState("");
  const [gradeReceived, setGradeReceived] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [takeAgain, setTakeAgain] = useState("");

  // Populate form fields when initialValues changes (e.g. editing a review)
  useEffect(() => {
    if (initialValues) {
      setCourseCode(initialValues.get("courseCode") || "");
      setAttendance(initialValues.get("attendance") ? "true" : "false");
      setGradeReceived(initialValues.get("gradeReceived") || "");
      setDifficulty(initialValues.get("difficulty")?.toString() || "");
      setRating(initialValues.get("rating")?.toString() || "");
      setComment(initialValues.get("comment") || "");
      setTakeAgain(initialValues.get("takeAgain") ? "true" : "false");
    } else {
      // Clear form if no initialValues (adding new)
      setCourseCode("");
      setAttendance("");
      setGradeReceived("");
      setDifficulty("");
      setRating("");
      setComment("");
      setTakeAgain("");
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      courseCode,
      attendance: attendance === "true",
      gradeReceived,
      difficulty: parseInt(difficulty),
      rating: parseInt(rating),
      comment,
      takeAgain: takeAgain === "true",
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={3}>
      <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
          required
        />

        <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InputLabel id="attendance-label">Attendance</InputLabel>
          <Select
            label="Attendance"
            labelId="attendance-label"
            id="attendace"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            required
          >
            <MenuItem value="true">Required</MenuItem>
            <MenuItem value="false">Not Required</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Grade Received"
          value={gradeReceived}
          onChange={(e) => setGradeReceived(e.target.value.toUpperCase())}
        />

        <TextField
          label="Difficulty (1-5)"
          type="number"
          min="1"
          max="5"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
        />

        <TextField
          label="Rating (1-5)"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <FormControl required sx={{ display: "flex", flexDirection: "column", gap: 2 }} >
          <InputLabel id="take-again-label">Would Take Again?</InputLabel>
          <Select
            label="Would Take Again?"
            labelId="take-again-label"
            id="take-again"
            value={takeAgain}
            onChange={(e) => setTakeAgain(e.target.value)}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          minRows={3}
        />
      </FormControl>

      <Box display="flex" gap={2} mt={2} justifyContent="center">
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button type="submit" variant="contained" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewForm;
