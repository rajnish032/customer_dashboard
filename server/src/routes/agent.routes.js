import express from "express"
import verifyUserJwt from "../middlewares/verifyUserJwt.js";
import { addNewProject, deleteJob, deleteProj, getAllJob, getAllProj, getAllPublicProj, addNewJob, getAllPublicJob, } from "../controllers/agentproj.controllers.js";

import { hideDetails, updateAvatar, updateBio, userLogin } from "../controllers/user.controller.js";
import uploadAvatar from "../utils/multerForImg.js"
import multer from "multer";
import uploadImage from "../utils/multerForImg.js";
import uploadKmlKmz from "../utils/multerForKml.js"
const uploadLoc = multer({ dest: "uploads/" });
import { getUserById, getAgentById} from "../controllers/userDetail.controller.js";
//import { deleteUnavailability, getUnavailableUsers, getUserAvailability, markUnavailable } from "../controllers/unavailability.controller.js";

const router = express.Router();



const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: "File size cannot exceed 1MB" });
        }
    } else if (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
};

// login route
router.post("/login", userLogin);
router.get("/detail", verifyUserJwt, getUserById);
router.post("/public/detail", getAgentById);

//  surveying avatar update 
//router.put('/updateAvatar', verifyUserJwt, uploadAvatar.single('avatar'), multerErrorHandler, updateAvatar);


// Projects routes
router.get('/projects/all', verifyUserJwt, getAllProj)
router.get('/public/projects/all', getAllPublicProj)
router.delete('/project/delete/:projId', verifyUserJwt, deleteProj)
router.post('/project/new', verifyUserJwt,uploadKmlKmz.single("file"),addNewProject)

// Jobs routes
router.get('/jobs/all', verifyUserJwt, getAllJob);
router.get('/public/jobs/all', getAllPublicJob);

router.post("/postjob/new", verifyUserJwt, uploadImage.single("companyLogo"),multerErrorHandler, addNewJob);
router.delete('/job/delete/:jobId', verifyUserJwt, deleteJob);




export default router;