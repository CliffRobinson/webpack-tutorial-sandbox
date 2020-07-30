import React from 'react';

import { PENDING, CREATING } from '../../constants/gameStatus';

const styleObj = {
    backgroundColor: 'white',
    border: "2px solid black"
}

export function GameCreatorForm(props) {
    const { createGame, receiveGamesByStatus } = props;
    const {creating} = props.games

    function clicker(e) {
        e.preventDefault()
        const game = {
            name: creating.name,
            password: creating.password,
            status: PENDING
        }
        createGame(game)
    }

    function inputChange(e) {
        e.preventDefault()

        const updatedCreating = {
            ...creating,
            [e.target.name]:e.target.value
        }

        console.log(updatedCreating)

        receiveGamesByStatus({
            status: CREATING,
            games: updatedCreating
        })
    }

    return(<form style={styleObj}>
        <h4> Wanna make a gaem?</h4>
        <label htmlFor='name'>Name:</label>
        <input type='text' name='name' onChange={inputChange} value={creating.name}></input>
        <label htmlFor='password'>Password:</label>
        <input type='text' name='password' onChange={inputChange} placeholder="leave blank if you don't want a password"></input>
        <button type='submit' onClick={clicker}>Let's PLAAAY</button>
    </ form>)
}