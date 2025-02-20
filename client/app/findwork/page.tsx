"use client";
import React from "react";
import Header from "@/Components/Header";
import { useJobsContext } from "@/context/jobsContext";
import { useGlobalContext } from "@/context/GlobalContext";
import  {useState} from "react";
import SearchForm from "@/Components/SearchForm";
import Image from "next/image";
import { grip,table,list } from "@/utils/Icons"
//import { Divide } from "lucide-react";
import JobCard from "@/Components/JobItem/JobCard";
import { Job } from "@/types/types";
import Filters from "@/Components/Filters";


function Page() {

    const {jobs, filters} = useJobsContext();

    const [columns, setColumns] = React.useState(3);
 
    //cycle through 1,2,3 columns
    const toggleGridColumns = () => {
        setColumns((prev) => (prev === 3 ?2: prev === 2 ? 1:3))
    }
    
    const getIcon = () => {
        if(columns === 3) return grip;
        if(columns === 2) return table;
        return list;
    };

    const filteredJobs = filters.fullTime || filters.partTime || filters.contract || filters.internship
    ? jobs.filter((job: Job) =>{
        if(filters.fullTime && job.jobType.includes("Full Time"))
             return true;

        if(filters.partTime && job.jobType.includes("Part Time"))
             return true;

        if(filters.contract && job.jobType.includes("Contract"))
             return true;

        if(filters.internship && job.jobType.includes("Internship"))
             return true;

        if(filters.fullStack && job.tags.includes("Fullstack"))
            return true;

        if(filters.backend && job.tags.includes("Backend"))
            return true;

        if(filters.uIuX && job.tags.includes("UI/UX"))
            return true;

        if(filters.devOps && job.tags.includes("devOps"))
            return true;
    }) 
    : jobs;
    
    return <div>
        <Header />

        <div className="relative px-16 bg-[#D7DEDC] overflow-hidden">
            <h1 className="py-8 text-black font-bold text-3xl">
                Find your Next Job here
                </h1>

                <div className="pb-8 relative z-10">
                    <SearchForm />
                </div>

                <Image
                  src="/woman-on-ph.jpg"
                  alt="hero"
                  width={200}
                  height={500}
                  className="clip-path w-[15rem] absolute z-0 top-[0] right-[10rem] h-full object-cover "
                />
                <Image
                  src="/woman-on-ph.jpg"
                  alt="hero"
                  width={200}
                  height={500}
                  className="clip-path-2 rotate-6 w-[15rem] absolute z-0 top-[0] right-[32rem] h-full object-cover "
                />
        </div>

        <div className="w-[90%] mx-auto mb-14">
            <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-black py-8">Recent Jobs</h2>

            <button onClick={toggleGridColumns}
             className="flex items-center gap-4 border border-gray-400 px-8 py-2 rounded-full font-medium"
            > 
                <span>
                    {columns === 3 ? "Grid View" : columns === 2 ? "Table View" : "List View"}
                </span>
                <span className="text-lg">{getIcon()}</span>
            </button>
            </div>

            <div className="flex gap-8">
               <Filters />


                <div className={`self-start flex-1 grid gap-8 
                    ${columns === 3
                     ? "grid-cols-3" 
                    : columns === 2 
                    ? "grid-cols-2"  
                    : "grid-cols-1"}`}>
                    {jobs.length > 0 ? (

                        
                            filteredJobs.map((job: Job) =>(
                                <JobCard
                                  key={job._id}
                                  job={job}
                                />
                            ))
                        
                        
                    
                

                
                    ):( 
                    <div className="mt-1 flex items-center">
                        <p className="text-2xl text-gray-400 font-bold">
                        No Jobs Found
                        </p>
                        </div>)}
                </div>
            
            </div>
        </div>
    </div>
}


export default Page;