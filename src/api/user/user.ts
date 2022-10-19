import request from '../request'

interface responseData<T> {
  status: number
  msg: string | null
  data: T
}

export const login = async () => {
//   return await request({
//     method: 'post',
//     url: '/api/login'
//   })
//   return await request.post<responseData<{
//     token: string | null
//   }>>('/api/login').then(res => {
//     return res.data
//   })
  return await request({
    method: 'post',
    url: '/api/login'
  })
}
