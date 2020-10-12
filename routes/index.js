var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')

const {UserModel} = require('../db/models')

const filter = {password: 0, __v: 0}  // 过滤查询结果集中某些属性

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 用路由器注册路由(测试)
// router.post('/register', function (req, res) {
//   // 获取请求参数
//   // 处理
//   // 返回响应结果
//   const {username, password} = req.body
//   if (username === 'admin'){
//     res.send({code: 1, msg: '请求失败'})
//   }else {
//     res.send({code:0, data:{id: 'abc', username, password}})
//   }
//
// })

// 注册的路由
router.post('/register', function (req, res) {
  // 获取请求参数
  const {username, password, type} = req.body
  // 查询用户是否存在
  UserModel.findOne({username}, function (err, user) {
    // 如果user存在, 返回json对象
    if(user){
      res.send({code: 1, msg: '该用户已存在'})
    }else {
      // 保存, 需要用UserModel实例来保存
      new UserModel({username, type, password: md5(password)}).save(function (err, user) {
        // 生成持久化cookie
        res.cookie('user_id', user._id, {maxAge: 1000*60*60*24})
        // 返回包含user信息json对象, 除了密码
        const data = {username, type, _id: user._id}
        res.send({code: 0, data: data})
      })

    }
  })
})

// 登录的路由
router.post('/login', function (req, res) {
  const {username, password} = req.body
  UserModel.findOne({username, password: md5(password)}, filter, function (err, user) {
    if(user){
      res.cookie('user_id', user._id, {maxAge: 1000*60*60*24})
      res.send({code: 0, data: user})
    }else {
      res.send({code: 1, msg: '用户名或密码错误'})
    }
  })
})

module.exports = router;
