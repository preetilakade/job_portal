"use client";
import React from "react";
import Header from "@/Components/Header";
import JobForm from "@/Components/JobPost/JobForm";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";

function page() {

    const {isAuthenticated, loading} = useGlobalContext();
    const router = useRouter();


    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push(`${process.env.NEXT_PUBLIC_SERVER_URL ? `${process.env.NEXT_PUBLIC_SERVER_URL}/login` : "https://jobfindr-b3evdud4ergme6ak.canadacentral-01.azurewebsites.net/login"}`);
        }
    }, [isAuthenticated, loading, router]);


    return (
        <div className="flex flex-col">
            <Header />

            <h2 className="flex-1 mx-auto text-3xl font-bold text-black">
                Create a Job Post</h2>

                <div className="flex-1 pt-8 mx-auto w-[90%] flex justify-center items-center ">
                    <JobForm />
                </div>
        </div>
    );
}


export default page;