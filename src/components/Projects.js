import React, {useState} from 'react'
import { useProjectsValue , useSelectedProjectsValue} from '../context'
import IndividualProject from './IndividualProject';

const Projects = ({ activeValue = null }) => {
    const { projects } = useProjectsValue();
    const { setSelectedProject} = useSelectedProjectsValue();
    const [active, setActive] = useState(activeValue)
    return (
        <div>
            { projects && (projects.length == 0 ? <p>No projects</p> : projects.map(project => {
                return (
                    <li key={project.projectId} 
                    data-testid="project-action-parent"
                    className = {
                        active == project.projectId ? 'active sidebar__project' :'sidebar__project'
                    }
                    >
                    <div
                    role="button"
                    tabIndex = {0}
                    data-testid = "project-action"
                    aria-label= { `Selected ${project.name} as the task project `}
                    onClick = { () => { 
                        setActive(project.projectId);
                        setSelectedProject(project.projectId)
                    }}
                    onKeyDown = { (e) => {
                        if(e.key == 'Enter'){
                        setActive(project.projectId);
                        setSelectedProject(project.projectId);
                        }
                    }}
                    >

                    <IndividualProject project = {project} />

                    </div>
                    </li>
                )
            }) )} 
        </div>
    )
}

export default Projects
