import React from 'react';

export const GameListItem = (props) => {
    const stlyeObj = {
        backgroundImage: 'linear-gradient(lightgrey, lightblue)',
        width: '33%'
    }

    const {game} = props

    return <div style={stlyeObj}>
        <h5>{game.name}</h5>
        <p>x/10 players</p>
        <p>{game.password && 'Password Locked'}</p>
    </div>
};