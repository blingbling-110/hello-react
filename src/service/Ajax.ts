import axios from "axios";
import { baseURL, timeout } from "./config";

const instance = axios.create({
  baseURL,
  timeout
})
instance.interceptors.request.use(config => {
  console.log('拦截请求', config)
  return config
}, console.error)
instance.interceptors.response.use(res => {
  console.log('拦截响应', res.data)
  return res.data
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        console.log('HTTP 400，请求错误')
        break
      case 401:
        console.log('HTTP 401，未授权访问')
        break
    }
  }
})

export default instance
export const requestAll = axios.all
