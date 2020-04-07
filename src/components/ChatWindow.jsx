import React, { useEffect } from 'react'

export function ChatWindow(props) {
    const { chat, requestMessages } = props
    const styleObj = {
        backgroundColor: 'white',
        border: "2px solid black"
    }

    function clicker() {
        console.log('clicky')
    }

    useEffect(() => {
        requestMessages()
    })

    return (
        <React.Fragment>

                <div style={styleObj}>
                    {chat.map((msg, i) => <p key={i}>{msg.name}: {msg.msg}</p>)}
                </div>
                <button onClick={clicker}>Get memssages</button>


        </React.Fragment>
    )

}