
import React, {createContext,  useContext, useEffect, useState} from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";


 const GlobalContext = createContext();

 axios.defaults.baseURL = "http://localhost:8000";
 axios.defaults.withCredentials = true;


 export const GlobalProvider = ({children}) => {

   // const router = useRouter();

    const[isAuthenticated, setIsAuthenticated] = useState(false);
    const[auth0User, setAuth0User] = useState(null);
    const[userProfile, setUserProfile] = useState({});
    const[loading, setLoading] = useState(false);


    //input state
   


    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [salary, setSalary] = useState(0);
    const [activeEmploymentTypes, setActiveEmploymentTypes] = useState([]);
    const [salaryType, setSalaryType] = useState("year");
    const [negotiable, setNegotiable] = useState(false);
    const [tags, setTags] = useState([]);
    const [skills, setSkills] = useState([]);
    const [location, setLocation] = useState({
        country: "",
        city: "",
        address: "",
    });


    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/v1/check-auth");
                console.log(res.data);
                setIsAuthenticated(res.data.isAuthenticated);
                setAuth0User(res.data.user);
                setLoading(false);
            }catch(error){
                console.log("error checking auth",error);
            }finally{
                setLoading(false);
            }
        };
        checkAuth();

       
    }, []);


    const getUserProfile = async (id) => {
        try{

            const res = await axios.get(`/api/v1/user/${id}`);

            //console.log("User profile",res.data);
            setUserProfile(res.data);

        }catch(error){
            console.log("error getting user profile",error);

        }
    };



    //handle input change
    const handleInputChange = (e) => {
        setJobTitle(e.target.value.trimStart());
    };

    const handleJobDescriptionChange = (e) => {
        setJobDescription(e.target.value.trimStart());
    };

    const handleSalaryChange = (e) => {
        setSalary(e.target.value);
    };


    /*const handleTitleChange = (e) => {
        setJobTitle(e.target.value);
    };*/

    const handleTitleChange = (e) => {
        setJobTitle(e.target.value.trimStart());
    };



    
    
    

    

    useEffect(() => {

      if(isAuthenticated && auth0User){
          
      
        getUserProfile(auth0User.sub);
      }
    },[isAuthenticated, auth0User]);
    

    return (
        <GlobalContext.Provider value={ {
            isAuthenticated,
            auth0User,

            userProfile,
            getUserProfile,
            loading,
            
            jobTitle,
            jobDescription,
            salary,
            activeEmploymentTypes,
            salaryType,
            negotiable,
            tags,
            skills,
            location,
            handleInputChange,
            handleJobDescriptionChange,
            handleSalaryChange,
            setActiveEmploymentTypes,
            setJobDescription,
            setSalaryType,
            setNegotiable,
            tags,
            setTags,
            skills,
            setSkills,
            setLocation,


           handleInputChange, 
           handleTitleChange,

           
           
            
            



            
            
        }}>
            {children}
        </GlobalContext.Provider>
    );
 };


 export const useGlobalContext = () => {

    return useContext(GlobalContext);
 };