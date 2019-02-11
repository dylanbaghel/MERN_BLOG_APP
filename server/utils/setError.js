const setError = (code, message) => {
    return {
        errors: {
            code,
            message
        }
    };
};

module.exports = setError;