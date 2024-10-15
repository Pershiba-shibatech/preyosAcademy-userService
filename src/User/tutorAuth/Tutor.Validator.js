export const createtutorvalidator = async (data) => {
    const { firstName, email, tutorName, timeZone, password, experince, phoneNumber, subjects } = data;
    const allowedKeys = [
        "firstName",
        "lastName",
        "tutorName",
        "subjects",
        "experince",
        "Address",
        "AccountDetails",
        "phoneNumber",
        "countryCode",
        "email",
        "password",
        "timeZone",
        "userType",
        "Coordinator",
        "Dob","Qualification"
    ];
    const providedKeys = Object.keys(data);

    if (providedKeys.length < 16) {
        throw new Error(`Few Keys are missing / extra keys in response body`);
    }

    const invalidKeys = providedKeys.filter((key) => !allowedKeys.includes(key));
    if (invalidKeys.length > 0 || providedKeys.length !== allowedKeys.length) {
        throw new Error(`Extra/Invalid keys passed in the request body`);
    }
    if (firstName.length === 0) {
        throw new Error(`FirstName should be a non empty string!`);
    }
    if (email.length === 0) {
        throw new Error(`email should be a non empty string!`);
    }
    if (tutorName.length === 0) {
        throw new Error(`tutorName should be a non empty string!`);
    }
    if (timeZone.length === 0) {
        throw new Error(`timeZone should be a non empty string!`);
    }
    if (password.length === 0) {
        throw new Error(`password should be a non empty string!`);
    }
    if (experince.length === 0) {
        throw new Error(`experince should be a non empty string!`);
    }
    if (phoneNumber.length === 0) {
        throw new Error(`phoneNumber should be a non empty string!`);
    }
    if (subjects.length === 0) {
        throw new Error(`subjects should be a non empty Array!`);
    }
}