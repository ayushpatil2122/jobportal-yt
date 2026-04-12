import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createInterview, getMyInterviews, updateInterviewStatus } from "../controllers/interview.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createInterview);
router.route("/my").get(isAuthenticated, getMyInterviews);
router.route("/:id/status").put(isAuthenticated, updateInterviewStatus);

export default router;
