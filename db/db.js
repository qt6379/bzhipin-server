const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true })
// 获取连接对象
const conn = mongoose.connection
// 绑定连接完成的监听
conn.on('connected', function () {
  console.log('链接成功')
})

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  header: {type: String}
})

// 返回构造函数, 集合名称为users
const UserModel = mongoose.model('user', userSchema)

function m_save() {
  const userModel = new UserModel({
    username: '张三',
    password: '666',
    type: 'boss'
  })
  userModel.save(function (err, user) {
    console.log(err, user)
  })
}

m_save()