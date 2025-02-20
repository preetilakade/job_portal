"use client";
import React from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Separator } from "@/Components/ui/separator";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import { useEffect } from "react";

interface EmploymentTypeProps {
    "Full Time" : string;
    "Part Time" : string;
    Contract : boolean;
    Internship : boolean;
    Temporary : boolean;
}

function JobTitle() {

    

    const{
        jobTitle,
        handleTitleChange,
        activeEmploymentTypes,
        setActiveEmploymentTypes,
        handleInputChange,
        
            
        
    } = useGlobalContext();

    const [employmentTypes, setEmploymentTypes] = 
    React.useState<EmploymentTypeProps>({
        "Full Time" : "",
        "Part Time" : "",
        Contract : false,
        Internship : false,
        Temporary : false,
    });


    

    const handleEmploymentTypeChange = 
    (type: keyof EmploymentTypeProps) => {
        setEmploymentTypes((prev)=> ({...prev, [type]: !prev[type]}));
    };


    useEffect(() => {
        const selectedTypes = Object.keys(employmentTypes).filter((type)=>{
            return employmentTypes[type as keyof EmploymentTypeProps];
        });

        setActiveEmploymentTypes(selectedTypes);
            
        
    }, [employmentTypes]);

    
    return <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex-1">
                <h3 className="text-lg font-semibold">Job Title</h3>
                <Label 
                  htmlFor="jobTitle"
                  className="text-sm text-muted-foreground mt-2"
                >
                    A job title is a specific designation of a post in an organization.
                </Label>
   
            </div>

            <Input
            type="text"
            id="jobTitle"
            
            onChange={handleTitleChange}
            className="flex-1 w-full mt-2"
            placeholder="Enter job title"
            ></Input>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex-1">
                <h3 className="text-lg font-semibold">Employment Type</h3>
                <Label
                htmlFor="employmentType"
                className="text-sm text-muted-foreground mt-2"
                >
                    Select Type

                </Label>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                {Object.entries(employmentTypes).map(([type, checked]) => (
                    <div
                     key={type}
                     className="flex items-center space-x-2 border border-input rounded-md p-2"
                     >
                        <Checkbox 
                        id={type}
                        checked={checked}
                        onCheckedChange={()=>{
                            handleEmploymentTypeChange(type as keyof EmploymentTypeProps)
                        }}
                        />
                        <Label htmlFor={type} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {type}
                            </Label>
                     </div>

                ))}
                    
                
            </div>
        </div>
        </div>;
}

export default JobTitle;