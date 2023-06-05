import request from '@/utils/request'

// 获取项目列表
export function getProjectList(params) {
  return request({
    url: '/api/project',
    method: 'get',
    params
  })
}

// 获取单个项目
export function getProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: 'get',
  })
}

// 更改项目
export function updateProject(id,data) {
  return request({
    url: `/api/project/${id}`,
    method: 'put',
    data
  })
}

// 删除项目
export function delProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: 'delete',
  })
}

// 添加项目
export function addProject(data) {
  return request({
    url: `/api/project`,
    method: 'post',
    data
  })
}