import { call, put, takeLatest } from 'redux-saga/effects';
import { logIn } from '../services/authService';

function* logInSaga({ payload }) {
  try {
    const { username, room } = payload;
    const { teacher, student } = yield call(logIn, username, room);
    yield put({
      type: 'AUTHORIZATION_SUCCESS',
      payload: {
        username, room, teacher, student
      }
    });
  } catch (error) {
    yield put({ type: 'AUTHORIZATION_FAIL', payload: error.message, error: true });
  }
}

// eslint-disable-next-line func-names
export default function* () {
  yield takeLatest('LOG_IN', logInSaga);
}
