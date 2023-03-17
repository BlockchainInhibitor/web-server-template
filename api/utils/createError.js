const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    //Todo extend error
    return err;
};

export default createError;