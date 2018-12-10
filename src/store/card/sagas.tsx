import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { CardsActionTypes, Card } from './types'
import { fetchError, fetchSuccess } from './actions'
import callApi from '../../utils/callApi'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com'

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    // const res = yield call(callApi, 'get', API_ENDPOINT, '/heroes')
  
    const cards: Card[] = [
      { 'id': 1, 'image': 'https://www.altusproperties.com/wp-content/uploads/2016/11/48.jpg', 'label': 'label card 1', 'title': 'title card 1', 'description': 'description card 1', 'url': 'url card 1' },
      { 'id': 2, 'image': 'https://www.altusproperties.com/wp-content/uploads/2016/11/48.jpg', 'label': 'label card 2', 'title': 'title card 2', 'description': 'description card 2', 'url': 'url card 2' },
      { 'id': 3, 'image': 'https://www.altusproperties.com/wp-content/uploads/2016/11/48.jpg', 'label': 'label card 3', 'title': 'title card 3', 'description': 'description card 3', 'url': 'url card 3' },
    ];

    const res = { 
      data: cards,
      error: ''
    }

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res.data))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(CardsActionTypes.FETCH_REQUEST, handleFetch)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* cardsSaga() {
  yield all([fork(watchFetchRequest)])
}

export default cardsSaga