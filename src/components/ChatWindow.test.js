import React from 'react'
import { shallow } from 'enzyme'

import { ChatWindow } from './ChatWindow'

const data = {
    currentMessage: "",
    messages: [
        {
            name: 'Harry',
            msg: 'db: SANPE KILLS DUMBELDORE!!',
            time: 1585802175899
        },
        {
            name: 'Ron',
            msg: 'db: idk why I hang out with you',
            time: 1585802175950
        }
    ]
}

test('chatWindow', () => {
    expect(shallow(<ChatWindow chat={data} />)).toMatchSnapshot()
})