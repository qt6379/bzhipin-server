const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost:27017/bzhipin')
// 获取连接对象
const conn = mongoose.connection
// 监听绑定连接完成
conn.on('connected', () => {
  console.log('连接成功')
})

// 定义模型约束条件
const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  header: {type: String},  // 头像
  post: {type: String},  // 职位
  info: {type: String},  // 简介
  company: {type: String},  // 公司
  salary: {type: String},  // 月薪
})
// 定义模型(与集合对应, 可以操作集合)
const UserModel = mongoose.model('user', userSchema)

// 向外暴露Model(ComJs(?) 向外暴露只有俩种方法)
// module.exports = {}  // 只能暴露单个

exports.UserModel = UserModel