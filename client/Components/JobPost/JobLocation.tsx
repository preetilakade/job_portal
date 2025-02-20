"use client";
import React, { use } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function JobLocation() {

    const {setLocation,  location} = useGlobalContext();

    const handleLocationChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        const{name,value} = e.target;

        setLocation((prev: {}) => ({...prev, [name]: value}));
    };

    return <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
       <h3 className="text-lg font-semibold">Job Location</h3>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
            <Label
            htmlFor="country"
            className="text-sm text-muted-foreground"
            >

                Country
            </Label>
            <Input
            type="text"
            id="country"
            name="country"
            value={location.country}
            onChange={handleLocationChange}
            className="flex-1 w-full mt-2"
            placeholder="Enter Country"
            ></Input>
        </div>



        <div className="flex-1">
            <Label
            htmlFor="city"
            className="text-sm text-muted-foreground"
            >

                City
            </Label>
            <Input
            type="text"
            id="city"
            name="city"
            value={location.city}
            onChange={handleLocationChange}
            className="flex-1 w-full mt-2"
            placeholder="Enter City"
            ></Input>
        </div>

        <div className="flex-1">
            <Label
            htmlFor="address"
            className="text-sm text-muted-foreground"
            >

                Address
            </Label>
            <Input
            type="text"
            id="address"
            name="address"
            value={location.address}
            onChange={handleLocationChange}
            className="flex-1 w-full mt-2"
            placeholder="Enter Address"
            ></Input>
        </div>




        


       </div>
        </div>;
}

export default JobLocation;