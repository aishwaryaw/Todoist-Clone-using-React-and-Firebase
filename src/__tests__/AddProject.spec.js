import * as React from 'react';
import {cleanup, render , fireEvent} from '@testing-library/react';
import AddProject from '../components/AddProject';



jest.mock('../context', ()=>({
    useProjectsValue : jest.fn(()=>({
        projects : [
            {
                name: '🙌 THE OFFICE',
                projectId: '1',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'michael-scott',
              },
              {
                name: '🚀 DAILY',
                projectId: '2',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'daily-office',
              },
              {
                name: '🎯 FUTURE',
                projectId: '3',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'wake-up',
              },
              {
                name: '📚 WORDS',
                projectId: '4',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'arcade-fire',
              },
              {
                name: '🎵 MUSIC',
                projectId: '5',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'bella-ciao',
              },  
        ],

        setProjects : jest.fn(),
    })),

    useAuthValue: jest.fn(()=>({
        auth : true
    })),

    
}));

jest.mock('../firebase', ()=>({
    firebase : {
        firestore : jest.fn(()=>({
            collection : jest.fn(()=>({
                add : jest.fn(()=> Promise.resolve('I am resolved')),
            })),
        })),
    },
}));


beforeEach(cleanup);

describe('<AddProject/>', ()=>{
    describe('Success', () => {
        it('Renders add project', ()=>{
            const {queryByTestId} = render(<AddProject/>)
            expect(queryByTestId('add-project')).toBeTruthy();
        });

        it('Render add proejct and adds a project using a click', ()=>{
            const {queryByTestId} = render(<AddProject shouldShow/>)
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('project-name')).toBeTruthy();
            fireEvent.change(queryByTestId('project-name'),{
                target : { value : 'Best Project ever' },
            });
            expect(queryByTestId('project-name').value).toBe('Best Project ever');
            fireEvent.click(queryByTestId('add-project-submit'));
        });

        it('hides the add project if clicked cancel', ()=>{
            const {queryByTestId , getByText} = render(<AddProject shouldShow/>)
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();
            
            fireEvent.click(getByText('Cancel'));
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeFalsy()
        });

        it('hides the add project overlay using keydown',()=>{
            const {queryByTestId , getByText} = render(<AddProject shouldShow/>)
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();
            
            fireEvent.keyDown(getByText('Cancel'),{
                key :'a',
                code:65
            });
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();

            fireEvent.keyDown(getByText('Cancel'),{
                key :'Enter',
                code: 13
            });
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeFalsy();

        });

        it('Hides the add project overlay using onclick singular and reverse action', ()=>{
            const {queryByTestId , getByText} = render(<AddProject shouldShow/>)
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();
            
            fireEvent.click(queryByTestId('add-project-action'));
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeFalsy()
        });

        it('Hides add project overlay uaing keydown singular and reverse action', ()=>{
            const {queryByTestId , getByText} = render(<AddProject shouldShow/>)
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();
            
            fireEvent.keyDown(queryByTestId('add-project-action'), {
                key : 'a',
                code : 65
            });
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('add-project-action'), {
                key : 'Enter',
                code :13
            });
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeFalsy();

        })
    });
    
});