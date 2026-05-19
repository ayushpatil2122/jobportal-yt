import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { toggleBookmark, getBookmarkedJobs } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.route("/toggle/:id").put(isAuthenticated, toggleBookmark);
router.route("/get").get(isAuthenticated, getBookmarkedJobs);

export default router;
