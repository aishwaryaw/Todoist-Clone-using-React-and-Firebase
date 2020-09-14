import React from 'react';
import { render, fireEvent, cleanup, queryByText } from '@testing-library/react';

import ProjectOverlay from '../components/ProjectOverlay';

beforeEach(cleanup);

jest.mock('../context', ()=>({
   useAuthValue:jest.fn(()=>({
       auth:true
   })),

    useProjectsValue : jest.fn(()=>({
        projects : [
            {
                name: '🙌 THE OFFICE',
                projectId: '1',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'michael-scott',
              },
        ],
        setProject : jest.fn(),
    })),
}));



describe('<ProjectOverlay/>', () => {
    afterEach(()=>{
        jest.clearAllMocks();
    });

    describe('Success', () => {
        it('Renders project overlay component and calls setShowProjectOverlay using onclick', ()=>{
            const showProjectOverlay = true;
            const setShowProjectOverlay = jest.fn(()=>!showProjectOverlay);
            const setProject = jest.fn();

            const { queryByTestId } = render(
            <ProjectOverlay 
            setProject = {setProject}
            showProjectOerlay
            setShowProjectOverlay = {setShowProjectOverlay}/>);

            expect(queryByTestId('project-overlay')).toBeTruthy(); 
            fireEvent.click(queryByTestId('project-overlay-action'));

            expect(setShowProjectOverlay).toHaveBeenCalled();
        });

        it('Renders project overlay component and calls setShowProjectOverlay using onkeydown', ()=>{
            const showProjectOverlay = true;
            const setShowProjectOverlay = jest.fn(()=>!showProjectOverlay);
            const setProject = jest.fn();

            const { queryByTestId } = render(
            <ProjectOverlay 
            setProject = {setProject}
            showProjectOerlay
            setShowProjectOverlay = {setShowProjectOverlay}/>);

            expect(queryByTestId('project-overlay')).toBeTruthy(); 
            fireEvent.keyDown(queryByTestId('project-overlay-action'),{
                key :'a',
                code : 65
            });

            expect(setProject).not.toHaveBeenCalled();

            fireEvent.keyDown(queryByTestId('project-overlay-action'),{
                key : 'Enter',
                code : 13
            });

            expect(setProject).toHaveBeenCalled();
        });

    });
});


