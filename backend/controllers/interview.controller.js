import { InterviewInvite } from "../models/interviewInvite.model.js";

export const createInterview = async (req, res) => {
    try {
        const { position, companyId, candidateId, jobId, scheduledDate, duration, interviewerEmails, meetingLink, notes, field } = req.body;

        if (!position || !companyId || !candidateId || !scheduledDate) {
            return res.status(400).json({ message: "Required fields missing.", success: false });
        }

        const interview = await InterviewInvite.create({
            position,
            company: companyId,
            candidate: candidateId,
            job: jobId,
            scheduledDate,
            duration: duration || 30,
            interviewerEmails: interviewerEmails || [],
            meetingLink,
            notes,
            field
        });

        return res.status(201).json({ message: "Interview scheduled successfully.", interview, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getMyInterviews = async (req, res) => {
    try {
        const userId = req.id;
        const now = new Date();

        const upcoming = await InterviewInvite.find({
            candidate: userId,
            scheduledDate: { $gte: now },
            status: { $in: ['scheduled', 'rescheduled'] }
        })
            .populate({ path: 'company' })
            .sort({ scheduledDate: 1 });

        const past = await InterviewInvite.find({
            candidate: userId,
            $or: [
                { scheduledDate: { $lt: now } },
                { status: { $in: ['completed', 'cancelled'] } }
            ]
        })
            .populate({ path: 'company' })
            .sort({ scheduledDate: -1 });

        return res.status(200).json({ upcoming, past, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const updateInterviewStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const interview = await InterviewInvite.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!interview) {
            return res.status(404).json({ message: "Interview not found.", success: false });
        }

        return res.status(200).json({ message: "Interview status updated.", interview, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
