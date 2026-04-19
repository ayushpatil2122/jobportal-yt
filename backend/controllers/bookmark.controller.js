import { User } from "../models/user.model.js";

export const toggleBookmark = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        const index = user.bookmarkedJobs.indexOf(jobId);
        if (index > -1) {
            user.bookmarkedJobs.splice(index, 1);
            await user.save();
            return res.status(200).json({ message: "Bookmark removed.", bookmarked: false, success: true });
        } else {
            user.bookmarkedJobs.push(jobId);
            await user.save();
            return res.status(200).json({ message: "Bookmark added.", bookmarked: true, success: true });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getBookmarkedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).populate({
            path: 'bookmarkedJobs',
            populate: { path: 'company' }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        return res.status(200).json({ bookmarkedJobs: user.bookmarkedJobs, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
