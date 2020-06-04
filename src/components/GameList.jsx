import log from 'loglevel'
import React, { useEffect } from 'react'

import {PENDING} from '../../constants/gameStatus'
import {GameListItem} from './GameListItem'

const styleObj = {
    backgroundColor: 'white',
    border: "2px solid black"
}

export function GameList(props) {
    const {requestGamesByStatus} = props
    
    useEffect(() => {
        log.debug(`gameList component is dispatching requestGamesByStatus(pending)`)
        requestGamesByStatus(PENDING)
    }, [])

    const pendingGames = props.games[PENDING];

    return (
        <div style={styleObj}>
            <h3>This is a list of games</h3>
            {pendingGames.map((game, i) => (<GameListItem key={i} game={game}/>))}
        </div>
)
}