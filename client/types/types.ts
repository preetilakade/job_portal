interface Job{
    _id: string;
    title: string;
    location: string;
    description: string;
    salary: number;
    salaryType: "yearly"|"monthly"|"weekly"|"hourly";
    negotiable: boolean;
    jobType: string[];
    tags: string[];
    likes: string[];
    skills: string[];
    applicants: string[];
    createdBy:{
        profilePicture: string;
        name: string;

    };
    createdAt: string;
    updatedAt: string;
}

export type {Job};