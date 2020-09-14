import React, {useState} from 'react'
import { useProjectsValue, useAuthValue } from '../context'
import { generatePushId } from '../helpers';
import { firebase } from '../firebase';

const AddProject = ({shouldShow = false}) => {
    const { projects, setProjects } = useProjectsValue();
    const [showconfirm, setShowConfirm] = useState(shouldShow);
    const [projectName, setProjectName] = useState('');
    const projectId = generatePushId();
    const {auth} = useAuthValue();

    const addProject = () => {
        // console.log(projectName);
        // console.log(projectId);
        firebase.firestore().collection('projects').add({
            projectId: projectId,
            name : projectName,
            userId : auth
        }).then(()=>{
            setProjects([...projects]);
            setShowConfirm(!showconfirm);
            setProjectName('');
        });
    }
    return (
       
        <div className="add-project" data-testid="add-project">

            {showconfirm && 
            (
                <div className="add-project__input" data-testid="add-project-inner">
                    <input 
                    value={projectName} 
                    onChange={(e)=> setProjectName(e.target.value)}
                    className="add-project__name"
                    data-testid="project-name"
                    type="text"
                    placeholder="Name your project"
                    />
                    <button type="button" 
                    className ="add-project__submit"
                    onClick={addProject}
                    data-testid="add-project-submit"
                    >
                        Add Project
                    </button>
                    <span 
                    aria-label="Cancel adding project"
                    data-testid="hide-project-overlay"
                    className="add-project__cancel"
                    onClick={()=> setShowConfirm(!showconfirm)}
                    onKeyDown={(e)=> {
                        if(e.key == 'Enter'){
                        setShowConfirm(!showconfirm)
                    }}}
                    role="button"
                    tabIndex={0}
                    >
                        Cancel
                    </span>

                    </div>
                )}
          <span className="add-project__plus">+</span>
          <span
            aria-label="Add Project"
            data-testid="add-project-action"
            className="add-project__text"
            onClick={() => setShowConfirm(!showconfirm)}
            onKeyDown={(e) => {
            if (e.key === 'Enter') setShowConfirm(!showconfirm);
            }}
            role="button"
            tabIndex={0}
          >
            Add Project
            </span>
    
        </div>
        
    )
}

export default AddProject
