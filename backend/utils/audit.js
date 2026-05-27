import { AuditLog } from "../models/auditLog.model.js";
import { logger } from "./logger.js";

export const recordAuditLog = async ({
    req,
    actorId,
    actorRole = "admin",
    action,
    entityType,
    entityId = "",
    metadata = {},
}) => {
    try {
        if (!actorId || !action || !entityType) return;
        await AuditLog.create({
            actor: actorId,
            actorRole,
            action,
            entityType,
            entityId: String(entityId || ""),
            ip: req?.clientIp || req?.ip || "",
            userAgent: req?.headers?.["user-agent"] || "",
            metadata,
        });
    } catch (error) {
        // Never let audit-log persistence break the main flow. Surface enough
        // context in the log so we can debug from Render without guessing.
        logger.error("audit_log_failed", {
            action,
            entityType,
            entityId: String(entityId || ""),
            actorId: String(actorId || ""),
            error: error?.message,
            name: error?.name,
            stack: error?.stack,
            requestId: req?.requestId || null,
        });
    }
};

