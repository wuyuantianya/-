import request from '@/utils/request'
// 获取标语
export function bannerData() {
  return request({
    url: '/api/banner',
    method: 'get',
  })
}
// 标语设置
export function setBanner(data){
  return request({
    url: '/api/banner',
    method: 'post',
    data
  })
}