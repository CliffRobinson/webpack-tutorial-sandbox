import React, { useEffect } from 'react'
import log from 'loglevel'


export function ChatWindow(props) {
    const { chat, requestMessagesByRoom, updateCurrentMessage, addMessage, room_id } = props
    const user_id = 1
    const {messages, currentMessage} = chat
    const styleObj = {
        backgroundColor: 'white',
        border: "2px solid black"
    }

    function clicker(e) {
        e.preventDefault()
        const message = {
            room_id,
            user_id,
            time: new Date().getTime(),
            msg: currentMessage
        }
        addMessage(message)
    }

    function onInputChange(e) {
        updateCurrentMessage(e.target.value)
    }

    useEffect(() => {
        log.trace('chatwindow component is dispatching requestmessages action')
        requestMessagesByRoom(room_id)
    },[])

    return (
        <form>

                <div style={styleObj}>
                    {messages.map((msg, i) => <p key={i}>{msg.name}: {msg.msg}</p>)}
                </div>
                <button onClick={clicker}>Get memssages</button>
                <input type='text'onChange={onInputChange}></input>


        </form>
    )

}