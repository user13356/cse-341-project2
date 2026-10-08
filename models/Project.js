const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },

        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 500
        },

        client: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },

        status: {
            type: String,
            required: true,
            enum: [
                "planning",
                "active",
                "completed",
                "cancelled"
            ]
        },

        priority: {
            type: String,
            required: true,
            enum: [
                "low",
                "medium",
                "high"
            ]
        },

        budget: {
            type: Number,
            required: true,
            min: 0
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Project", projectSchema);
