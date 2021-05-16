import React from 'react';
import NavBar from '../NavBar.js';
import renderer from 'react-test-renderer';

describe('NavBar component', () => {
    it('Should match the snapshot', () => {
        window.localStorage.setItem = jest.fn(("user", {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Z…QzOH0.iAKc9M_CmjVYbAo2lcitPp_6ipG8Cr-WeTu94On9lxQ",
                name: "Jonny Vegas",
                role: "Analyst"
            }));

        /*
        JSON.parse = jest.fn().mockImplementationOnce(() => {
            // return your what your code is returning.
                {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Z…QzOH0.iAKc9M_CmjVYbAo2lcitPp_6ipG8Cr-WeTu94On9lxQ", 
                name: "Jonny Vegas", 
                role: "Analyst"}
        });
        
       let user = jest.fn().mockImplementationOnce(() => {
        { name: "Test user" }
       });
*/
        //jest.mock('user', () => ({ name: "Test user" }), { virtual: true });
        const tree = renderer.create(<NavBar />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});