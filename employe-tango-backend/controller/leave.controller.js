import leaveModel from "../models/leave.model.js";
import EmployeModel from "../models/employee.model.js";


export const leaveFunc = async (req, res) => {
  const {
    leaveType,
    startDate,
    endDate,
    reason,
    companyMail,
    logo,
    employeeId,
    firstName,
    email,
    mobileNumber,
  } = req.body;
 
   console.log(email);

  try {
    const employee = await EmployeModel.findOne({ email : email });
    if (!employee) {
      return res.status(500).send("Leave email is not found");
    }
    if (employee[leaveType] > 0) {
      employee[leaveType] -= 1;

      console.log(employee[leaveType]);

      await employee.save();

      const leaveData = new leaveModel({
        leaveType,
        startDate,
        endDate,
        reason,
        companyMail,
        logo,
        employeeId,
        firstName,
        email,
        mobileNumber,
      });
      await leaveData.save();
      res.status(201).json({ message: "Leave applied successfully" });
    }
    else{
      res.status(400).json({ error: `No available ${leaveType} leaves remaining` });
    }

  } catch (error) {
    res
      .status(500)
      .json({ error: "Error applying leave", details: error.message });
  }
};



export const leavefetch = async (req, res) => {
  const { companyEmail } = req.params;
  try {
    const leavedata = await leaveModel.find({ companyMail: companyEmail });

    if (leavedata.length === 0) {
      return res
        .status(404)
        .json({ message: "No leave data found for the given company email" });
    }

    res.status(200).json({ message: "Data fetched successfully", leavedata });
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


export const EmployeeleaveFunc = async(req,res)=>{
  const{email} = req.params;
  try {
    const employee = await EmployeModel.findOne({email:email});
    if(!employee){
      return res.status(500).send("error in the employee leave api");
    }

    res.status(200).json({empleave:employee});
  } catch (error) {
    res.status(500).send("error in the employee leave api");
  }
}