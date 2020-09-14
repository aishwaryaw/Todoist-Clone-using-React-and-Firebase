import * as React from 'react';
import {cleanup, render , fireEvent, queryByTestId} from '@testing-library/react';
import Projects from '../components/Projects';
import IndividualProject from '../components/IndividualProject';

beforeEach(cleanup);


jest.mock('../firebase', ()=>({
    firebase : {
        firestore : jest.fn(()=>({
            collection : jest.fn(()=>({
                doc : jest.fn(()=>({
                    delete : jest.fn(()=>Promise.resolve('Project deleted')),
                    update : jest.fn(),
                })),
            }))
        }))
    }
}));

jest.mock('../context', ()=>({
    useProjectsValue : jest.fn(()=>({
        projects : [ {
            name: '🙌 THE OFFICE',
            projectId: '1',
            userId: 'jlIFXIwyAL3tzHMtzRbw',
            docId: 'michael-scott',
          },
          {
            name: '🙌 THE WORK',
            projectId: '2',
            userId: 'jlIFXIwyAL3tzHMtzRbw',
            docId: 'michael-scott-id',
          },
        ],
        setProjects : jest.fn()
    })),

    useSelectedProjectsValue : jest.fn(()=>({
        setSelectedProject : jest.fn(()=>'INBOX'),
    })),

}));



describe('<IndvidualProject />', () => {
    const project = {
        name: '🙌 THE OFFICE',
            projectId: '1',
            userId: 'jlIFXIwyAL3tzHMtzRbw',
            docId: 'michael-scott',
    };
    describe('Success', () => {
        it('renders the project', ()=>{
            const {getByText} = render(<IndividualProject project={project}/>);
            expect(getByText('🙌 THE OFFICE')).toBeTruthy();
        });

        it('Render delete project overlay and delete a project using onclick', ()=>{
            const {getByText, queryByTestId} = render(<IndividualProject project={project}/>);
            expect(getByText('🙌 THE OFFICE')).toBeTruthy();

            fireEvent.click(queryByTestId('delete-project'));
            expect(getByText('Are u sure u want to delete this project ?')).toBeTruthy();
            fireEvent.click(getByText('Delete'));
            // expect(getByText('🙌 THE OFFICE')).toBeFalsy();
        });
        it('Render delete project overlay and delete a project using onkeydown', ()=>{
            const {getByText, queryByTestId} = render(<IndividualProject project={project}/>);
            expect(getByText('🙌 THE OFFICE')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('delete-project'), {
                key : 'a',
                code : 65
            });
            fireEvent.keyDown(queryByTestId('delete-project'), {
                key : 'Enter',
                code : 13
            });
            expect(getByText('Are u sure u want to delete this project ?')).toBeTruthy();
            fireEvent.keyDown(getByText('Delete'),{
                key : 'a',
                code : 65
            });
            fireEvent.keyDown(getByText('Delete'),{
                key : 'Enter',
                code : 13
            });
            // expect(getByText('🙌 THE OFFICE')).toBeFalsy();
        });

        it('renders the delete overlay and then cancels using onClick', () => {
            const { queryByTestId, getByText } = render(
              <IndividualProject project={project} />
            );
      
            fireEvent.click(queryByTestId('delete-project'));
            expect(
              getByText('Are u sure u want to delete this project ?')
            ).toBeTruthy();
      
            fireEvent.click(getByText('Cancel'));
          });
      
          it('renders the delete overlay and then cancels using onKeyDown', () => {
            const { queryByTestId, getByText } = render(
              <IndividualProject project={project} />
            );
      
            fireEvent.keyDown(queryByTestId('delete-project'), {
              key: 'a',
              code: 65,
            });
      
            fireEvent.keyDown(queryByTestId('delete-project'), {
              key: 'Enter',
              code: 13,
            });
            expect(
              getByText('Are u sure u want to delete this project ?')
            ).toBeTruthy();
      
            fireEvent.keyDown(getByText('Cancel'), {
              key: 'a',
              code: 65,
            });
      
            fireEvent.keyDown(getByText('Cancel'), {
              key: 'Enter',
              code: 13,
            });
          });
    });
     
});

