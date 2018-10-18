// 云函数入口文件
const cloud = require('wx-server-sdk')
const fetch = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const res = await fetch('http://47.100.49.193:3000/banner')
    
    return {
        a: JSON.parse(res)
    }
}