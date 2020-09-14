import * as React from 'react';
import {cleanup, render, fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../components/Register';

jest.mock('../context', ()=>({
    useAuthValue : jest.fn(()=>({
        auth : false,
        authenticate : jest.fn()
    })),
}));


jest.mock('../firebase', ()=>({
    firebase : {
        auth : jest.fn(()=>({
            createUserWithEmailAndPassword : jest.fn(() => Promise.resolve("user logged in"))
            
            }))
        }
}));

       
describe('<Register />', () => {
    
    describe('Success', () => {
       
        it('renders register and do register', ()=>{  
                
       
            const {queryByTestId} = render(<MemoryRouter><Register/></MemoryRouter>);
            expect(queryByTestId('email-register')).toBeTruthy();

            fireEvent.change(queryByTestId('email-register'),{
                target : {value : 'email@mail.com'}
            });

            expect(queryByTestId('email-register').value).toBe('email@mail.com');

            expect(queryByTestId('password-register')).toBeTruthy();

            fireEvent.change(queryByTestId('password-register'),{
                target : {value : 'emailmail'}
            });

            expect(queryByTestId('password-register').value).toBe('emailmail');

            fireEvent.click(queryByTestId('register'));
            
        });
    });


    describe('Failure', () => {
     
        it('renders register and do register with error', ()=>{  
            
        // firebase.mockImplementationOnce(()=>Promise.reject('fail'));
        jest.mock('../firebase', ()=>({
            firebase : {
                auth : jest.fn(()=>({
                    signInWithEmailAndPassword : jest.fn(()=> Promise.reject("user cant be registered"))
                    
                    }))
                }
        }));
    
            const {queryByTestId} = render(<MemoryRouter><Register/></MemoryRouter>);
            expect(queryByTestId('email-register')).toBeTruthy();

            fireEvent.change(queryByTestId('email-register'),{
                target : {value : 'email@mail.com'}
            });

            expect(queryByTestId('email-register').value).toBe('email@mail.com');

            expect(queryByTestId('password-register')).toBeTruthy();

            fireEvent.change(queryByTestId('password-register'),{
                target : {value : ''}
            });

            expect(queryByTestId('password-register').value).toBe('');
            
            fireEvent.click(queryByTestId('register'));    
           
        });

    });
    
});