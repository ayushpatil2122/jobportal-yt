export const notFound = (req, res, _next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal server error";

    if (process.env.NODE_ENV !== "test") {
        console.error(`[error] ${req.method} ${req.originalUrl} -> ${status}: ${message}`);
        if (status >= 500) console.error(err.stack);
    }

    res.status(status).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
