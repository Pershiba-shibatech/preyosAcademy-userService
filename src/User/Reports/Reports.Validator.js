export const reportValidator = async (query) => {
    const providedKeys = Object.keys(query);
    const allowedKeys = [
        "student",
        "subject"]

    const invalidKeys = providedKeys.filter((key) => !allowedKeys.includes(key));
    if (invalidKeys.length > 0 || providedKeys.length !== allowedKeys.length) {
        throw new Error(`Extra/Invalid keys passed in the request body`);
    }
}