import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CompanyDetailModel from "../models/auth.model.js";
import EmployeModel from "../models/employee.model.js";

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({ storage: storage });

const JWT_SECRET = "x4V7&9rU3qC#oT8pA1l$zD3fE6gN2hJ8";

export const CompanyDetails = [
  upload.single("logo"),
  async (req, res) => {
    try {
      const {
        companyName,
        website,
        organizationType,
        contactNumber,
        contactEmail,
        primaryAddress,
        password,
        locationName,
        mailAlias,
        description,
        address,
        country,
        state,
        departments,
      } = req.body;

      if (!req.file) {
        return res
          .status(400)
          .json({ error: "No file uploaded. Please upload a logo." });
      }

      if (
        !companyName ||
        !website ||
        !organizationType ||
        !contactNumber ||
        !contactEmail ||
        !primaryAddress
      ) {
        return res.status(400).json({ error: "Required fields are missing." });
      }

      const existingCompany = await CompanyDetailModel.findOne({
        "organization.contactEmail": contactEmail,
      });
      if (existingCompany) {
        return res
          .status(400)
          .json({ error: "User already exists with this email." });
      }

      const logo = `/uploads/${req.file.filename}`;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newCompanyDetail = new CompanyDetailModel({
        organization: {
          logo,
          companyName,
          website,
          organizationType,
          contactNumber,
          contactEmail,
          primaryAddress,
          password: hashedPassword,
        },
        location: {
          locationName,
          mailAlias,
          description,
          address,
          country,
          state,
        },
        departments: departments ? departments.split(",") : [],
      });

      await newCompanyDetail.save();

      const token = jwt.sign({ id: newCompanyDetail._id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({
        message: "Company details saved successfully!",
        token,
      });
    } catch (error) {
      console.error("Error saving organization details:", error);
      res.status(500).json({ message: "Failed to save organization details" });
    }
  },
];

export const loginApi = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const organization = await CompanyDetailModel.findOne({
      "organization.contactEmail": email,
    });

    if (!organization) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(
      password,
      organization.organization.password
    );
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: organization._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful!",
      token,
      organizationDetails: organization,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const employeeDataFunc = [
  upload.single("profilePhoto"),
  async (req, res) => {
    const {
      companyMail,
      employeeId,
      firstName,
      lastName,
      nickname,
      email,
      mobileNumber,
      location,
      designation,
      experience,
      dob,
      gender,
      maritalStatus,
      aboutMe,
      phoneNumber,
      address,
      password, // Assume password is sent in the request body
    } = req.body;

    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ error: "No file uploaded. Please upload a profile photo." });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      const employee = new EmployeModel({
        companyMail,
        profilePhoto: req.file.path,
        employeeId,
        firstName,
        lastName,
        nickname,
        email,
        mobileNumber,
        location,
        designation,
        experience,
        dob,
        gender,
        maritalStatus,
        aboutMe,
        phoneNumber,
        address,
        password: hashedPassword,
      });

      await employee.save();
      res.status(200).json({ message: "Employee data saved successfully" });
    } catch (error) {
      console.error("Error saving employee data:", error);
      res.status(500).json({ error: "Failed to save employee data" });
    }
  },
];

// export const EmployeeloginFunc = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const employee = await EmployeModel.findOne({ email });
//     if (!employee) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, employee.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { id: employee._id, email: employee.email },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );
//     employee.checkinStatus = true;
//     await employee.save();

//     res
//       .status(200)
//       .json({
//         message: "Login successful",
//         token,
//         organizationDetails: employee,
//         checkin : employee.checkinStatus
//       });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ error: "Login failed" });
//   }
// };


export const logout = async(req,res)=>{

  console.log("function triggered")
  const { email } = req.params;
  try {
    const employee = await EmployeModel.findOne({ email });
    if(!employee){
      res.status(500).send('logout employee not email found');
    }

    employee.checkinStatus = false;
    await employee.save();

    res
      .status(200)
      .json({
        message: "Logout successful"
      });
    
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "logout failed" });
    
  }
}



export const EmployeeloginFunc = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await EmployeModel.findOne({ email });
    if (!employee) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: employee._id, email: employee.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    employee.checkinStatus = true;
    employee.lastLoginAt = new Date();
    await employee.save();
    const loginTime = employee.lastLoginAt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  
    res.status(200).json({
      message: "Login successful",
      token,
      organizationDetails: employee,
      checkin: employee.checkinStatus,
      lastLoginTime: loginTime, 
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
};
