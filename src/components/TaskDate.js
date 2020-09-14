import React from 'react'
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';
import moment from 'moment';

const TaskDate = ({ taskDate, setTaskdate, showTaskDate, setShowTaskDate}) => {
    return (
        <div>
            {showTaskDate && (
            <div className="task-date" data-testid="task-date-overlay">
                <ul className="task-date__list">
                    <li>
                        <div 
                        className={ taskDate == moment().format('DD/MM/YYYY') ? 'selected' : undefined}
                        onClick={()=>{
                            setTaskdate(moment().format('DD/MM/YYYY'))
                            setShowTaskDate(false)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setShowTaskDate(false);
                              setTaskdate(moment().format('DD/MM/YYYY'));
                            }
                          }}
                          data-testid="task-date-today"
                          tabIndex={0}
                          aria-label="Select today as the task date"
                          role="button"
                        >
                          <span>
                            <FaSpaceShuttle />
                          </span>
                          <span>Today</span>
                        </div>
                    </li>

                    <li>
                    <div 
                    className={taskDate == moment().add(1, 'day').format('DD/MM/YYYY')? 'selected' : undefined}
                        onClick={()=>{
                            setTaskdate(moment().add(1, 'day').format('DD/MM/YYYY'));
                            setShowTaskDate(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setShowTaskDate(false);
                              setTaskdate(moment().add(1, 'day').format('DD/MM/YYYY'));
                            }
                          }}
                          data-testid="task-date-tomorrow"
                          tabIndex={0}
                          aria-label="Select tomorrow as the task date"
                          role="button"
                        >
                          <span>
                            <FaSun />
                          </span>
                          <span>Tomorrow</span>
                        </div>

                    </li>
                    <li>
                    <div 
                    className={taskDate == moment().add(7, 'days').format('DD/MM/YYYY') ? 'selected' : undefined}
                        onClick={()=>{
                            setTaskdate(moment().add(7, 'days').format('DD/MM/YYYY'));
                            setShowTaskDate(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setShowTaskDate(false);
                              setTaskdate(moment().add(7, 'days').format('DD/MM/YYYY'));
                            }
                          }}
                          data-testid="task-date-next-week"
                          tabIndex={0}
                          aria-label="Select next week as the task date"
                          role="button"
                        >
                          <span>
                            <FaRegPaperPlane />
                          </span>
                          <span>Next week</span>
                        </div>

                    </li>
                    
                </ul>
                </div>
        
        )}
        </div>
    )
}

export default TaskDate
