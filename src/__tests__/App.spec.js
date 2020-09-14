import * as React from 'react';
import {render, cleanup,fireEvent} from '@testing-library/react';
import Header from '../components/layout/Header';
import { useAuthValue } from '../context';
import { FaTruckMonster } from 'react-icons/fa';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';


beforeEach(cleanup); // clear te DOM

describe('<App />', ()=>{
    it('renders sthe application', ()=>{
            const {queryByTestId} = render(<MemoryRouter><App /></MemoryRouter>);
            expect(queryByTestId('application')).toBeTruthy();
            expect(queryByTestId('application').classList.contains('darkmode')).toBeFalsy();
        });

    it('render application in darkmode', ()=>{
        const {queryByTestId} = render(<MemoryRouter><App darkmodeDefault /></MemoryRouter>);
        expect(queryByTestId('application')).toBeTruthy();
        expect(queryByTestId('application').classList.contains('darkmode')).toBeTruthy();
    })
 
});