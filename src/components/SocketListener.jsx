import React from 'react'
import {connect} from 'react-redux'

import {receiveMessages} from '../actions/messageActions'

function SocketListenerNoStore(props) {

    const {socket, receiveMessages} = props

    socket.on('receiveChatMessagesByRoom', (messages) => {
        console.log('got messages back from the db:')
        console.log(messages)
        receiveMessages(messages)
    })

    return <React.Fragment></React.Fragment>
}

const mapStateToProps = ({socket}) => ({socket})

const mapDispatchToProps = {
    receiveMessages
}

export const SocketListener = connect(mapStateToProps, mapDispatchToProps)(SocketListenerNoStore)