import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  withCredentials: true,
  baseURL: '' // 请求地址
})

// 错误处理
const errorHandle = (error: any): void => {
  console.log(error)
}
// 请求拦截
request.interceptors.request.use(config => {
  console.log(config, 'config')
  return config
}, errorHandle)
// 响应拦截
request.interceptors.response.use(response => {
  return response
}, errorHandle)

// export default request
export default <T = any> (config: AxiosRequestConfig<any>) => {
  return request(config).then(res => {
    return (res.data || res.data.data) as T
  })
}
