import * as React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import { firestore } from 'firebase';
import Checkbox from '../components/Checkbox';


jest.mock('../context', ()=>({
    useAuthValue: jest.fn(()=>({
        auth : true
    })),
   
}));

jest.mock('../hooks', ()=>({
    useTasks : jest.fn(()=>({
        tasks : [],
        setTasks : jest.fn()
    })),
}));

jest.mock('../firebase', ()=>({
    firebase :{
        firestore : jest.fn(()=>({
            collection : jest.fn(()=>({
                doc : jest.fn(()=>({
                    update : jest.fn(() => Promise.resolve('Hii')),
                })),
            
            })),
        }))
    }
}))

beforeEach(cleanup);


describe('<Checkbox/>', ()=>{
    describe('Success', () => {    
    it('Render the task checkbox', ()=>{
        const {queryByTestId} = render(<Checkbox id="1" taskDesc="Finish this tutorial series" />);
        expect(queryByTestId('checkbox-action')).toBeTruthy();
        });
    it('render the task checkbox and accept a click', ()=>{
        const {queryByTestId} = render(<Checkbox id="1" taskDesc="FInish tutorial" />)
        expect(queryByTestId('checkbox-action')).toBeTruthy();
        fireEvent.click(queryByTestId('checkbox-action'));
    });
    it('render the task checkbox and accept a keydown', ()=>{
        const {queryByTestId} = render(<Checkbox id="1" taskDesc="FInish tutorial" />)
        expect(queryByTestId('checkbox-action')).toBeTruthy();
        fireEvent.keyDown(queryByTestId('checkbox-action'),{
        key: 'a',
        code: 65});
        fireEvent.keyDown(queryByTestId('checkbox-action'), {
            key: 'Enter',
            code: 13,
          });
    });
    });
});
