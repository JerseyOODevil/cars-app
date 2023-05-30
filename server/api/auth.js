const express = require('express')
const crypto = require('bcryptjs')
const router = express.Router()
const mysql = require('mysql2/promise')
const jwt = require('jsonwebtoken')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'MySQLUser',
    password: 'Zalupa1576',
    database: 'db_cars',
    //timezone: 'UTC+3',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
  })

const AUTH_SECRET = 'PfkegfRjyz20Cv'
const tokenAge = 1000 * 60 * 60 * 24 //1 day

function getToken(userInfo){
    return jwt.sign(userInfo,AUTH_SECRET)
}

function checkToken(token){
    const valToken = jwt.verify(token,AUTH_SECRET)
    return !!valToken
}

router.post('/register',async (req,res)=>{
    const {login, password} = req.body

    const hashPassword = await crypto.hash(password, 3)
    let sendRegister = true
    await connection.query(
        `SELECT login from t_users where login = '${login}'`
        )
        .then(([result, fields]) => {
            sendRegister = result.length === 0
        })
        .catch((err)=>{
            sendRegister = null
        })

    if (sendRegister){
        const query = `insert into t_users
            values (null, '${login}', '${hashPassword}', null, null, 'nobody')`

        await connection.query(query)
            .then((result)=>{
                res.status(200).json('[OK] Registration successfully')
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    }
    else{
        if (sendRegister === null)
            res.status(501).json('[FAIL] DB Connection failed')
        else
            res.status(500).json(`[FAIL] User ${login} already exists`)
    }
    
})

router.post('/login',async (req,res)=>{
    const {login,password} = req.body

    let hashPassword = null
    let userInfo = null
    await connection.query(
        `SELECT login,password,fullName,shortName,role from t_users where login = '${login}' and role <> 'nobody'`
        )
        .then(([result, fields]) => {
            if (result.length > 0){
                hashPassword = result[0].password
                userInfo = {
                    login: result[0].login,
                    userName: result[0].shortName,
                    role: result[0].role,
                    expirationDate: new Date().getTime() + tokenAge
                }
            }
        })
        .catch((err)=>{
            
        })
    
    let passComp = false
    if (hashPassword)
        passComp = crypto.compare(password,hashPassword)

    if (passComp)
        res.status(200).json({
            userId: getToken(userInfo),
            userInfo
        })
    else
        res.status(401).json('[FAIL] Invalid user or password')
})

router.post('/check',async (req,res)=>{
    const tokenValidation = checkToken(req.body.userId)

    if (tokenValidation)
        res.status(200).json('[OK] Valid token')
    else
        res.status(401).json('[FAIL] Invalid token')
})

module.exports = router