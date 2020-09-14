import React, { createContext, useState, useContext } from 'react'
import { useProjects } from '../hooks';


const ProjectsContext = createContext();
const ProjectsProvider = ({children}) => {
    const {projects, setProjects } = useProjects();

    return (
        <ProjectsContext.Provider value = {{ projects, setProjects}} >
            {children}
        </ProjectsContext.Provider>
    );
    
};

const useProjectsValue =() => useContext(ProjectsContext);

export{
    ProjectsContext,
    ProjectsProvider,
    useProjectsValue
} 
