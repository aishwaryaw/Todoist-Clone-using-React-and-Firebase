import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Projects from '../components/Projects';

beforeEach(cleanup);

jest.mock('../context', ()=>({
    useProjectsValue : jest.fn(()=>({
        projects: [
            {
              name: '🙌 THE OFFICE',
              projectId: '1',
              userId: 'jlIFXIwyAL3tzHMtzRbw',
              docId: 'michael-scott',
            },
          ],
    })),

    useSelectedProjectsValue : jest.fn(()=>({
        setSelectedProject : jest.fn(()=>'INBOX'),
    })),

}));

describe('<Projects/>', () => {
    describe('Success', () => {
        it('Renders projects component', ()=>{
            const { queryByTestId } = render(<Projects/>);
            expect(queryByTestId('project-action')).toBeTruthy();
        });

       it('Renders project and selects an active project using click', ()=>{
            const { queryByTestId } = render(<Projects activeValue="1"/>);
            expect(queryByTestId('project-action')).toBeTruthy();

            fireEvent.click(queryByTestId('project-action'));
            expect(queryByTestId('project-action-parent').classList.contains('active')).toBeTruthy();
       });

       it('Renders project and selects an active project using keydown', ()=>{
            const { queryByTestId } = render(<Projects activeValue="0" />);
            expect(queryByTestId('project-action')).toBeTruthy();
    
            fireEvent.keyDown(queryByTestId('project-action'), {
            key: 'a',
            code: 65,
            });
            expect(
            queryByTestId('project-action-parent').classList.contains('active')
            ).toBeFalsy();
    
            fireEvent.keyDown(queryByTestId('project-action'), {
            key: 'Enter',
            code: 13,
            });
            expect(
            queryByTestId('project-action-parent').classList.contains('active')
            ).toBeTruthy();
        });

        it('Renders the projects with no active value', ()=>{
            const { queryByTestId } = render(<Projects/>);
            expect(queryByTestId('project-action')).toBeTruthy();
    
            fireEvent.keyDown(queryByTestId('project-action'), {
            key: 'a',
            code: 65,
            });
            expect(
            queryByTestId('project-action-parent').classList.contains('active')
            ).toBeFalsy();
    
            fireEvent.keyDown(queryByTestId('project-action'), {
            key: 'Enter',
            code: 13,
            });
            expect(
            queryByTestId('project-action-parent').classList.contains('active')
            ).toBeTruthy();
    
        });

    });
});


