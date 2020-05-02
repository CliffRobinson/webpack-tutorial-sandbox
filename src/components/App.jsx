import React from 'react'

import {ChatWindowContainer} from './ChatWindowContainer'
import { SocketListener } from './SocketListener'
import {data} from '../../server/db/seeds/test/test-chat'

export function App() {
    return <div> 
        <p>I am rendered from React!!!!</p>
        <ChatWindowContainer />
        {/* <SocketListener /> */}
    </div>
}