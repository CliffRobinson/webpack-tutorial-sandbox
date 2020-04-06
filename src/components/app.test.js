import React from 'react';
import {shallow} from 'enzyme';

import {App} from './App';

describe('components/app/js', ()=> {
    it('matches snapshot', ()=> {
        const wrapper = shallow(<App />)
        expect(wrapper).toMatchSnapshot()
    })
})