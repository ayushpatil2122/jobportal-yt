import { logger } from "./logger.js";

// Structured error logger for controller catch blocks. Use as:
//   logControllerError("approve_student_failed", error, req, { targetEmail });
// Produces a single JSON log line in Render with stack + actor + route
// context so 500s never appear as opaque blobs.
export const logControllerError = (scope, error, req, extra = {}) => {
    logger.error(scope, {
        message: error?.message,
        name: error?.name,
        code: error?.code,
        stack: error?.stack,
        method: req?.method,
        url: req?.originalUrl,
        paramsId: req?.params?.id || null,
        userId: String(req?.user?._id || req?.id || ""),
        role: req?.user?.role || null,
        requestId: req?.requestId || null,
        ...extra,
    });
};
