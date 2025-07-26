import Parse from "parse";

// get all professors
export const getAllProfessors = async () => {
  const Professor = Parse.Object.extend("Professor");
  const query = new Parse.Query(Professor);
  query.ascending("name");
  return await query.find();
};

// get courses professor teaches
export const getCoursesForProfessor = async (professor) => {
  if (!professor) return [];

  const Professor = Parse.Object.extend("Professor");
  const query = new Parse.Query(Professor);
  query.include("courseCodes");
  const result = await query.get(professor.id);
  return result.get("courseCodes") || [];
};