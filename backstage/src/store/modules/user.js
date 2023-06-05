/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2022-12-07 20:29:04
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-12 15:19:15
 * @FilePath: \09. vue组件库从入门到实战\mysite\background-system\src\store\modules\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2022-12-07 20:29:04
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2022-12-24 11:01:10
 * @FilePath: \09. vue组件库从入门到实战\mysite\background-system\src\store\modules\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo:{}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginId, loginPwd, captcha, remember} = userInfo
    return new Promise((resolve, reject) => {
      login({ loginId: loginId.trim(), loginPwd: loginPwd, captcha, remember}).then(response => {
        commit('SET_TOKEN', response.token)
        commit('SET_USER_INFO', response.data)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject()
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('验证失败，请重新登录')
        }
        commit('SET_USER_INFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

