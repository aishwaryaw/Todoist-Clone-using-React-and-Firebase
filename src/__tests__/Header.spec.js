import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Header from '../components/layout/Header';

beforeEach(cleanup);

jest.mock('../context', ()=>({
    useAuthValue : jest.fn(()=>({
        auth: true,
        authenticate : jest.fn(),
        email : ''
    })),

    useSelectedProjectsValue : jest.fn(()=>({
        selectedProject : 1
    })),

    useProjectsValue : jest.fn(()=>({
        projects : []
    })),

}));

describe('<Header/>', () => {
    describe('Success', () => {
        it('Renders Header component', ()=>{
            const { queryByTestId } = render(<Header/>);
            expect(queryByTestId('header')).toBeTruthy();
        });

        it('renders header compoenent and activates darkmode using onclick', ()=>{
            const dakrmode = false;
            const setDarkmode = jest.fn(()=> !dakrmode);

            const {queryByTestId} = render(<Header dakrmode={dakrmode} setDarkmode={setDarkmode}/>);
            expect(queryByTestId('header')).toBeTruthy();
            fireEvent.click(queryByTestId('dark-mode-action'));
            expect(setDarkmode).toHaveBeenCalledWith(true);
        });

        it('render the header component and set quick add task to true using onclick', ()=>{
            const dakrmode = false;
            const { queryByTestId } = render(<Header darkmode={dakrmode}/>);
            expect(queryByTestId('header')).toBeTruthy();

            fireEvent.click(queryByTestId('quick-add-task-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy();

        });


    });
});


