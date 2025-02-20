import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import { auth } from "express-openid-connect";




export const createJob = asyncHandler(async (req, res) => {
    try {
       // console.log("req.oidc.user:", req.oidc.user);
        const user = await User.findOne({ auth0Id: req.oidc.user.sub });

        console.log("User", req.body.title);

       
        const isAuth = req.oidc.isAuthenticated() || user.email;

        if (!isAuth) {
            res.status(401).json({
                message: "unauthorized",
            });
        }
        
        

        const { title, description, location, salary, jobType, tags, skills, salaryType, negotiable} = req.body;

       if(!title){
        return res.status(400).json({
            message: "title is required",
        })
       }

       if(!description){
        return res.status(400).json({
            message: "description is required",
        })
       }

       if(!location){
        return res.status(400).json({
            message: "location is required",
        })
       }

    if(!salary){
        return res.status(400).json({
            message: "salary is required",
        })
       }

       if(!jobType){
        return res.status(400).json({
            message: "job type is required",
        })
       }    

       if(!tags){
        return res.status(400).json({
            message: "tags are required",
        })
       }

       if(!skills){ 
        return res.status(400).json({       
            message: "skills are required",  
        })
       }

      if(!salaryType ){
       return res.status(400).json({
           message: "salary type is required",
       })
       }

       if(! negotiable){
        return res.status(400).json({
           message: "negotiable is required",
        })
       }
       


        const job = new Job({
            title,
            description,
            location,
            salary,
            jobType,
            tags,
            skills,
            salaryType,
            negotiable,
            createdBy: user._id,
        });
        await job.save();

        return res.status(201).json(job);

    }catch (error) {

      console.log("error creating job",error); 
      res.status(500).json({
        message: "server error",   
        
      }) ;
    }
}); 
//done



//get Jobs
export const getJobs = asyncHandler(async (req, res) => {

    try{
        const jobs = await Job.find({}).populate("createdBy","name  profilePicture").sort({createdAt:-1});//sort by latest job
        
        console.log("Jobs:",jobs);
        return res.status(200).json(jobs);

    }catch(error){
        console.log("error getting jobs",error);
        return res.status(500).json({
            message: "server error",
        })
    }


});
//done


//get jobs by users
export const getJobsByUser = asyncHandler(async (req, res) => {
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({message:"user not found"});

        }

        const jobs = await Job.find({createdBy: user._id}).populate(
            "createdBy",
            "name profilePicture"

        );

        return res.status(200).json(jobs);

    }catch(error){
        console.log("error in getJobsByUser:", error);
        return res.status(500).json({
            message: "Server Error",
        });

    }
});
//done



//search Jobs

export const searchJobs = asyncHandler(async (req, res) => {
    try{

        const {tags, location,title} = req.query;

        let query = {};

        if(tags){
            query.tags = {$in: tags.split(",")};
        }

        if(location){
            query.location = {$regex: location, $options: "i"};
        }
        if(title){
            query.title = {$regex: title, $options: "i"};
        }
        const jobs = await Job.find(query).populate("createdBy","name profilePicture").sort({createdAt:-1});//sort by latest job
        return res.status(200).json(jobs);


    }catch(error){
        console.log("error in searchJobs:", error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
//done


//apply for job
export const applyJob = asyncHandler(async (req, res) => {
    try{
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({message:"job not found"});
        }

        const user = await User.findOne({auth0Id: req.oidc.user.sub});
        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        if(job.applicants.includes(user._id)){
            return res.status(400).json({message:"you have already applied for this job"});
        }

        job.applicants.push(user._id);
        await job.save();
        //check if user has already applied for this job
       
        return res.status(200).json(job);
    }catch(error){
        console.log("error in applyJob:", error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
//done



//like and unlike job
export const likeJob = asyncHandler(async (req, res) => {
        try{
            console.log("OIDC User:", req.oidc.user);
            const job = await Job.findById(req.params.id);
            if(!job){
                return res.status(404).json({message:"job not found"});
            }

            const user = await User.findOne({auth0Id: req.oidc.user.sub});
            if(!user){
                return res.status(404).json({message:"user not found"});
            }

            const isLiked = job.likes.includes(user._id);

            if(isLiked){
                job.likes = job.likes.filter((like) => !like.equals(user._id));
            }else{
                job.likes.push(user._id);
            }
            await job.save();
        

            return res.status(200).json(job);

        }catch(error){
            console.log("error in likeJob:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
});
//done


//get job by id
export const getJobById = asyncHandler(async (req, res) => {
    try{

        const{id} = req.params;
        const job = await Job.findById(id).populate("createdBy","name profilePicture");
        if(!job){
            return res.status(404).json({message:"job not found"});
        }
        return res.status(200).json(job);
    }catch(error){
        console.log("error in getJobById:", error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
//done

//delete a job
export const deleteJob = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params;
        const job = await Job.findById(id);
        const user = await User.findOne({auth0Id: req.oidc.user.sub});

        if(!job){
            return res.status(404).json({message:"job not found"});
        }
        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        await job.deleteOne({
            createdBy: user._id,
            _id: id,
        });
        return res.status(200).json({
            message: "job deleted successfully",
        });


    }catch(error){
        console.log("error in deleteJob:", error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
//done