import React , {useState, useEffect} from 'react'
import { FaPizzaSlice } from 'react-icons/fa';
import AddTask from '../AddTask';
import { useAuthValue } from '../../context';
import { Link } from 'react-router-dom';
import { firebase } from '../../firebase';

const Header = ({darkmode, setDarkmode}) => {
    const [showQuickAddTask, setshowQuickAddTask] = useState(false);
    const [shouldShowMain, setshouldShowMain] = useState(false);
    const {auth, authenticate , email} = useAuthValue();
    
   useEffect(() => {
       authenticate(); 
   });
    
    return (
      
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/logo.png" alt="Todoist" />
        </div>

        <div className="settings">
        <ul>
        <li className="settings__darkmode">
                    <button type="button"
                    data-testid="dark-mode-action"
                    aria-label="Darkmode on/off"
                    onClick={()=> setDarkmode(!darkmode)}>
                        <FaPizzaSlice/>
                    </button>
                </li>
        </ul>
           
            { auth ? (
                 <ul>
                <li className="settings__add">
                    <button type="button"
                    aria-label="quick add task"
                    data-testid="quick-add-task-action"
                    onClick={()=>{
                        setshouldShowMain(true)
                        setshowQuickAddTask(true);
                    }}
                    >
                        +
                    </button>
                </li>

                <li className="settings__add">
                    <button type="button"
                    data-testid ="logout-button"
                    aria-label="logout the user"
                    onClick={()=>{
                        firebase.auth().signOut();
                        authenticate();
                    }}>
                        Logout - {email}
                    </button>
                    
                </li>
              
                </ul>
            )
            : (
                <ul>
                
                <li className="settings__add__link"
                aria-label="login the user">
                    <Link to="/login">Login</Link>
                </li>

                <li className="settings__add__link" aria-label="register the user">
                    <Link to="/register">Register</Link>
                </li>
                </ul>

            )}
            
        </div>
        </nav>

        <AddTask 
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setshowQuickAddTask}/>
        </header>
            
    
    )
}

export default Header
