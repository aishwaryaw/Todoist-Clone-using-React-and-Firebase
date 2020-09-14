import React, {useEffect} from 'react'
import { useSelectedProjectsValue, useProjectsValue } from '../context'
import { useTasks } from '../hooks';
import { collatedTasksExists, getTitle, getCollatedTitle } from '../helpers';
import { collatedTasks } from '../constants';
import Checkbox from './Checkbox';
import AddTask from './AddTask';

const Tasks = () => {

    const { selectedProject } = useSelectedProjectsValue();
    const { tasks } = useTasks(selectedProject);
    const { projects } = useProjectsValue();
    // console.log(selectedProject);

    let projectName = '';
    if(collatedTasksExists(selectedProject) && selectedProject){
        projectName = getCollatedTitle(collatedTasks,selectedProject).name;
    }

    if( projects && projects.length > 0 && selectedProject && !collatedTasksExists(selectedProject)){
        projectName = getTitle(projects, selectedProject).name;
    }

    useEffect(() => {
        document.title = `${projectName}:Todoist`;
    });

    return (
        <div className="tasks" data-testid="tasks"> 
        <h2 data-testid="project-name">{projectName}</h2>
        <ul className="tasks__list">
            { tasks && (tasks.length == 0 ? <h4>No tasks exists!</h4> : tasks.map(task => {
                return (
                    <li key={task.id}>
                        <Checkbox taskId={task.id} taskDesc={task.task}/>
                    <span>{task.task}</span> 
                    </li>
                )
            }) )}
        </ul>
        <AddTask/>
        </div>
    )
}

export default Tasks
