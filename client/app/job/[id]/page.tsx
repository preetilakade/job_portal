"use client";
import React from "react";
import Header from "@/Components/Header";
import JobCard from "@/Components/JobItem/JobCard";
import {useParams} from "next/navigation";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import Image from "next/image";
import { profile } from "console";
import { Bookmark } from "lucide-react";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import formatMoney from "@/utils/formatMoney";
import { formatDates } from "@/utils/formatDates";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Footer from "@/Components/Footer";
import {bookmark} from "@/utils/Icons";
import {bookmarkEmpty} from "@/utils/Icons";

function page() {
    const {jobs, likeJob, applyJob} = useJobsContext();
    const {userProfile, isAuthenticated} = useGlobalContext();

    const params = useParams<{id: string}>();
    const router = useRouter();
    const {id} = params;

    const [isLiked, setIsLiked] = React.useState(false);
    const [isApplied, setIsApplied] = React.useState(false);

    
    

    const job = jobs.find((job: Job) => job._id.toString() === id);
    console.log(jobs);
    console.log(id);
    console.log(jobs.length);


    const otherJobs = jobs.filter((job: Job) => job._id.toString() !== id);

   

    useEffect(() => {
        if(job){
            setIsApplied(job.applicants.includes(userProfile._id));
        }
    },[job, userProfile._id]);


    useEffect(() =>{
        if(job){
            setIsLiked(job.likes.includes(userProfile._id));
        }
    }, [job, userProfile._id]);


   


    


    
    





    if (!job) {
        return <p>Loading jobs... Please wait.</p>;
    }
    if (job.length === 0) {
        return <p>No jobs found.</p>;
    }
    

    const{
        title,
        location,
        description,
        salary,
        createdBy,
        applicants,
        jobType,
        createdAt,
        salaryType,
        negotiable,
    } = job;

    

    

    const {name, profilePicture} = createdBy;

    const handleLike = (id: string) =>{
        setIsLiked((prev) => !prev);
        likeJob(id);
    };

   
    return (<div>
        <Header />

        <div className="p-8 mb-8 mx-auto w-[80%] rounded-md flex gap-8">
            <div className="w-[45%] flex flex-col gap-8">
               <JobCard activeJob job={job} />

               {otherJobs.map((job: Job) => (
                <JobCard key={job._id} job={job} />))}
            </div>

            <div className="flex-1  bg-white p-6 rounded-md">
                <div className="flex  flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 relative  overflow-hidden rounded-md flex items-center justify-center bg-gray-200">
                        <Image
                        src={profilePicture || "/user.png"}
                        alt={name || "User"}
                        width={45}
                        height={45}
                        className="rounded-md"
                        ></Image>
                        </div>

                        <div>
                            <p className="font-bold">{name}</p>
                            <p className="text-sm">Recruiter</p>
                        </div>
                        
                    </div>
                    <button className={`text-2xl ${
                            isLiked ? "text-[#7263f3]" : "text-gray-400"
                          }`}
                          onClick ={() =>{
                           isAuthenticated 
                            ? handleLike(job._id)
                            : router.push("http://localhost:8000/login");}}
                          >
                            {isLiked ? bookmark : bookmarkEmpty }
                        </button>
                </div>

                <h1 className="text-2xl font-semibold">{title}</h1>
                <div className="flex gap-4 items-center">
                    <p className="text-gary-500">{location}</p>
                </div>

                <div className="mt-2 flex-1 gap-4 flex justify-between items-center">
                    <p className=" flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-green-500/20 rounded-xl">
                      <span className="text-sm">Salary</span>

                      
                        <span>
                            
                            <span className="font-bold">
                                {formatMoney(salary,"INR")}
                            </span>
                            <span className="font-medium text-gray-500 text-lg">
                                /
                                {salaryType
                                 ?`${
                                    salaryType === "yearly"
                                    ? "pa"
                                    : salaryType === "monthly"
                                    ? "pcm"
                                    :salaryType === "weekly"
                                    ? "pw"
                                    : "ph"
                                 }`
                                 : ""}
                            </span>
                            
                        </span>
                      
                    </p>

                    <p className=" flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-purple-500/20 rounded-xl">
                      <span className="  text-sm">Posted</span>
                      <span className="font-bold">{formatDates(createdAt)}</span>
                    </p>

                    <p className=" flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-blue-500/20 rounded-xl">
                      <span className="text-sm ">Applicants</span>
                      <span className="font-bold">{applicants.length}</span>
                    </p>

                    <p className=" flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-yellow-500/20 rounded-xl">
                      <span className="text-sm ">Job Type</span>
                      <span className="font-bold">{jobType[0]}</span>
                    </p>
                </div>

                <h2 className="font-bold text-2xl mt-2">Job Description</h2>
                </div>

                <div className="wysiwyg mt-2" dangerouslySetInnerHTML={{__html: description}}></div>

               
            </div>

            <div className="w-[26%] flex flex-col gap-8">
            <button className={`text-white py-4 rounded-full hover:bg-[#7263f3]/90
              hover:text-white 
              ${isApplied ? "bg-green-500" : "bg-[#7263f3]"}
              
              `} 
               onClick={() =>{
                if(isAuthenticated){
                    if(!isApplied){
                    applyJob(job._id)
                    setIsApplied(true)
               } else{
                    toast.error("You have already applied for this job");
               }
            }else{
                    router.push("http://localhost:8000/login");
                }
               }}
              >
                {isApplied ? "Applied" : "Apply Now"}
            </button>

            <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
                <h3 className="text-lg font-semibold">Other Information</h3>

                <div className="flex flex-col gap-2">
                    <p >
                        <span className="font-bold">Posted:</span>
                        {formatDates(createdAt)}
                    </p>
                    <p>
                        <span className="font-bold">Salary negotiable: </span>
                        <span className={` ${negotiable ? "text-green-500" : "text-red-500"}`}>{negotiable ? "Yes" : "No"}</span>
                    </p>

                    <p>
                        <span className="font-bold">Location:</span>{location}
                    </p>

                    <p>
                        <span className="font-bold">Job Type:</span>{jobType[0]}
                    </p>
                </div>
            </div>

            <div className="p-6 flex flex-col gap-2 bg-white rounded-md"> 
                <h3 className="text-lg font-semibold">Tags</h3>
                <p>Other relevant tags for the job position</p>

                <div className="flex flex-wrap gap-4">
                    {job.tags.map((tag: string, index: number) => (
                        <span
                         key={index}
                         className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-red-500/20 text-red-600"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="p-6 flex flex-col gap-2 bg-white rounded-md"> 
                <h3 className="text-lg font-semibold">Skills</h3>
                <p>This is a full time position. The successful candidate will be responsible for the following:</p>

                <div className="flex flex-wrap gap-4">
                    {job.skills.map((skills: string, index: number) => (
                        <span
                         key={index}
                         className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-indigo-500/20 text-[#7263f3]"
                        >
                            {skills}
                        </span>
                    ))}
                </div>
            </div>
        </div>
        </div>

        <Footer />

       
        
    </div>
)}

export default page;

//6:1