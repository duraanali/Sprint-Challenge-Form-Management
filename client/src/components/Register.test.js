import { render, fireEvent } from 'react-testing-library'
import React from 'react';
import 'react-testing-library/cleanup-after-each'
import Register from '../components/Register';


describe('Register', () => {
    it('click button', async () => {
        const { getByText, getByTestId } = render(<Register />);
        const input = getByLabelText('Change text');
        input.value = 'input text';
        fireEvent.click(getByText('submit'));
        console.log('saved', getByTestId('saved').innerHTML);
        expect(getByTestId('saved')).toHaveTextContent('input text')
    })
});