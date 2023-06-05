import request from '@/utils/request'

// 分页获取文章数据
export function getBlogs(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

// 获取单篇博客数据
export function getBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get'
  })
}

// 删除文章
export function delBlog(id) {
  console.log('ll')
  return request({
    url: `/api/blog/${id}`,
    method: 'delete'
  })
}

// 修改文章
export function updateBlog(id,data) {
  return request({
    // eslint-disable-next-line no-undef
    url: `/api/blog/${id}`,
    method: 'put',
    data
  })
}

// 添加文章
export function addBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}
