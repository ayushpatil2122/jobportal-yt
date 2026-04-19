import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createTestimonial, getAllTestimonials, approveTestimonial } from "../controllers/testimonial.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createTestimonial);
router.route("/get").get(getAllTestimonials);
router.route("/approve/:id").put(isAuthenticated, approveTestimonial);

export default router;
