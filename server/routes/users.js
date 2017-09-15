let express = require('express')
let router = express.Router()

let User = require('../models/users')
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource')
})

router.post('/login', function(req, res, next) {
    let param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    User.findOne(param, (err, userDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (userDoc) {
                res.cookie('userId', userDoc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })
                // req.session.user = userDoc
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        userName: userDoc.userName
                    }
                })
            } else {
                res.json({
                    status: '1',
                    msg: '用户名或者密码错误'
                })
            }
        }
    })
})

module.exports = router
