import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function DbConnect() {
    try {
        await mongoose.connect('mongodb+srv://dhanushk22cse:ndkN86YpOgIuWAq8@cluster0.nygo8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Database Connection Error:', error);
    }
}

DbConnect();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });


app.use('/tango', router);  
app.post("/api/organizations", upload.single("logo"), async (req, res) => {
    try {
        const { companyName, website, organizationType, contactNumber, contactEmail, primaryAddress } = req.body;
        const logoPath = req.file ? `/uploads/${req.file.filename}` : "";

       
        res.status(201).json({
            message: "Organization details saved successfully",
            logoUrl: logoPath  
        });
    } catch (error) {
        console.error("Error saving organization details:", error);
        res.status(500).json({ message: "Failed to save organization details" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
