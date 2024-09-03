export const loginValidator = async (data) => {
    const { userName, password, type } = data
    const allowedKeys = [
        "userName",
        "password",
        "type"
    ]
    const providedKeys = Object.keys(data);

    if (providedKeys.length < 3) {
        throw new Error(`Few Keys are missing in response body`);
    }
    if (providedKeys.length > 3) {
        throw new Error(`Extra keys are passed in response body`);
    }

    const invalidKeys = providedKeys.filter((key) => !allowedKeys.includes(key));
    if (invalidKeys.length > 0 || providedKeys.length !== allowedKeys.length) {
        throw new Error(`Extra/Invalid keys passed in the request body`);
    }
    if (typeof type !== "number") {
        throw new Error(`Invalid type is passed it should be of type Number`)
    }
    if (userName.length === 0) {
        throw new Error(`userName should be a non empty string!`);
    }
    if (password.length === 0) {
        throw new Error(`password should be a non empty string!`);
    }
}