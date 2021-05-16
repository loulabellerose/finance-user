import React from 'react';
import Header from '../Header.js';
import renderer from 'react-test-renderer';

describe('Header component', () => {
    it('Should match the snapshot', () => {

        const tree = renderer.create(<Header />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});