import { all, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { changeBannerAction, changeRecommendAction } from './home/actionCreator'
import { FETCH_DATA } from './home/constants'

function* fetchDataWorker (action: any): any {
  const res = yield axios.get('http://123.207.32.32:8000/home/multidata')
  const data = res.data.data
  // yield put(changeBannerAction(data.banner.list))
  // yield put(changeRecommendAction(data.banner.list))
  yield all([
    put(changeBannerAction(data.banner.list)),
    put(changeRecommendAction(data.banner.list))
  ])
  console.log('fetchDataWorker action:', action)
}

function* mySaga () {
  // yield takeEvery(FETCH_DATA, fetchDataWorker)
  yield takeLatest(FETCH_DATA, fetchDataWorker)
}

export default mySaga
