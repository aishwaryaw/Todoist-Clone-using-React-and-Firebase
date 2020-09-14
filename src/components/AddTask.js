import React, { useState } from 'react'
import {firebase} from '../firebase';
import {FaRegListAlt, FaRegCalendarAlt} from 'react-icons/fa';
import moment from 'moment';
import { useSelectedProjectsValue, useAuthValue } from '../context';
import TaskDate from './TaskDate';
import ProjectOverlay from './ProjectOverlay';
import { useTasks } from '../hooks';

function AddTask({
    showAddTaskMain = true,
    shouldShowMain = false,
    showQuickAddTask,
    setShowQuickAddTask
}) {
    const [task, setTask] = useState('');
    const [project, setProject] = useState('');
    const [taskDate, setTaskdate] = useState('');
    const [showMain, setShowmain] = useState(shouldShowMain);
    const [showProjectOverlay, setShowProjectOverlay] = useState(false);
    const [showTaskDate , setShowTaskDate] = useState(false);
    const {selectedProject} = useSelectedProjectsValue();
    const {auth} = useAuthValue();
    const { tasks, setTasks } = useTasks();

    const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = '';

    if(projectId === 'TODAY'){
        collatedDate = moment().format('DD/MM/YYYY');
    }
    else if(projectId === 'NEXT_7'){
        collatedDate = moment().add(7,'days').format('DD/MM/YYYY');
    }
    console.log(selectedProject);
    return ( task && projectId && firebase.firestore().collection('tasks').add({
            archived:false,
            projectId,
            task,
            date: collatedDate || taskDate,
            userId:auth 
        }).then(()=>{
            setTasks([...tasks]);
            setTask('');
            setProject('');
            setTaskdate('');
            setShowmain(false);
            setShowProjectOverlay(false);
        })
    )
    }
    return (
        <div className = { showQuickAddTask ? 'add-task add-task__overlay' :'add-task' }
        
        data-testid="add-task-comp"
        >
        { showAddTaskMain && (
          <div
          className="add-task__shallow"
          data-testid ="show-main-action"
          onClick = {()=> setShowmain(!showMain)}
          onKeyDown = {(e)=>{
              if(e.key == 'Enter'){
                  setShowmain(!showMain)
              }
          }}>
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
          </div>
        )}

    {/* main content of the modal */}
        { (showMain || showQuickAddTask) && (
            <div className="add-task__main" data-testid="add-task-main">
                {
                    showQuickAddTask && (
                        <>
                        <div data-testid="quick-add-task">
                            <h2 className="header">Quick add task</h2>
                            <span className="add-task__cancel-x"
                            data-testid ="add-task-quick-cancel"
                            onClick = {()=> {
                                setShowmain(false);
                                setShowQuickAddTask(false);
                                setShowProjectOverlay(false);
                                setTaskdate('');
                                setProject('');
                            }}
                            onKeyDown={(e)=> {
                                if(e.key == 'Enter'){
                                    setShowmain(false)
                                    setShowQuickAddTask(false)
                                    setShowProjectOverlay(false)
                                    setTaskdate('');
                                    setProject('');
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            >
                            X
                            </span>
                        </div>
                        </>
                    )}
                
                <ProjectOverlay 
                project = {project}
                setProject={setProject}
                showProjectOerlay={showProjectOverlay} 
                setShowProjectOverlay={setShowProjectOverlay} />

                <TaskDate 
                taskDate={taskDate}
                setTaskdate={setTaskdate}
                showTaskDate={showTaskDate}
                setShowTaskDate={setShowTaskDate} />
                

                <input
                className="add-task__content"
                aria-label="Enter your task"
                data-testid="add-task-content"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)} />

                <button 
                className="add-task__submit"
                data-testid="add-task"
                type="button" onClick = {()=>{
                    showQuickAddTask ? 
                    addTask() && setShowQuickAddTask(false):
                    addTask()
                }}>
                    Add Task
                </button>

                {!showQuickAddTask && (
                    <span
                    className="add-task__cancel"
                    data-testid="add-task-main-cancel"
                    onClick={() => {
                      setShowmain(false);
                      setShowProjectOverlay(false);
                      setTaskdate('');
                      setProject('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setShowmain(false);
                        setShowProjectOverlay(false);
                        setTaskdate('');
                        setProject('');
                      }
                    }}
                    aria-label="Cancel adding a task"
                    tabIndex={0}
                    role="button"
                  >
                    Cancel
                  </span>
                )}

                <span 
                className="add-task__project"
                data-testid="show-project-overlay"
                onClick={()=> setShowProjectOverlay(!showProjectOverlay)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') setShowProjectOverlay(!showProjectOverlay);
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <FaRegListAlt />
                </span>

                <span
                className="add-task__date"
                data-testid="show-task-date-overlay"
                onClick={() => setShowTaskDate(!showTaskDate)}
                onKeyDown={(e) => {
                if (e.key === 'Enter') setShowTaskDate(!showTaskDate);
                }}
                tabIndex={0}
                role="button"
                >
                <FaRegCalendarAlt />
                </span>
                </div>
        )} 
        </div>    
    )
}

export default AddTask
