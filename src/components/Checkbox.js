import React from 'react'
import {firebase} from '../firebase';
import { useTasks } from '../hooks';


const Checkbox = ({taskId, taskDesc}) => {
   
    const {tasks, setTasks} = useTasks();
    const archiveTasks = () => {
        firebase.firestore().collection('tasks').doc(taskId).update({
            archived :true
        })
        .then(()=>{
            setTasks([...tasks]);
        });
    };
    return (
        <div
        className="checkbox-holder"
        data-testid="checkbox-action"
        onClick={()=> archiveTasks()}
        onKeyDown={(e)=>{
            if(e.key == "Enter"){
                archiveTasks();
            }
        }}
        aria-label = {`Mark ${taskDesc} as done ?`}
        role="button"
        tabIndex={0}
        >
        <span className="checkbox"/>
            
        </div>
    )
}

export default Checkbox
