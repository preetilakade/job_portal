"use client";
import exp from "constants";
import React from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Search } from "lucide-react";
import {LocateIcon} from "lucide-react";
import { location } from "@/utils/Icons";


function SearchForm() {

    const{searchJobs, handleSearchChange, searchQuery} = useJobsContext();
    return (<form className="relative flex items-center"
    onSubmit={(e) => {
        e.preventDefault();
        searchJobs(searchQuery.tags, searchQuery.location, searchQuery.title);
    }}
    >
        <div className="flex-1 relative">
            <input 
            type="text" 
            id="job-title"
            name="title"
            value={searchQuery.title}
            onChange={(e) => handleSearchChange("title", e.target.value)}
            placeholder="Job title or Keywords"
            className="w-full h-4 py-7 text-2xl  text-black pl-[5rem] rounded-tl-full rounded-bl-full"
            
            />

            <span>
                <Search 
                size={30}
                className=" text-gray-400 text-2xl absolute top-[20%] left-8  translate-y-[50%]" />
            </span> 
           
        </div>

        <div className="absolute top-1/2 left-[48%] transform -translate-x-1/2 translate-y-1/2 w-[2px] h-11 bg-gray-300">  </div>
        
        <div className="flex-1 relative">
            <input 
            type="text" 
            id="location"
            name="location"
            value={searchQuery.location}
            onChange={(e) => handleSearchChange("location", e.target.value)}
            placeholder="Enter Location"
            className="w-full h-4 py-7 text-2xl  text-black pl-[4rem] rounded-tr-full rounded-br-full"
            
            />

            <span
            
                className=" text-gray-400 text-2xl absolute top-[50%] left-6  translate-y-[-50%]" >
                {location}
                

            </span> 
           
        </div>

        <button
         type="submit"
         className="bg-[#7263F3] hover:bg-[#7263F3]/90 text-white text-2xl px-14 py-2 rounded-full absolute right-2 top-[50%] transform translate-y-[-50%] h[calc(100%-1rem)]"
         >
            Search
            </button>
        
    
    </form>
)};


export default SearchForm;