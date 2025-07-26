import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Select,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  DialogActions,
  Typography,
} from "@mui/material";

import { getCurrentUser } from "../../Services/AuthService";
import {
  getDepartments,
  getProfessorsForDepartment,
  getCoursesForDepartment,
} from "../../Services/CourseService";
import { fetchUserReviews } from "../../Services/ReviewService";

// variables for semesters
const SEMESTERS = [
  "Freshman Fall",
  "Freshman Spring",
  "Sophomore Fall",
  "Sophomore Spring",
  "Junior Fall",
  "Junior Spring",
  "Senior Fall",
  "Senior Spring",
  "Summer",
];

const ReviewForm = ({ initialValues, onSubmit, onCancel, isEditing }) => {
  // state variables for form
  const [course, setCourse] = useState("");
  const [professor, setProfessor] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [majorRequirement, setMajorRequirement] = useState("");
  const [semesterTaken, setSemesterTaken] = useState("");

  const [allDepartments, setAllDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [availableProfessors, setAvailableProfessors] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  // Load departments
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const departments = await getDepartments();
        setAllDepartments(departments);
      } catch (err) {
        console.error("Error loading courses:", err);
      }
    };
    loadCourses();
  }, []);

  // load courses for department that user has not made a review for
  useEffect(() => {
    const loadCourses = async () => {
      if (!department) return;

      try {
        // get all course in department
        const courses = await getCoursesForDepartment(department);
        // get the reviews made by the user
        const userReviews = await fetchUserReviews();

        const reviewedCourseIds = new Set(
          userReviews.map((review) => review.get("course").id)
        );

        const filteredCourses = courses.filter(
          (course) => !reviewedCourseIds.has(course.id)
        );
        setAvailableCourses(filteredCourses);
      } catch (err) {
        console.error("Error loading courses for department:", err);
        setAvailableCourses([]);
      }
    };
    loadCourses();
  }, [department, initialValues]);

  // load professors for department
  useEffect(() => {
    const loadProfessors = async () => {
      if (!department) return;

      try {
        const professors = await getProfessorsForDepartment(department);
        setAvailableProfessors(professors);
      } catch (err) {
        console.error("Error loading professors for department:", err);
        setAvailableProfessors([]);
      }
    };
    loadProfessors();
  }, [department]);

  // get values
  useEffect(() => {
    if (initialValues) {
      setCourse(initialValues.get("course"));
      setProfessor(initialValues.get("professor"));
      setDifficulty(initialValues.get("difficulty"));
      setRating(initialValues.get("rating"));
      setComment(initialValues.get("comment"));
      setMajorRequirement(
        initialValues.get("majorRequirement") ? "true" : "false"
      );
      setSemesterTaken(initialValues.get("semesterTaken"));
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      course,
      professor,
      difficulty: parseInt(difficulty),
      rating: parseInt(rating),
      comment,
      majorRequirement: majorRequirement === "true",
      semesterTaken,
      user: getCurrentUser(),
      department,
    });
  };

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>{isEditing ? "Edit Review" : "Add Review"}</DialogTitle>
      </Box>

      <DialogContent>
        <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* // show deparment, course, and professor fields if not editing */}
          {!isEditing ? (
            <>
              <FormControl required>
                <Autocomplete
                  options={allDepartments}
                  getOptionLabel={(option) => option.get("abbreviation")}
                  onChange={(event, newValue) => {
                    setDepartment(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Department" required />
                  )}
                />
              </FormControl>

              <FormControl required disabled={!department}>
                <Autocomplete
                  disabled={!department}
                  options={availableCourses}
                  getOptionLabel={(option) =>
                    option?.get
                      ? `${option.get("code")} - ${option.get("name")}`
                      : option
                  }
                  onChange={async (event, newValue) => {
                    setCourse(newValue);
                  }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} label="Course" required />
                  )}
                />
              </FormControl>

              <FormControl required disabled={!course}>
                <Autocomplete
                  disabled={!course}
                  options={availableProfessors}
                  getOptionLabel={(option) =>
                    option?.get ? option.get("name") : option
                  }
                  onChange={(event, newValue) => {
                    setProfessor(newValue);
                  }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} label="Professor" required />
                  )}
                />
              </FormControl>
            </>
          ) : (
            <>
              <Typography variant="h5">
                {course && typeof course.get === "function"
                  ? `${course.get("code")} - ${course.get("name")}`
                  : typeof course === "object"
                  ? `${course.code || ""} - ${course.name || ""}`
                  : course}
              </Typography>
              <Typography variant="h5">
                {professor && typeof professor.get === "function"
                  ? professor.get("name")
                  : typeof professor === "object"
                  ? professor.name || ""
                  : professor}
              </Typography>
            </>
          )}

          <TextField
            label="Rating (1-5)"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
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

          <FormControl>
            <InputLabel id="major-req-label">Major Requirement?</InputLabel>
            <Select
              labelId="major-req-label"
              value={majorRequirement}
              onChange={(e) => setMajorRequirement(e.target.value)}
              required
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="semester-label">Semester</InputLabel>
            <Select
              labelId="semester-label"
              value={semesterTaken}
              onChange={(e) => setSemesterTaken(e.target.value)}
              required
            >
              {SEMESTERS.map((semester) => (
                <MenuItem key={semester} value={semester}>
                  {semester}
                </MenuItem>
              ))}
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
      </DialogContent>
      <DialogActions sx={{ px: 5, py: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewForm;
