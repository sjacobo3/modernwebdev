import Parse from "parse";

// get all courses for a department
export const getCoursesForDepartment = async (department) => {
    if (!department) return [];

    const Course = Parse.Object.extend("Course");
    const query = new Parse.Query(Course);
    query.equalTo("department", department);
    query.ascending("name");
    return await query.find();
};

// get all professors for a course (using the relation)
export const getProfessorsForCourse = async (courseCode) => {

    const Course = Parse.Object.extend("Course");
    const query = new Parse.Query(Course);
    query.equalTo("code", courseCode);
    const course = await query.first();

    if (!course) return [];

    const relation = course.relation("professors");
    return await relation.query().find();
};

// get all reviews for a course (using the relation)
export const getReviewsForCourse = async (course) => {
    if (!course) return [];

    const relation = course.relation("reviews");
    const query = relation.query();
    query.ascending("createdAt");
    return await query.find();
}