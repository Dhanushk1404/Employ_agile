import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  logo: { type: String, required: true },
  companyName: { type: String, required: true },
  website: { type: String },
  organizationType: { type: String },
  contactNumber: { type: String, required: true },
  contactEmail: { type: String, required: true },
  primaryAddress: { type: String, required: true },
  password: { type: String, required: true },
});


const locationSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  mailAlias: { type: String, required: true },
  description: { type: String },
  address: { type: String },
  country: { type: String },
  state: { type: String },
});


const mainSchema = new mongoose.Schema({
  organization: {
    type: organizationSchema,
    required: true
  },
  location: {
    type: locationSchema,
    required: true
  },
  departments: {
    type: [String],
    required: true
  } 
});

const CompanyDetailModel = mongoose.model('ComapanyDetails', mainSchema);

export default CompanyDetailModel;
