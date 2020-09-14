import React, { useState, createContext, useContext } from 'react'

const selectedProjectContext = createContext();
const SelectedProjectsProvider = ({children}) => {
    const [selectedProject, setSelectedProject] = useState('INBOX');

    return (
        <selectedProjectContext.Provider value={{ selectedProject , setSelectedProject }}>
            {children}
        </selectedProjectContext.Provider>
       
    )
}

const useSelectedProjectsValue = () => useContext(selectedProjectContext);
export{
    selectedProjectContext,
    SelectedProjectsProvider,
    useSelectedProjectsValue
} 
