import Parse from "parse";

// get all departments
export const getDepartments = async () => {
  const Department = Parse.Object.extend("Department");
  const query = new Parse.Query(Department);
  query.ascending("abbreviation");
  return await query.find();
};

// get all courses for a department
export const getCoursesForDepartment = async (department) => {
  const Course = Parse.Object.extend("Course");
  const query = new Parse.Query(Course);
  if (department) {
    query.equalTo("department", department);
  }
  query.ascending("code");
  return await query.find();
};

// get all professors for a department
export const getProfessorsForDepartment = async (department) => {
  if (!department) return [];

  const Professor = Parse.Object.extend("Professor");
  const query = new Parse.Query(Professor);
  query.equalTo("department", department);
  return await query.find();
};

// get reviews for a course
export const getReviewsForCourse = async (course) => {
  if (!course) return [];

  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  query.equalTo("course", course);
  return await query.find();
};