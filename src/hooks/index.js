import React, {useState, useEffect} from 'react'
import { firebase } from '../firebase';
import moment from 'moment';
import { collatedTasksExists } from '../helpers/index';
import { useAuthValue } from '../context';
import { auth } from 'firebase';

const useTasks = (selectedProject) => {

    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    const {auth} = useAuthValue();
    // console.log(auth);
    
    useEffect(() => {
        let projectTasks = firebase.firestore().collection('tasks').where("userId" , "==", auth);
        
        projectTasks = selectedProject && !collatedTasksExists(selectedProject) ?
        (projectTasks = projectTasks.where("projectId", "==", selectedProject))
        : selectedProject == "TODAY" ? ( projectTasks =  projectTasks.where("date", "==", moment().format('DD/MM/YYYY')))
        : selectedProject == "INBOX" || selectedProject == 0 ?
        (projectTasks = projectTasks.where("date", "==", "") ): projectTasks;

        projectTasks.onSnapshot(snapshot => {
          
            const newTasks = snapshot.docs.map(task => ({
                id : task.id,
                ...task.data()
            }));
            setTasks(
                selectedProject == 'NEXT_7'
                ? newTasks.filter(task => 
                    moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true
                    )
                : newTasks.filter(task => task.archived !== true)

            );

            setArchivedTasks(newTasks.filter(task => task.archived == true));

        });
        // console.log(tasks);
       
    }, [selectedProject, auth]);

    return { tasks , setTasks };
}



const useProjects = () => {

    const [projects , setProjects] = useState([]);
    const {auth} = useAuthValue();
    useEffect(() => {
       firebase.firestore().collection('projects').
        where("userId", "==", auth).
        orderBy("projectId").
        get().then(
            snapshot => {
                const allProjects = snapshot.docs.map(project => ({
                    ...project.data(),
                    docId : project.id,
                }));

                if(JSON.stringify(allProjects) !== JSON.stringify(projects)){
                    setProjects(allProjects);
                    // console.log('Hi');
                }
            });
            // console.log(projects);
    
    }, [projects, auth]);
    // console.log(projects);
    return { projects, setProjects };
}

export {
    useProjects, 
    useTasks
}
