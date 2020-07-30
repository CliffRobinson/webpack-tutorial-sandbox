import React from 'react'

import {ChatWindowContainer} from './ChatWindowContainer'
import {GameListContainer} from './GameListContainer'
import { GameCreatorFormContainer } from './GameCreatorFormContainer'
// import {data} from '../../server/db/seeds/test/test-chat'

export function App() {
    return <div> 
        <GameListContainer />
        <GameCreatorFormContainer />
        <ChatWindowContainer room_id={0}/>

    </div>
}