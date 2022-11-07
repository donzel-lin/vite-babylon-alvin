import { ILoginInfo } from './../types/user'
import request from '../request'

export const login = () => {
//   return await request({
//     method: 'post',
//     url: '/api/login'
//   })
//   return await request.post<responseData<{
//     token: string | null
//   }>>('/api/login').then(res => {
//     return res.data
//   })
  return request<ILoginInfo>({
    method: 'post',
    url: '/api/login'
  })
}
