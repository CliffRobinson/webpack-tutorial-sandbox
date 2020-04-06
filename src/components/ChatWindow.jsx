import React from 'react'

export function ChatWindow(props) {
    const {chat} = props
    const styleObj = {
        backgroundColor:'white',
        border:"2px solid black"
    }
    return <div style ={styleObj}>
        {chat.map((msg, i)=> <p key={i}>{msg.user_id}: {msg.msg}</p>)}
    </div>
}