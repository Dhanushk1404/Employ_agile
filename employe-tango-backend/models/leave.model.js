import mongoose from 'mongoose';

const LeaveSchema = new mongoose.Schema({
  leaveType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  companyMail: {
    type: String,
    required: true,

  },
  logo: {
    type: String,
  },
  employeeId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,

  },
  mobileNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const leaveModel = mongoose.model("LeaveDetails",LeaveSchema);

export default leaveModel;
