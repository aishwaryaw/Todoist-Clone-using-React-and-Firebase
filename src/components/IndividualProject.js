import React, { useState } from 'react'
import { useProjectsValue, useSelectedProjectsValue } from '../context'
import { FaTrashAlt } from 'react-icons/fa';
import {firebase} from '../firebase';

const IndividualProject = ({project}) => {
    const { projects, setProjects } = useProjectsValue();
    const { setSelectedProject }  = useSelectedProjectsValue();
    const [showConfirm , setShowConfirm] = useState(false);

    const deleteProject = (docId) => {
        firebase.firestore().collection('projects').doc(docId).delete().then(() =>{
            setProjects([...projects]);
            setSelectedProject('INBOX');
        });
    }

    return (
        <>
           <span className="sidebar__dot">•</span> 
            <span className="sidebar__project-name">{ project.name }</span>
            <span 
            className="sidebar__project-delete"
            data-testid="delete-project"
            onClick = { () =>  setShowConfirm(!showConfirm) } 
            onKeyDown = { (e) => {
                if(e.key == 'Enter'){
                    setShowConfirm(!showConfirm);
                }
            } }
            role= "button"
            tabIndex = {0}
            aria-label="Confirm deletion of project"
            >
                <FaTrashAlt />

            { showConfirm && (
                <div className="project-delete-modal">
                    <div className="project-delete-modal__inner">
                        <p>Are u sure u want to delete this project ?</p>
                        <button type = "button"
                        onClick = { () => deleteProject(project.docId)}
                        >
                            Delete
                        </button>
                        <span 
                        onKeyDown={ (e) =>{  
                            if(e.key == 'Enter'){
                            setShowConfirm(!showConfirm);
                        }
                        }}
                        onClick = { () => setShowConfirm(!showConfirm)}
                        role="button"
                        tabIndex = {0}
                        aria-label="Cancel adding project, do not delete"
                        >
                            Cancel
                        </span>
                    </div>
                </div>
            ) }
            </span>
        </>
    );
};

export default IndividualProject
