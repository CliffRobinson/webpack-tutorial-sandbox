import {takeEvery, call, put} from 'redux-saga/effects'
import request from 'superagent'

import {REQUEST_MESSAGES, receiveMessages} from '../actions/messageActions'


function* fetchMessages(action) {
    console.log("BEFORE YIELD")
    const messages = yield call(request.get, '/chat/')
    console.log("AFTER YIELD")
    console.log(messages)
    yield put(receiveMessages(messages.body))
}

export function* messageSaga() {
    yield takeEvery(REQUEST_MESSAGES, fetchMessages)
}