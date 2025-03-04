import mongoose, { models, Schema } from "mongoose";
import { User } from "./user.model.js";
import { Lab } from "./lab.model.js";

const issueSchema = new Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },
    labNo: {
      type: Number,
      required: true,
    },
    deviceType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Resolved by Technician", "Completed by Faculty"],
      default: "Pending",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    facultyLabIncharge: {
      type: Schema.Types.ObjectId,
      ref:'User',  
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 1,
    },
    technicianId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    resolutionNotes: {
      type: String,
    },
    facultyApprovalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    facultyApprovalNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Issue = models.Issue || mongoose.model("Issue", issueSchema);
