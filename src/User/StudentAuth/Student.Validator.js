export const createStudentValidator = async (data) => {
    const { firstName, email, studentName, timeZone, password, grade, phoneNumber, subjects, parentName, userType, Coordinator } = data;
    const allowedKeys = [
        "firstName",
        "lastName",
        "studentName",
        "parentName",
        "Requirements",
        "subjects",
        "grade",
        "Address",
        "AccountDetails",
        "phoneNumber",
        "countryCode",
        "email",
        "password",
        "timeZone",
        "userType",
        "Coordinator"
    ];
    const providedKeys = Object.keys(data);
   
    if (providedKeys.length < 16) {
        throw new Error(`Few Keys are missing in response body`);
    }
    if (providedKeys.length > 16){
        throw new Error(`Passed Extra keys in response body`);
    }


    const invalidKeys = providedKeys.filter((key) => !allowedKeys.includes(key));
    console.log(invalidKeys,"invalidKeys")
    if (invalidKeys.length > 0 || providedKeys.length !== allowedKeys.length) {
        throw new Error(`Extra/Invalid keys passed in the request body`);
    }
    console.log("called");
    if (firstName.length === 0) {
        throw new Error(`FirstName should be a non empty string!`);
    }
    if (email.length === 0) {
        throw new Error(`email should be a non empty string!`);
    }
    if (studentName.length === 0) {
        throw new Error(`studentName should be a non empty string!`);
    }
    if (parentName.length === 0) {
        throw new Error(`parentName should be a non empty string!`);
    }
    if (timeZone.length === 0) {
        throw new Error(`timeZone should be a non empty string!`);
    }
    if (password.length === 0) {
        throw new Error(`password should be a non empty string!`);
    }
    if (grade.length === 0) {
        throw new Error(`grade should be a non empty string!`);
    }
    if (phoneNumber.length === 0) {
        throw new Error(`phoneNumber should be a non empty string!`);
    }
    if (subjects.length === 0) {
        throw new Error(`subjects should be a non empty Array!`);
    }
    if (userType!=="Student"){
        throw new Error(`userType is invalid should be Student`);
    }
    if (Coordinator===""){
        throw new Error(`Coordinator is required property`);
    }
}