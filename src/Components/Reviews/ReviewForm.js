import { useEffect, useState } from "react";
import { Box, Button, FormControl, MenuItem, TextField, Select, InputLabel, Dialog, DialogTitle, DialogContent, Autocomplete } from "@mui/material";
import { getDepartments } from "../../Services/DepartmentService";
import { getCoursesForDepartment, getProfessorsForCourse } from "../../Services/CourseService";
import { getCurrentUser } from "../../Services/AuthService";

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
  "Summer"
];

const ReviewForm = ({ initialValues, onSubmit, onCancel, isEditing }) => {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [professor, setProfessor] = useState(null); // professor is a Parse object

  const [department, setDepartment] = useState(null);
  const [course, setCourse] = useState(null);       // course is a Parse object
  const [courseCode, setCourseCode] = useState(""); // course code is a string
  const [professorName, setProfessorName] = useState(""); // professor name is a string
  const [difficulty, setDifficulty] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [majorRequirement, setMajorRequirement] = useState("");
  const [semesterTaken, setSemesterTaken] = useState("");

  useEffect(() => {
    getDepartments().then(setDepartments);
  }, []);

  useEffect(() => {
    if (department) {
      getCoursesForDepartment(department).then(setCourses);
      setCourseCode(null);
    } else {
      setCourses([]);
      setCourseCode(null);
    }
  }, [department]);

  useEffect(() => {
    if (course) {
      getProfessorsForCourse(course.get("code")).then(setProfessors);
      setProfessor(null);
    } else {
      setProfessors([]);
      setProfessor(null);
    }
  }, [course, courseCode]);

  useEffect(() => {
    if (initialValues) {
      setDepartment(initialValues.get("department"));
      setCourseCode(initialValues.get("courseCode"));
      setProfessorName(initialValues.get("professorName"));
      setDifficulty(initialValues.get("difficulty")?.toString());
      setRating(initialValues.get("rating")?.toString());
      setComment(initialValues.get("comment"));
      setMajorRequirement(initialValues.get("majorRequirement") ? "true" : "false");
      setSemesterTaken(initialValues.get("semesterTaken") || "");
    } else {
      setDepartment(null);
      setCourseCode(null);
      setProfessorName(null);
      setDifficulty("");
      setRating("");
      setComment("");
      setMajorRequirement("");
      setSemesterTaken("");
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      department,
      course,       // pass the course object
      courseCode,   // pass the course code
      professor,    // pass the professor object
      professorName, // pass the professor name
      difficulty: parseInt(difficulty),
      rating: parseInt(rating),
      comment,
      majorRequirement: majorRequirement === "true",
      semesterTaken,
      user: getCurrentUser(),
    });
  };

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>{isEditing ? "Edit Review" : "Add Review"}</DialogTitle>
        <Box display="flex" gap={2} justifyContent="center" mr={5}>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            <Button type="button" variant="contained" onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        </Box>

      <DialogContent>
        <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl required>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              value={department || ""}
              onChange={e => setDepartment(e.target.value)}
            >
              {departments.map(dep => (
                <MenuItem key={dep.id} value={dep}>
                  {dep.get("abbreviation")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl required disabled={!department}>
            <Autocomplete
              disabled={!department}
              options={courses}
              getOptionLabel={option => option?.get ? option.get("code") : option}
              value={courses.find(course => course.get("code") === courseCode) || null} 
              onChange={(event, newValue) => {
                setCourse(newValue);
                setCourseCode(newValue ? newValue.get("code") : "");
              }}              
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Course" required />
              )}
            />
          </FormControl>

          <FormControl required disabled={!courseCode}>
            <Autocomplete
              disabled={!courseCode}
              options={professors}
              getOptionLabel={option => option?.get ? option.get("name") : option}
              value={professor}
              onChange={(event, newValue) => {
                setProfessor(newValue);
              }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Professor" required />
              )}
            />
          </FormControl>

          <TextField
            label="Difficulty (1-5)"
            type="number"
            min="1"
            max="5"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            required
          />

          <TextField
            label="Rating (1-5)"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={e => setRating(e.target.value)}
            required
          />

          <FormControl>
            <InputLabel id="major-req-label">Major Requirement?</InputLabel>
            <Select
              labelId="major-req-label"
              value={majorRequirement}
              onChange={e => setMajorRequirement(e.target.value)}
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
              onChange={e => setSemesterTaken(e.target.value)}
              required
            >
              {SEMESTERS.map(semester => (
                <MenuItem key={semester} value={semester}>
                  {semester}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            multiline
            minRows={3}
          />
        </FormControl>
        
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
