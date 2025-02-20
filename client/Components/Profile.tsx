"use client";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuRadioGroup,
    
   

  } from "@/Components/ui/dropdown-menu";
  import{Settings,LogOut} from "lucide-react";
  import { Button } from "./ui/button";
  import Image from "next/image";
  import {useRouter} from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import {Badge} from "./ui/badge";



function Profile() {

    const { userProfile } = useGlobalContext();

    const {profilePicture, name, profession,email} = userProfile;

    const router = useRouter();

    return (

        <DropdownMenu>
            <div className="flex items-center gap-4">
                <Badge>{profession}</Badge>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Image 
          src={profilePicture ? profilePicture : "/user.png"}
          alt="avatar" 
          width={27} 
          height={27}
           className="rounded-lg">

           </Image>
        </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent className="w-56" align="end">

            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">

                    <p className="text-sm font-medium leading-none">{name}

                    </p>

                    <p className="text-xs leading-none text-muted-foreground">

                       {email}
                    </p>

                </div>

            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuSeparator />

            <DropdownMenuItem >
                <Settings className="mr-2 h-4 w-4" />

                <span>Settings</span>

            </DropdownMenuItem>



        



        <DropdownMenuItem className="cursor-pointer"
        onClick={()=>{
            router.push("http://localhost:8000/logout");

        }}
        >
                <LogOut className="mr-2 h-4 w-4" />

                <span>Logout</span>

            </DropdownMenuItem>



        </DropdownMenuContent>
        </DropdownMenu>

       
          
        
    );
}

export default Profile;