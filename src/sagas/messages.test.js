import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {call} from 'redux-saga/effects'
import request from 'superagent'

import {requestMessages, receiveMessages} from '../actions/messageActions'
import {rootSaga} from './index'

const fakeMessages = [
    {name:"harry", msg: "hello"},
    {name:"ron", msg: "hi"}
]

test('messages: fetchmessages', ()=> {
    return expectSaga(rootSaga)
        .dispatch(requestMessages())
        .call(request.get, '/chat/')
        .provide([
            [call(request.get, '/chat/'), {body: fakeMessages}]])
        .put(receiveMessages(fakeMessages))
        .silentRun()
})