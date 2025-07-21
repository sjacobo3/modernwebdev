import React, { useEffect, useState } from "react";

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

    // Build form data object to send back up
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        required
      />

      <select
        value={attendance}
        onChange={(e) => setAttendance(e.target.value)}
        required
      >
        <option value="">Select Attendance</option>
        <option value="true">Required</option>
        <option value="false">Not Required</option>
      </select>

      <input
        type="text"
        placeholder="Grade Received"
        value={gradeReceived}
        onChange={(e) => setGradeReceived(e.target.value)}
      />

      <input
        type="number"
        min="1"
        max="5"
        placeholder="Difficulty (1-5)"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        required
      />

      <input
        type="number"
        min="1"
        max="5"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />

      <select
        value={takeAgain}
        onChange={(e) => setTakeAgain(e.target.value)}
        required
      >
        <option value="">Would you take again?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </form>
  );
};

export default ReviewForm;