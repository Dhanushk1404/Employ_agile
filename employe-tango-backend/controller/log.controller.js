import logsModel from "../models/Logs.model.js";

export const logsFunc = async (req, res) => {
  const { companyMail, task, timeSpent } = req.body;

  if (!companyMail || !task || !timeSpent) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newLog = new logsModel({
      companyMail,
      task,
      timeSpent,
      createdAt: new Date(),
    });

    await newLog.save();
    return res
      .status(201)
      .json({ message: "Log added successfully", log: newLog });
  } catch (error) {
    console.error("Error saving log:", error);
    return res
      .status(500)
      .json({ message: "Server error, could not save log" });
  }
};

export const deletelogs = async (req, res) => {
  const { id } = req.params;
  try {
    const log = await logsModel.findById(id);
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    await logsModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (error) {
    console.error("Error deleting log:", error);
    res.status(500).json({ message: "Error deleting log", error });
  }
};
