import Parse from "parse";

// get all departments
export const getDepartments = async () => {
    const Department = Parse.Object.extend("Department");
    const query = new Parse.Query(Department);
    console.log("query", query);
    query.ascending("abbreviation");
    return await query.find();
};