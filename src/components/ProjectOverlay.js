import React from 'react'
import { useProjectsValue } from '../context'

const ProjectOverlay = ({ project, setProject, showProjectOerlay, setShowProjectOverlay}) => {
    const { projects } = useProjectsValue();
    return (
     
            projects && showProjectOerlay && (
                <div className="project-overlay" data-testid="project-overlay">
                    <ul className="project-overlay__list">
                        { projects.map(proj => {
                            return (
                                <li key={proj.projectId}>
                                    <div 
                                    className = { project === proj.projectId ? 'selected' : undefined }
                                    data-testid="project-overlay-action"
                                    onClick={()=> {
                                        setShowProjectOverlay(false);
                                        setProject(proj.projectId);
                                        
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          setProject(proj.projectId);
                                          setShowProjectOverlay(false);
                                        }
                                      }}
                                      role="button"
                                      tabIndex={0}
                                      aria-label="Select the task project"
                                    >
                                      {proj.name}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
    );
};

export default ProjectOverlay
