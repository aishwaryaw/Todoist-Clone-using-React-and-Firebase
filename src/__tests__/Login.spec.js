import * as React from 'react';
import {cleanup, render, fireEvent} from '@testing-library/react';
import Login  from '../components/Login';
import { MemoryRouter } from 'react-router-dom';



jest.mock('../context', ()=>({
    useAuthValue : jest.fn(()=>({
        auth : false,
        authenticate : jest.fn()
    })),
}));

beforeEach(() => jest.resetModules());
       
describe('<Login />', () => {
    jest.doMock('../firebase', ()=>({
        firebase : {
            auth : jest.fn(()=>({
                signInWithEmailAndPassword : jest.fn(() => Promise.resolve("user logged in"))
                
                }))
            }
    }));
    describe('Success', () => {
       
        it('renders login and do login', ()=>{  
                    
      
            const {queryByTestId} = render(<MemoryRouter><Login/></MemoryRouter>);
            expect(queryByTestId('email-login')).toBeTruthy();

            fireEvent.change(queryByTestId('email-login'),{
                target : {value : 'email@mail.com'}
            });

            expect(queryByTestId('email-login').value).toBe('email@mail.com');

            expect(queryByTestId('password-login')).toBeTruthy();

            fireEvent.change(queryByTestId('password-login'),{
                target : {value : 'emailmail'}
            });

            expect(queryByTestId('password-login').value).toBe('emailmail');

            fireEvent.click(queryByTestId('login'));
            
        });
    });

});

describe('<Login with error/>', () => {

    describe('Failure', () => {
     
        it('renders login and do login with error', ()=>{  
            
        
        jest.mock('../firebase', ()=>({
            firebase : {
                auth : jest.fn(()=>({
                    signInWithEmailAndPassword : jest.fn(()=> Promise.reject("user cant be logged in"))
                    
                    }))
                }
        }));
    
            const {queryByTestId} = render(<MemoryRouter><Login/></MemoryRouter>);
            expect(queryByTestId('email-login')).toBeTruthy();

            fireEvent.change(queryByTestId('email-login'),{
                target : {value : 'email@mail.com'}
            });

            expect(queryByTestId('email-login').value).toBe('email@mail.com');

            expect(queryByTestId('password-login')).toBeTruthy();

            fireEvent.change(queryByTestId('password-login'),{
                target : {value : ''}
            });

            expect(queryByTestId('password-login').value).toBe('');
            
            fireEvent.click(queryByTestId('login'));    
           
        });

    });
    
});
