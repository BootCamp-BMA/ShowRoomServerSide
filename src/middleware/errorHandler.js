module.exports.errorHandler = (err, req, res, next) => {
    try {
        console.error(err.stack);
        const statusCode = err.statusCode || 500;
        const message = err.message || "Internal Server Error";

        res.status(statusCode).json({
            success: false,
            status: statusCode,
            message: message,
        });
    } catch (error) {
        next(error);
    }
};
