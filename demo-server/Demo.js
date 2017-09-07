// let user = require('./User')
// import { userName, say } from './User'
// console.log(`userName:${userName}, say:${say()}`)
// let path = require('path')
// console.log(__dirname)
// let http = require('http')
// let url = require('url')
// let util = require('util')
// http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain; charset=utf-8')
//     // res.setHeader('Content-Length', '20')
//     res.end(util.inspect(url.parse(req.url)))
// }).listen(3000, '127.0.0.1', () => {
//     console.log('server is running, please open the bower to http://127.0.0.1:3000/')
// })

// let http = require('http')
// let url = require('url')
// let util = require('util')
// let fs = require('fs')

// http.createServer((req, res) => {
//     let pathName = url.parse(req.url).pathname
//     fs.readFile(pathName.substring(1), (err, data) => {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/html'
//             })
//         } else {
//             res.writeHead(200, {
//                 'Content-Type': 'text/html'
//             })
//             console.log(data) 
//             res.write(data.toString())
//         }
//         res.end()
//     })
// }).listen(3000, '127.0.0.1', () => {
//     console.log('server is running, please open the browser to http://127.0.0.1:3000/')
// })

let http = require('http')
let util = require('util')
http.get('http://www.imooc.com/u/card', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk
    })
    res.on('end', () => {
        let result = JSON.parse(data);
        console.log(`resulte:${util.inspect(result)}`)
    })
})