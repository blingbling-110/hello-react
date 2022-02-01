import axios from 'axios'
import { CHANGE_BANNER, CHANGE_RECOMMEND, FETCH_DATA } from './constants'

export const changeBannerAction = (banner: any) => ({ type: CHANGE_BANNER, banner })
export const changeRecommendAction = (recommend: any) => ({ type: CHANGE_RECOMMEND, recommend })
export const getHomeMultiDataAction = () => (dispatch: any, getState: any) => {
  axios({
    url: 'http://123.207.32.32:8000/home/multidata',
  }).then(res => {
    const data = res.data.data
    dispatch(changeBannerAction(data.banner.list))
    dispatch(changeRecommendAction(data.recommend.list))
  })

  console.log('redux-thunk getSate():', getState())
}
export const fetchDataAction = () => ({ type: FETCH_DATA })
