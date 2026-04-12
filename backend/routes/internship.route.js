import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    createInternship, getAllInternships,
    getInternshipById, getAdminInternships
} from "../controllers/internship.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, createInternship);
router.route("/get").get(isAuthenticated, getAllInternships);
router.route("/get/:id").get(isAuthenticated, getInternshipById);
router.route("/admin").get(isAuthenticated, getAdminInternships);

export default router;
