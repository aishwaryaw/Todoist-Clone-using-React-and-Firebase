import React, { useState } from 'react'
import { useSelectedProjectsValue } from '../../context'
import { FaRegCalendar, FaRegCalendarAlt, FaInbox, FaChevronDown } from 'react-icons/fa'
import Projects from '../Projects';
import AddProject from '../AddProject';

const Sidebar = () => {
    const { setSelectedProject } = useSelectedProjectsValue();
    const [ active, setActive ] = useState('INBOX');
    const [ showProjects, setShowProjects ] = useState(true);
    return (
        
        <div className="sidebar" data-testid="sidebar">
            <ul className="sidebar__generic">
                <li data-testid="inbox"
                className = { active == 'INBOX' ? 'active' : undefined }
                >
                    <div
                     data-testid="inbox-action"
                     aria-label="Show inbox tasks"
                     tabIndex={0}
                     role="button"
                     onClick = { ()=> {
                         setActive('INBOX')
                         setSelectedProject('INBOX')
                     }}

                     onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setActive('INBOX');
                          setSelectedProject('INBOX');
                        }
                      }}
                     >
                         <span>
                            <FaInbox />
                        </span>
                        <span>Inbox</span>

                     </div>
                </li>


                <li data-testid="today"
                className = { active == 'TODAY' ? 'active' : undefined }
                >
                    <div
                     data-testid="today-action"
                     aria-label="Show today tasks"
                     tabIndex={0}
                     role="button"
                     onClick = { ()=> {
                         setActive('TODAY')
                         setSelectedProject('TODAY')
                     }}

                     onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setActive('TODAY');
                          setSelectedProject('TODAY');
                        }
                      }}
                     >
                         <span>
                            <FaRegCalendar />
                        </span>
                        <span>Today</span>

                     </div>
                </li>

                <li data-testid="next_7"
                className = { active == 'NEXT_7' ? 'active' : undefined }
                >
                    <div
                     data-testid="next_7-action"
                     aria-label="Show tasks for next 7 days"
                     tabIndex={0}
                     role="button"
                     onClick = { ()=> {
                         setActive('NEXT_7')
                         setSelectedProject('NEXT_7')
                     }}

                     onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setActive('NEXT_7');
                          setSelectedProject('NEXT_7');
                        }
                      }}
                     >
                         <span>
                            <FaRegCalendarAlt />
                        </span>
                        <span>NEXT_7</span>

                     </div>
                </li>

            </ul>

            <div
            className="sidebar__middle"
            aria-label="Show/hide projects"
            onClick = { () => setShowProjects(!showProjects) }
            onKeyDown= { (e) => {
                if(e.key == "Enter"){
                    setShowProjects(!showProjects)
                }
            }}
            role="button"
            tabIndex={0}
            >
                <span>
                    <FaChevronDown className={ !showProjects ? 'hidden-projects' : undefined }/>
                </span>
                <h2>Projects</h2>
            </div>

            <ul className="sidebar__projects">{showProjects && <Projects />}</ul>
            { showProjects && <AddProject /> }

        </div>
            
    )
}

export default Sidebar
