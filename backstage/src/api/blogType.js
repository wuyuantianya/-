import request from '@/utils/request'
// 获取分类
export function getBlogTypes() {
  return request({
    url: '/api/blogtype',
    method: 'get',
  })
}

// 获取单个分类
export function getBlogTypeById(id){
  return request({
    url: `/api/blogtype/${id}`,
    method: 'get',
  })
}

// 更新分类
export function updateBlogType(id,data){
    return request({
      url: `/api/blogtype/${id}`,
      method: 'put',
      data
    })
}
// 删除分类
export function deleteBlogType(id){
    return request({
      url: `/api/blogtype/${id}`,
      method: 'delete',
    })
}

// 添加分类
export function addBlogType(data){
    return request({
      url: `/api/blogtype`,
      method: 'post',
      data
    })
}