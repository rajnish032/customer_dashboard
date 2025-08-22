import mongoose, { Schema } from "mongoose";
        
const agentPostJob = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    
    title:{
        type: String,
        required: true,
    },
    subtitle:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    companyname:{
        type: String,
        required: true,
    },
    companyLogo:{
        type: String,
        //required: true,
    },

    jobtype:{
        type: String,
        required: true,
    },
    salary:{
        type: String,
        required: true,
    },
    industrytype:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    jobsummary:{
        type: String,
        required: true,
    },

},{timestamps:true})

export const AgentPostJob = mongoose.model('AgentPostJob',agentPostJob);