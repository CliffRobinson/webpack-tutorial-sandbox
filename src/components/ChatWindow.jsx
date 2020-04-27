import React, { useEffect } from 'react'

export function ChatWindow(props) {
    const { chat, socket, requestMessagesByRoom, updateCurrentMessage, addMessage } = props
    const room_id = 1
    const user_id = 1
    const {messages, currentMessage} = chat
    const styleObj = {
        backgroundColor: 'white',
        border: "2px solid black"
    }

    function clicker(e) {
        e.preventDefault()
        console.log('clicky')
        const message = {
            room_id,
            user_id,
            time: new Date().getTime(),
            msg: currentMessage
        }
        addMessage(message, socket)
    }

    function onInputChange(e) {
        updateCurrentMessage(e.target.value)
    }

    useEffect(() => {
        console.log('chatwindow component is dispatching requestmessages action')
        requestMessagesByRoom(room_id, socket)
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