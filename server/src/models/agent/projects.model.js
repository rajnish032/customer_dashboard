import mongoose, { Schema } from "mongoose";
		
const agentProject = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
	title:{
		type: String,
		required: true,
	},
    location:{
        type: String,
		required: true,
    },
    // tag:{
    //     type: String,
	// 	 required: true,
    // },
    startDate:{
        type: Date,
		required: true,
    },
    type:{
        type: String,
		required: true,
    },
    objective:{
        type: String,
		required: true,
    },
    industry:{
        type: String,
		required: true,
    },
    application:{
        type: String,
		required: true,
    },
    tools:{
        type: String,
		required: true,
    },
    scope:{
        type: String,
		required: true,
    },
    rangeCovered:{
        type: Number,
		required: true,
    },
    endDate:{
        type: Date,
		required: true,
    },
    fileUrl:{
        type:String
    },

    budget:{
        type: Number,
        required: true,
        
    },
    // timeline:{
    //     type: String,
    //     required: true,

    // },
    // status:{
    //     type:String,
    //     enum:['ongoing','completed'],
	// 	required: true,
    // },

    status: {
        type: String,
        enum: ['approved', 'rejected', 'pending', "review"],
        default: 'pending',
    },
    
   

},{timestamps:true})

export const AgentProject = mongoose.model('AgentProject',agentProject);