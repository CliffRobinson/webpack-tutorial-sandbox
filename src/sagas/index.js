import {messageSaga} from './messages'

export function* rootSaga(){
    yield messageSaga()
}