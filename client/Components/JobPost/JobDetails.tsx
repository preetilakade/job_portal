"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useGlobalContext } from "@/context/GlobalContext";
import ReactQuill from "react-quill-new";
import { Label } from "../ui/label";
import "react-quill-new/dist/quill.snow.css";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Select } from "../ui/select";
import { SelectTrigger } from "../ui/select";
import { SelectValue } from "../ui/select";
import { SelectContent } from "../ui/select";
import { SelectItem } from "../ui/select";


function MyEditor() {
    const {setJobDescription, jobDescription} = useGlobalContext();

    const MyEditor = dynamic(() => import("react-quill-new"), { ssr: false });


    return < ReactQuill value={jobDescription} onChange={setJobDescription}
    style={{
        minHeight: "400px",
        maxHeight: "900px",
    }}
    modules={{
        toolbar: true
    }}
    className="custom-quill-editor"
    />;
}
    


function JobDetails() {

    const{
        handleSalaryChange,
        salary,
        salaryType,
        setSalaryType,
        setNegotiable,
        negotiable,
    } = useGlobalContext();
    return (
        <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
            <div className="grid grid-cols-2 gap-6">
                <div className="flex-1">
                    <h3 className="text-black font-bold">Job Description</h3>
                    <Label htmlFor="jobDescription" className="text-gray-500 mt-2">
                        Provide a detailed description of the job.

                    </Label>
                </div>
                <div className="flex-1">
                    < MyEditor/>
                </div>
            </div>
            <Separator className="my-2" />
            <div className="relative grid grid-cols-2 gap-6">
                <div>
                    <h3 className="text-black font-bold">Salary</h3>
                    <Label htmlFor="salary" className="text-gray-500 mt-2">
                        Enter the salary range for the job.
                        </Label>
                </div>
                <div>
                    <Input
                     type="number"
                     id="salary"
                     placeholder="Enter salary"
                     
                     onChange={handleSalaryChange}
                     className="mt-2"
                    ></Input>
                    <div className="flex gap-2 mt-2 justify-between">
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
                            <Checkbox id="negotiable"></Checkbox>
                            <Label htmlFor="negotiable" className="text-gray-500">
                                Negotiable</Label>
                        </div>

                        <div className="flex gap-2 mt-2 justify-between">
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
                            <Checkbox 
                            id="hideSalary"
                            checked={negotiable}
                            onCheckedChange={setNegotiable}
                            ></Checkbox>
                            <Label htmlFor="hideSalary" className="text-gray-500">
                               Hide Salary</Label>
                        </div>
                        <div>
                            <Select onValueChange={setSalaryType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Type"  />
                                </SelectTrigger>
                                <SelectContent className="w=[120px] mt-2">
                                    <SelectItem value="Yearly">Yearly</SelectItem>
                                    <SelectItem value="Monthly">Monthly</SelectItem>
                                    <SelectItem value="Hour">Hour</SelectItem>
                                    <SelectItem value="Fixed">Fixed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default JobDetails;