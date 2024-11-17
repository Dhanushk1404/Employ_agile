import FeedModel from "../models/feed.model.js";
import EmployeModel from "../models/employee.model.js";

export const FeedModelFun = async (req, res) => {
    const { message, email } = req.body;
    
    try {

        const newFeed = new FeedModel({
            message,
            email,
            createdAt: new Date(), 
        });


        const savedFeed = await newFeed.save();

        res.status(201).json({
            success: true,
            data: savedFeed,
            message: "Announcement posted successfully!",
        });
    } catch (error) {
        console.error('Error posting announcement:', error);
        res.status(500).json({
            success: false,
            message: "An error occurred while posting the announcement.",
            error: error.message,
        });
    }
};


export const FeedMessagedisp = async (req, res) => {
    const { email } = req.params; 

    try {
        const feeds = await FeedModel.find({ email });
        if (feeds.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No announcements found for this email.",
            });
        }
        res.status(200).json({
            success: true,
            data: feeds,
        });
    } catch (error) {
        console.error("Error fetching announcements:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the announcements.",
            error: error.message,
        });
    }
};


export const employeedatafetch = async (req, res) => {
    const { email } = req.params; 
  
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
  
    try {
     
      const employees = await EmployeModel.find({ companyMail: email });
  
      if (!employees || employees.length === 0) {
        return res.status(404).json({ error: "No employees found for the given email." });
      }
  

      res.status(200).json({
        message: "Employee data fetched successfully",
        employees,
      });
    } catch (error) {
      console.error("Error fetching employee data:", error);
      res.status(500).json({ error: "Failed to fetch employee data" });
    }
  };
  