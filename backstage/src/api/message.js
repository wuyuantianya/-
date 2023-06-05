import request from '@/utils/request'
// 获取分类
export function getMessages(page = 1,limit = 10) {
  return request({
    url: `/api/message?page=${page}&limit=${limit}`,
    method: 'get',
  })
}

// 获取单个分类
export function getmessageById(id){
  return request({
    url: `/api/message/${id}`,
    method: 'get',
  })
}

// 更新分类
export function updateMessage(id,data){
    return request({
      url: `/api/message/${id}`,
      method: 'put',
      data
    })
}
// 删除分类
export function deleteMessage(id){
    return request({
      url: `/api/message/${id}`,
      method: 'delete',
    })
}

// 添加分类
export function addMessage(data){
    return request({
      url: `/api/message`,
      method: 'post',
      data
    })
}