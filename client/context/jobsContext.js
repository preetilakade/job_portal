"use client";
import React,{createContext, useContext,useState,useEffect} from "react";
import { useGlobalContext } from "./GlobalContext";
import axios from "axios";
import toast from "react-hot-toast";
import { get } from "http";



const JobsContext = createContext();

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL ? `${process.env.NEXT_PUBLIC_SERVER_URL}` : "http://localhost:8000"}`;
axios.defaults.withCredentials = true;


export const JobsContextProvider = ({children}) => {

    const {userProfile} = useGlobalContext();

    const [jobs,setJobs] = useState([]);
    const[loading,setLoading] = useState(false);
    const[userJobs,setUserJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        tags: "",
        location: "",
        title: "",
    });

    //filters

    const[filters , setFilters] = useState({ 
        fullTime: false,
        partTime: false,
        internship: false,
        contract: false,
        fullStack: false,
        backend: false,
        frontend: false,
        uIuX: false,
        devOps: false,
    });

    const [minSalary, setMinSalary] = useState(30000);
    const [maxSalary, setMaxSalary] = useState(120000);


const getJobs = async () => {
    setLoading(true);
    try{    
        const res = await axios.get("/api/v1/jobs");
        console.log(res.data);
        setJobs(res.data);
    }catch(error){
        console.log("error getting jobs",error);
    }finally{
        setLoading(false);
    }
};


const createJob = async (jobData) => {

    console.log("Sending job data:",jobData)

    try{
        const res = await axios.post("/api/v1/jobs",jobData);
        toast.success("Job created successfully");
        setJobs((prevJobs) => [res.data,...prevJobs]);

        //update userJobs
        if(userProfile._id){
            setUserJobs((prevUserJobs) => [res.data,...prevUserJobs]);
        }

    }catch(error){
        console.log("error creating job",error.response?.data || error.message);
    }

};


const getUserJobs = async (userId) => {
    setLoading(true);
    try{
        const res = await axios.get("/api/v1/jobs/user/"+userId);

        setUserJobs(res.data);
        setLoading(false);
    }catch(error){
        console.log("error getting user jobs",error);
    }finally{
        setLoading(false);
    }
};


const searchJobs = async (tags,location,title) => {
    setLoading(true);
    try{
        //build a query string
        const query = new URLSearchParams();

        if(tags) query.append("tags",tags);
        if(location) query.append("location",location);
        if(title) query.append("title",title);
        
        //send the request
        const res = await axios.get(`/api/v1/jobs/search?${query.toString()}`);

        //set jobs to response data
        setJobs(res.data);
        setLoading(false);


    }catch(error){
        console.log("error searching jobs",error);


    }finally{
        setLoading(false);
    }
};


//get job by id
const getJobById = async (id) => {
    setLoading(true);
    try{
        const res = await axios.get(`/api/v1/jobs/${id}`);
        setLoading(false);
        return res.data;

    }catch(error){
        console.log("error getting job by id",error);


    }finally{
        setLoading(false);
    }

};

//like a job
const likeJob = async (jobId) => {
    console.log("job id",jobId);
    try{
        const res = await axios.put(`/api/v1/jobs/like/${jobId}`);
        console.log("job likes", res);
        toast.success("Job liked successfully");
        getJobs();

    }catch(error){
        console.log("error liking job",error);
    }
    
};

//apply for a job
const applyJob = async (jobId) => {
    const job = jobs.find((job) => job._id === jobId);

    if(job && job.applicants.includes(userProfile._id)){
        toast.error("You have already applied for this job");
        return;
    }
    try{
        const res = await axios.put(`/api/v1/jobs/apply/${jobId}`);
        toast.success("Applied to job successfully");
        getJobs();

    }catch(error){
        console.log("error applying for job",error);
        toast.error(error.response.data.message);
    }
};


//delete a job
const deleteJob = async (jobId) => {
    try{
       await axios.delete(`/api/v1/jobs/${jobId}`);
       setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
       setUserJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        toast.success("Job deleted successfully");

    }catch(error){
        console.log("error deleting job",error);
    }
};


const handleSearchChange = (searchName, value) => {
    setSearchQuery((prev) => ({...prev, [searchName]: value}));
};

const handleFilterChange = (filterName) => {
    setFilters((prev) => ({...prev, [filterName]: !prev[filterName]}));
};


useEffect(() => {
   getJobs();
   // searchJobs("","","test data 11");
},[]);

//console.log(jobs);

useEffect(() => {
    if(userProfile._id){
        getUserJobs(userProfile._id);
    }
},[userProfile]);

//console.log("Search jobs",jobs);


    return(
        <JobsContext.Provider value={{
            jobs,
            loading,
            userJobs,
            createJob,
            searchJobs,
            getJobById,
            likeJob,
            applyJob,
            deleteJob,
            handleSearchChange,
            searchQuery,
            setSearchQuery,
            handleFilterChange,
            filters,
            minSalary,
            setMinSalary,
            maxSalary,
            setMaxSalary,
            setFilters,
        }}>
            {children}
        </JobsContext.Provider>
    );
};


export const useJobsContext = () => {
    return useContext(JobsContext);
}