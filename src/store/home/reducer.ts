import { CHANGE_BANNER, CHANGE_RECOMMEND } from './constants'

export interface IHomeState {
  banner: any,
  recommend: any,
}

export interface IHomeAction {
  type: any,
  banner?: any,
  recommend?: any
}

const defHomeInfo = {
  banner: [],
  recommend: [],
}

export default function homeReducer (homeInfo: IHomeState = defHomeInfo, action: IHomeAction) {
  switch (action.type) {
    case CHANGE_BANNER:
      return { ...homeInfo, banner: action.banner }
    case CHANGE_RECOMMEND:
      return { ...homeInfo, recommend: action.recommend }
    default:
      return homeInfo
  }
}
