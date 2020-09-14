import React from 'react';
import { render, fireEvent, cleanup, queryByText } from '@testing-library/react';
import AddTask from '../components/AddTask';
import { useSelectedProjectsValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', ()=>({
   useAuthValue:jest.fn(()=>({
       auth:true
   })),

    useSelectedProjectsValue : jest.fn(()=>({
        selectedProject : 1
    })),

    useProjectsValue : jest.fn(()=>({
        projects : [],
        setProjects : jest.fn()
    })),

}));

jest.mock('../hooks', ()=>({
    useTasks : jest.fn(()=>({
        tasks : [],
        setTasks : jest.fn(),
    }))
}));

jest.mock('../firebase', ()=>({
    firebase :{
        firestore: jest.fn(() => ({
          collection: jest.fn(() => ({
            add: jest.fn(() => Promise.resolve('Never mock firebase')),
          })),
        })),
      },
}));

describe('<AddTask/>', () => {
    afterEach(()=>{
        jest.clearAllMocks();
    });

    describe('Success', () => {
        it('Renders add task component', ()=>{
            const { queryByTestId } = render(<AddTask/>);
            expect(queryByTestId('add-task-comp')).toBeTruthy(); 
        });

        it('render quick add task overlay', ()=>{
            const setShowQuickAddTask = jest.fn();
            const { queryByTestId } = render(
            <AddTask 
            showAddTaskMain
            shouldShowMain = {false}
            showQuickAddTask={true}
            setShowQuickAddTask={setShowQuickAddTask}/>);
            expect(queryByTestId('quick-add-task')).toBeTruthy(); 
        });

        it('render add task main using onclick', ()=>{
        
            const { queryByTestId } = render(
            <AddTask 
            showAddTaskMain
           />);
           fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy(); 

        });

        it('renders the <AddTask /> main showable using keyDown', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);
      
            fireEvent.keyDown(queryByTestId('show-main-action'), {
              key: 'a',
              code: 65,
            });
            expect(queryByTestId('add-task-main')).toBeFalsy();
      
            fireEvent.keyDown(queryByTestId('show-main-action'), {
              key: 'Enter',
              code: 13,
            });
            expect(queryByTestId('add-task-main')).toBeTruthy();
          });

          it('renders the <AddTask /> project overlay using click', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);
      
            fireEvent.click(queryByTestId('show-main-action'));
             
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.click(queryByTestId('show-project-overlay'));
            expect(queryByTestId('project-overlay')).toBeTruthy();

          });

          it('renders the <AddTask /> project overlay when using onKeyDown', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);
      
            fireEvent.keyDown(queryByTestId('show-main-action'), {
              key: 'a',
              code: 65,
            });
            expect(queryByTestId('add-task-main')).toBeFalsy();
      
            fireEvent.keyDown(queryByTestId('show-main-action'), {
              key: 'Enter',
              code: 13,
            });
            expect(queryByTestId('add-task-main')).toBeTruthy();
      
            fireEvent.keyDown(queryByTestId('show-project-overlay'), {
              key: 'a',
              code: 65,
            });
            expect(queryByTestId('project-overlay')).toBeFalsy();
      
            fireEvent.keyDown(queryByTestId('show-project-overlay'), {
              key: 'Enter',
              code: 13,
            });
            expect(queryByTestId('project-overlay')).toBeTruthy();
          });

          it('renders add task task date overlay using onclick', ()=>{
            const {queryByTestId} = render(<AddTask />);
            expect(queryByTestId('add-task-main')).toBeFalsy();
            fireEvent.click(queryByTestId('show-main-action'));
            expect('add-task-main').toBeTruthy();
            expect(queryByTestId('task-date-overlay')).toBeFalsy();
            fireEvent.click(queryByTestId('show-task-date-overlay'));
            expect(queryByTestId('task-date-overlay')).toBeTruthy();

          });

          it('renders add task task date overlay using okkeydown', ()=>{
            const {queryByTestId} = render(<AddTask showAddTaskMain />);
            expect(queryByTestId('add-task-main')).toBeFalsy();
            fireEvent.keyDown(queryByTestId('show-main-action'), {
              key : 'a',
              code : 65
            });
            expect(queryByTestId('add-task-main')).toBeFalsy();
            fireEvent.keyDown(queryByTestId('show-main-action'), {
              key : 'Enter',
              code : 13
            });
            expect('add-task-main').toBeTruthy();
            expect(queryByTestId('task-date-overlay')).toBeFalsy();
            fireEvent.keyDown(queryByTestId('show-task-date-overlay'), {
              key : 'a',
              code : 65
            });
            expect(queryByTestId('task-date-overlay')).toBeFalsy();

            fireEvent.keyDown(queryByTestId('show-task-date-overlay'), {
              key : 'Enter',
              code : 13
            });
            expect(queryByTestId('task-date-overlay')).toBeTruthy();
          });

          it('hides <AddTask /> main when cancel is clicked using onclick', ()=>{
            const {queryByTestId} = render(<AddTask />);
            expect(queryByTestId('add-task-main')).toBeFalsy();
            fireEvent.click(queryByTestId('show-main-action'));
            expect('add-task-main').toBeTruthy();

            fireEvent.click(queryByTestId('add-task-main-cancel'));
            expect(queryByTestId('add-task-main')).toBeFalsy();
          });

          it('hides the <AddTask /> main when cancel is clicked using onKeyDown', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);
      
            fireEvent.keyDown(queryByTestId('show-main-action'), {
              key: 'a',
              code: 65,
            });
            expect(queryByTestId('add-task-main')).toBeFalsy();
      
            fireEvent.keyDown(queryByTestId('show-main-action'), {
              key: 'Enter',
              code: 13,
            });
            expect(queryByTestId('add-task-main')).toBeTruthy();
      
            fireEvent.keyDown(queryByTestId('add-task-main-cancel'), {
              key: 'a',
              code: 65,
            });
            expect(queryByTestId('add-task-main')).toBeTruthy();
      
            fireEvent.keyDown(queryByTestId('add-task-main-cancel'), {
              key: 'Enter',
              code: 13,
            });
            expect(queryByTestId('add-task-main')).toBeFalsy();
          });

          

          it('hides the quick <AddTask /> when cancel is clicked using onclick', () => {
            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(()=>!showQuickAddTask);
            const { queryByTestId } = render(
              <AddTask 
                showQuickAddTask = {showQuickAddTask}
               setShowQuickAddTask={setShowQuickAddTask} />);
      
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.click(queryByTestId('add-task-quick-cancel'));
            expect(setShowQuickAddTask).toHaveBeenCalledWith(false);
            // expect(setShowQuickAddTask).toHaveBeenCalled();
  
          });
    

          it('hides the quick <AddTask /> when cancel is clicked using onKeyDown', () => {
            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(()=>!showQuickAddTask);
            const { queryByTestId } = render(
              <AddTask 
                showQuickAddTask = {showQuickAddTask}
               setShowQuickAddTask={setShowQuickAddTask} />);
      
            expect(queryByTestId('add-task-main')).toBeTruthy();
      
            fireEvent.keyDown(queryByTestId('add-task-quick-cancel'), {
              key: 'a',
              code: 65,
            });
            expect(setShowQuickAddTask).not.toHaveBeenCalled();
      
            fireEvent.keyDown(queryByTestId('add-task-quick-cancel'), {
              key: 'Enter',
              code: 13,
            });
            expect(setShowQuickAddTask).toHaveBeenCalledWith(false);
            // expect(setShowQuickAddTask).toHaveBeenCalled();
          });
      
      it('render add task and adds a task for TODAY', ()=>{
        useSelectedProjectsValue.mockImplementation(()=>({
          selectedProject : 'TODAY'
        }));
        const showQuickAddTask = true;
        const setShowQuickAddTask = jest.fn(()=>!showQuickAddTask);

        const { queryByTestId } = render(
          <AddTask 
            showQuickAddTask = {showQuickAddTask}
           setShowQuickAddTask={setShowQuickAddTask} />);
        fireEvent.click(queryByTestId('add-task-content'));
        fireEvent.change(queryByTestId('add-task-content'), {
          target : { value : 'Task 1' }
        });

        expect(queryByTestId('add-task-content').value).toBe('Task 1');

        fireEvent.click(queryByTestId('add-task'));
        expect(setShowQuickAddTask).toHaveBeenCalledWith(false);
      });

      it('renders <AddTask /> and adds a task to NEXT_7', () => {
        useSelectedProjectsValue.mockImplementation(() => ({
          selectedProject: 'NEXT_7',
        }));
  
        const showQuickAddTask = true;
        const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
        const { queryByTestId } = render(
          <AddTask
            showQuickAddTask={showQuickAddTask}
            setShowQuickAddTask={setShowQuickAddTask}
          />
        );
        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-content')).toBeTruthy();
  
        fireEvent.change(queryByTestId('add-task-content'), {
          target: { value: 'I am a new task and I am amazing!' },
        });
        expect(queryByTestId('add-task-content').value).toBe(
          'I am a new task and I am amazing!'
        );
  
        fireEvent.click(queryByTestId('add-task'));
        expect(setShowQuickAddTask).toHaveBeenCalled();
      });


      it('renders <AddTaks/> and adds task with task date of TODAY',()=>{
        useSelectedProjectsValue.mockImplementation(()=>({
          selectedProject : "1"
        }));

        const { queryByTestId } = render(<AddTask/>);
        expect(queryByTestId('add-task-main')).toBeFalsy();
        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-content')).toBeTruthy();
        expect(queryByTestId('add-task-main')).toBeTruthy();

        fireEvent.change(queryByTestId('add-task-content'), {
          target : { value : 'Task for today' }
        });
        expect(queryByTestId('add-task-content').value).toBe('Task for today');

        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();

        fireEvent.click(queryByTestId('task-date-today'));
        expect(queryByTestId('task-date-overlay')).toBeFalsy();

        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();

        fireEvent.keyDown(queryByTestId('task-date-today'),{
          key : 'a',
          code : 65,
        });

        expect(queryByTestId('task-date-overlay')).toBeTruthy();

        fireEvent.keyDown(queryByTestId('task-date-today'), {
          key : 'Enter',
          code : 13
        });
        expect(queryByTestId('task-date-overlay')).toBeFalsy();

        fireEvent.click(queryByTestId('add-task'));

      });

      it('renders <AddTask /> and adds a task with a task date of TOMORROW', () => {
        useSelectedProjectsValue.mockImplementation(() => ({
          selectedProject: '1',
        }));
  
        const { queryByTestId } = render(<AddTask showMain />);
        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-content')).toBeTruthy();
        expect(queryByTestId('add-task-main')).toBeTruthy();
  
        fireEvent.change(queryByTestId('add-task-content'), {
          target: { value: 'I am the most amazing task ever!' },
        });
        expect(queryByTestId('add-task-content').value).toBe(
          'I am the most amazing task ever!'
        );
  
        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.click(queryByTestId('task-date-tomorrow'));
        expect(queryByTestId('task-date-overlay')).toBeFalsy();
  
        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.keyDown(queryByTestId('task-date-tomorrow'), {
          key: 'a',
          code: 65,
        });
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.keyDown(queryByTestId('task-date-tomorrow'), {
          key: 'Enter',
          code: 13,
        });
        expect(queryByTestId('task-date-overlay')).toBeFalsy();
  
        fireEvent.click(queryByTestId('add-task'));
      });
  
      it('renders quick <AddTask /> and adds a task with a task date of NEXT_7', () => {
        useSelectedProjectsValue.mockImplementation(() => ({
          selectedProject: '1',
        }));
        
        const showQuickAddTask = true;
        const setShowQuickAddTask = jest.fn(()=>!showQuickAddTask);
        const { queryByTestId } = render(
        <AddTask 
        setShowQuickAddTask={setShowQuickAddTask}
         showQuickAddTask />);

        expect(queryByTestId('add-task-content')).toBeTruthy();
        expect(queryByTestId('add-task-main')).toBeTruthy();
  
        fireEvent.change(queryByTestId('add-task-content'), {
          target: { value: 'I am the most amazing task ever!' },
        });
        expect(queryByTestId('add-task-content').value).toBe(
          'I am the most amazing task ever!'
        );
  
        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.click(queryByTestId('task-date-next-week'));
        expect(queryByTestId('task-date-overlay')).toBeFalsy();
  
        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.keyDown(queryByTestId('task-date-next-week'), {
          key: 'a',
          code: 65,
        });
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.keyDown(queryByTestId('task-date-next-week'), {
          key: 'Enter',
          code: 13,
        });
        expect(queryByTestId('task-date-overlay')).toBeFalsy();
  
        fireEvent.click(queryByTestId('add-task'));
        expect(setShowQuickAddTask).toHaveBeenCalledWith(false);
      });
    });
});


