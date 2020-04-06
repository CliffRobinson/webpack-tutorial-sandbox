import React from 'react'
import { connect } from 'react-redux'

import { ChatWindow } from './ChatWindow'

const mapStateToProps = (state) => state
//const mapDispatchToProps

export const ChatWindowContainer = connect(mapStateToProps)(ChatWindow)
