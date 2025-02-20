"use client";
import React from "react";
import { Button } from "./ui/button";
import { useJobsContext } from "@/context/jobsContext";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import formatMoney from "@/utils/formatMoney";


function Filters() {
    const {
        searchJobs,
        handleFilterChange,
        filters,
        setFilters,
        minSalary,
        maxSalary,
        setMinSalary,
        setMaxSalary,
        setSearchQuery,

    } = useJobsContext();


    const clearAllFilters = () => {
        setFilters({
            fullTime: false,
            partTime: false,
            contract: false,
            internship: false,  
            devOps: false,
            fullstack: false,
            backend: false,
            
            uIuX: false,
        });
        setSearchQuery({tags: "", location: "", title: "" });
        
    };

    const handleMinSalaryChange = (value:number[]) => {
        setMinSalary(value[0]);
        if(value[0] > maxSalary){
            setMaxSalary(value[0]);
        }
    };


    const handleMaxSalaryChange = (value: number[]) => {
        setMaxSalary(value[0]);
        if (value[0] < minSalary){
            setMinSalary(value[0]);
        }
    };



    return <div className="w-[22rem] pr-4 space-y-6">
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold mb-4">Job Type</h2>

                <Button
                 variant={"ghost"}
                 className="h-auto p-0 text-red-500 hover:text-red-700"
                 onClick={() => {
                    clearAllFilters();
                    searchJobs();
                 }}
                 >
                    Clear All
                 </Button>
            </div>
            <div className="space-y-4">
                <div className="flex items-center space-x-2 ">
                    <Checkbox
                      id="full-time"
                      checked={filters.fullTime}
                      onCheckedChange={() => handleFilterChange("fullTime")}

                    />
                    <Label htmlFor="full-time">Full Time</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                      id="contract"
                      checked={filters.contract}
                      onCheckedChange={() => handleFilterChange("contract")}

                    />
                    <Label htmlFor="full-time">Contract</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                      id="internship"
                      checked={filters.internship}
                      onCheckedChange={() => handleFilterChange("internship")}

                    />
                    <Label htmlFor="full-time">Internship</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                      id="partTime"
                      checked={filters.partTime}
                      onCheckedChange={() => handleFilterChange("partTime")}

                    />
                    <Label htmlFor="full-time">Part Time</Label>
                </div>
                
                
            </div>
        </div>

        <div>
            <h2 className="text-lg font-semibold mb-4">Tags</h2>
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fullStack"
                      checked={filters.fullStack}
                      onCheckedChange={() => handleFilterChange("fullStack")}
                    />
                    <Label htmlFor="fullStack">FullStack</Label>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                      id="backend"
                      checked={filters.backend}
                      onCheckedChange={() => handleFilterChange("backend")}
                    />
                    <Label htmlFor="fullStack">backend</Label>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                      id="devOps"
                      checked={filters.devOps}
                      onCheckedChange={() => handleFilterChange("devOps")}
                    />
                    <Label htmlFor="fullStack">devOps</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uIuX"
                      checked={filters.uIuX}
                      onCheckedChange={() => handleFilterChange("uIuX")}
                    />
                    <Label htmlFor="fullStack">uIuX</Label>
                </div>
                
                 </div>

           
        </div>


        <div>
            <h2 className="text-lg font-semibold mb-4">Salary Range</h2>
            <div className="flex flex-col gap-4">
                <Label htmlFor="minSalary">Minimum Salary</Label>
                <Slider
                  id="minSalary"
                  min={0}
                  max={200000}
                  step={50}
                  value={[minSalary]}
                  onValueChange={handleMinSalaryChange}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">
                    {formatMoney(minSalary ,"INR")} 
                </span>
            </div>
        </div>
        <div>
            
            <div className="flex flex-col gap-4">
                <Label htmlFor="maxSalary">Maximum Salary</Label>
                <Slider
                  id="maxSalary"
                  min={0}
                  max={200000}
                  step={50}
                  value={[maxSalary]}
                  onValueChange={handleMaxSalaryChange}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">
                    {formatMoney(maxSalary ,"INR")} 
                </span>
            </div>
        </div>
    </div>
}

export default Filters;