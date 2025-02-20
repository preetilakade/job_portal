"use client";

import React from "react";
import { GlobalProvider} from "@/context/GlobalContext";
import { JobsContextProvider } from "@/context/jobsContext";

interface Props {
    children: React.ReactNode;
}

function ContextProvider({ children }: Props) { // Destructure `children` from props
    return (
        <GlobalProvider>
        <JobsContextProvider> {children} </JobsContextProvider> 
        </GlobalProvider>
    );
}

export default ContextProvider;
