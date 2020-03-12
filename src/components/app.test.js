import React from 'react';
import {shallow} from 'enzyme';

import {App} from './App';

describe('components/app/js', ()=> {
    it('matches snapshot', ()=> {
        expect(shallow(<App />)).toMatchSnapshot()
    })
})