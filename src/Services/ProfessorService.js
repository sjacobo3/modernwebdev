import Parse from "parse";

// get all professors for a department
export const getProfessorsForDepartment = async (department) => {
    if (!department) return [];

    const Professor = Parse.Object.extend("Professor");
    const query = new Parse.Query(Professor);
    query.equalTo("department", department);
    query.ascending("name");
    return await query.find();
};

// get all courses for a professor (using the relation)
export const getCoursesForProfessor = async (professor) => {
    if (!professor) return [];

    const relation = professor.relation("courses");
    const query = relation.query();
    query.ascending("code");
    return await query.find();
};   