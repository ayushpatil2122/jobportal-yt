import { Internship } from "../models/internship.model.js";

export const createInternship = async (req, res) => {
    try {
        const {
            title, description, requirements, eligibility, compensation,
            location, locationType, duration, openings, deadline, companyId, tags
        } = req.body;
        const userId = req.id;

        if (!title || !description || !location || !deadline || !companyId) {
            return res.status(400).json({ message: "Required fields missing.", success: false });
        }

        const internship = await Internship.create({
            title,
            description,
            requirements: requirements ? requirements.split(",") : [],
            eligibility: eligibility ? eligibility.split(",") : [],
            compensation: compensation || { type: 'TBA' },
            location,
            locationType: locationType || 'On-site',
            duration: duration || { value: 30, unit: 'days' },
            openings: openings || 1,
            deadline,
            company: companyId,
            created_by: userId,
            tags: tags ? tags.split(",") : []
        });

        return res.status(201).json({ message: "Internship created successfully.", internship, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getAllInternships = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const location = req.query.location || "";
        const status = req.query.status || "open";

        let query = { status };

        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ];
        }
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        const internships = await Internship.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        return res.status(200).json({ internships, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getInternshipById = async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id)
            .populate({ path: "company" })
            .populate({ path: "applications" });

        if (!internship) {
            return res.status(404).json({ message: "Internship not found.", success: false });
        }

        return res.status(200).json({ internship, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getAdminInternships = async (req, res) => {
    try {
        const internships = await Internship.find({ created_by: req.id })
            .populate({ path: 'company' })
            .sort({ createdAt: -1 });

        return res.status(200).json({ internships, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
