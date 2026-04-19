import mongoose from "mongoose";

const interviewInviteSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    scheduledDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        default: 30
    },
    interviewerEmails: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
        default: 'scheduled'
    },
    meetingLink: {
        type: String
    },
    notes: {
        type: String
    },
    field: {
        type: String
    }
}, { timestamps: true });

export const InterviewInvite = mongoose.model("InterviewInvite", interviewInviteSchema);
