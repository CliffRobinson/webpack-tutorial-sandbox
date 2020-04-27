import log from 'loglevel'
import {takeEvery, call, put} from 'redux-saga/effects'
import request from 'superagent'

import {REQUEST_MESSAGES, receiveMessages} from '../actions/messageActions'


function* fetchMessages(action) {
    log.trace(`fetch message saga triggered`)
    const messages = yield call(request.get, '/chat/')
    yield put(receiveMessages(messages.body))
}

export function* messageSaga() {
    yield takeEvery("fdhgfd", fetchMessages)
}