import express from "express";
import { createJob,getJobs, getJobsByUser,searchJobs,applyJob,likeJob,getJobById, deleteJob} from "../controllers/jobController.js";
import protect from "../middleware/protect.js";


const router = express.Router();


//creating a job
router.post("/jobs",protect, createJob);
router.get("/jobs", getJobs);
router.get("/jobs/user/:id",protect, getJobsByUser);


//searchJobs
router.get("/jobs/search",searchJobs);
 
//apply for jobs
router.put("/jobs/apply/:id",protect, applyJob);


//like and unlike job
router.put("/jobs/like/:id",protect, likeJob);

//get job by Id
router.get("/jobs/:id",protect, getJobById); 


//delete a job
router.delete("/jobs/:id",protect, deleteJob);


export default router;  