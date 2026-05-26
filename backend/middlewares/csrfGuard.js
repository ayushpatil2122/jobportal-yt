const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const toOrigin = (value) => {
    try {
        return new URL(String(value)).origin;
    } catch (_error) {
        return null;
    }
};

export const csrfGuard = ({ allowedOrigins = [] } = {}) => {
    const allowedSet = new Set(allowedOrigins.map((origin) => String(origin).trim()).filter(Boolean));

    return (req, res, next) => {
        if (SAFE_METHODS.has(req.method)) return next();

        // Enforce for cookie-authenticated requests only; this keeps non-browser clients
        // and public unauthenticated endpoints behavior unchanged.
        if (!req.cookies?.token) return next();

        const originHeader = req.headers.origin;
        const refererHeader = req.headers.referer;
        const requestOrigin = toOrigin(originHeader) || toOrigin(refererHeader);

        // Some non-browser clients omit origin/referer entirely.
        if (!requestOrigin) return next();

        if (allowedSet.has(requestOrigin)) return next();

        return res.status(403).json({
            success: false,
            message: "Blocked by CSRF protection.",
        });
    };
};

