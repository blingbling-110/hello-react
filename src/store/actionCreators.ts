import axios from 'axios'
import {
  INCREMENT,
  DECREMENT,
  ADD_NUMBER,
  SUB_NUMBER,
  CHANGE_BANNER,
  CHANGE_RECOMMEND,
} from './constants'

const incAction = () => ({ type: INCREMENT })
const decAction = () => ({ type: DECREMENT })
const addAction = (num: number) => ({ type: ADD_NUMBER, num })
const subAction = (num: number) => ({ type: SUB_NUMBER, num })
const changeBannerAction = (banner: any) => ({ type: CHANGE_BANNER, banner })
const changeRecommendAction = (recommend: any) => ({ type: CHANGE_RECOMMEND, recommend })
const getHomeMultiDataAction = () => (dispatch: any, getState: any) => {
  axios({
    url: 'http://123.207.32.32:8000/home/multidata',
  }).then(res => {
    const data = res.data.data
    dispatch(changeBannerAction(data.banner.list))
    dispatch(changeRecommendAction(data.recommend.list))
  })

  console.log('getSate():', getState())
}

export {
  incAction,
  decAction,
  addAction,
  subAction,
  getHomeMultiDataAction,
}
