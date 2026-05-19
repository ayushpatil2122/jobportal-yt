import { Testimonial } from "../models/testimonial.model.js";

export const createTestimonial = async (req, res) => {
    try {
        const { companyId, collegeName, internshipTitle, content, rating } = req.body;
        const userId = req.id;

        if (!companyId || !collegeName || !internshipTitle || !content) {
            return res.status(400).json({ message: "Required fields missing.", success: false });
        }

        const testimonial = await Testimonial.create({
            student: userId,
            company: companyId,
            collegeName,
            internshipTitle,
            content,
            rating: rating || 5
        });

        return res.status(201).json({ message: "Testimonial submitted successfully.", testimonial, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ approved: true })
            .populate({ path: 'student', select: 'fullname profile.profilePhoto college' })
            .populate({ path: 'company', select: 'name logo' })
            .sort({ createdAt: -1 });

        return res.status(200).json({ testimonials, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const approveTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { approved: true },
            { new: true }
        );

        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found.", success: false });
        }

        return res.status(200).json({ message: "Testimonial approved.", testimonial, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
