import mongoose from 'mongoose';

const LogsSchema = new mongoose.Schema({
  companyMail: {
    type: String,
    required: true,

  },
  task: {
    type: String,
  },
  timeSpent: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const logsModel = mongoose.model("LogsDetails",LogsSchema);

export default logsModel;
