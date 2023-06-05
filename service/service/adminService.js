/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-01 19:33:32
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-17 13:48:10
 * @FilePath: \frontend-node-master\blogDB\service\adminService.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Admin = require('../modules/Admin');
const md5 = require('md5');
const filterHelper = require('../utils/filterHelper');
const validator = require('validate.js');
// 增加管理员
exports.addAdmin = async function (adminObj, operatorId) {
    // 增加管理员时需要判断该操作者是否有权限进行添加
    if (!operatorId) {
        // 操作员不存在
        throw Error('无法确认操作者，无法进行添加')
    }
    const operator = await exports.findAdminById(operatorId)
    if (!operator) {
        // 没有操作员权限
        throw Error('你还不是操作员，无法进行管理员添加')
    }

    const def = {
        presence: {
            message: 'is not allow blank'
        },
        type: "string",
    }
    const rule = {
        loginId: def,
        loginPwd: def,
        avatar: def,
        title: def,
        githubUrl: def,
        githubName: def,
        qqNumber: def,
        qqQrcode: def,
        weixin: def,
        weixinQrcode: def,
        mail: {
            presence: {
                message: 'mail is not allow blank'
            },
            email: true
        },
        icp: def,
        favicon: def,
        remember: def,
    }
    // throw Error(123)
    await validator.async(adminObj, rule)
    // 对loginPwd 进行加密处理
    adminObj.loginPwd = md5(adminObj.loginPwd)

    // 查看是否存在同账号的情况存在
    const res = await exports.findAdmin({ loginId: adminObj.loginId })
    if (res) {
        throw Error('该账号已存在，请更换账号')
    }
    return await Admin.create(adminObj).then(() => {
        console.log('管理员添加完成')
    })
}

// 删除管理员
exports.deleteAdmin = function (adminId) {
    Admin.destroy({
        where: {
            id: adminId
        }
    })
}
// 管理员更新
exports.updateAdmin = async function (adminId, adminObj) {
    adminObj = filterHelper(adminObj, 'title', 'icp', 'mail', 'githubName', 'githubUrl', 'avatar', 'favicon')
    return await Admin.update(adminObj, {
        where: {
            id: adminId
        }
    })
}
// 单个管理员查询 loginId,loginPwd
exports.findAdmin = async function (obj, ...props) {
    const where = filterHelper(obj, 'id', 'loginId', "loginPwd")
    if (!where) {
        return null
    }
    if (obj.loginPwd) {
        where.loginPwd = md5(where.loginPwd)
    }
    const admin = await Admin.findAll({
        where
    })
    return admin.length === 1 ? admin : null
}
// 通过id寻找管理员
exports.findAdminById = async function (id) {
    const res = await Admin.findByPk(id)
    return res
}

// 管理员列表
exports.findAllAdmins = async function (obj = {}, ...props) {
    const obj1 = await Admin.findAndCountAll({
        where: obj,
        attributes: props
    })
    return {
        total: obj1.count,
        rows: obj1.rows
    }
}

// 管理员登录
exports.login = async function ({ loginId, loginPwd }) {
    return await exports.findAdmin({ loginId, loginPwd })
}

// 获取我的所有信息
exports.whoami = async function (id) {
    return await Admin.findByPk(id)
}

// 修改密码
exports.updateAdminPwd = async function ({ loginId, loginPwd, newPwd }, id) {
    // 判断旧密码是否正确
    const data = await exports.login({
        loginId: loginId,
        loginPwd: loginPwd
    })
    if (data) {
        // 验证通过，修改密码
        // 判断修改密码是否是本人
        // id是数字？
        if (data[0].id !== +id ) {
            throw '不是本人，无法修改该密码'
        }
        try {
            await Admin.update({
                loginId,
                loginPwd: md5(newPwd)
            }, {
                where: {
                    id,
                }
            })
            return true
        } catch (err) {
            throw err
        }
    } else {
        throw '账号或者密码不正确，无法修改密码'
    }
}