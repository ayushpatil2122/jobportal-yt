import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    internshipTitle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    approved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
