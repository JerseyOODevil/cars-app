const express = require('express')
const router = express.Router()
const mysql = require('mysql2/promise')

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

console.log(`[OK] MySQL connected`)

function dateToString(date){
    if (!date)
        return 'null'
    
    return `'${date.getFullYear()}-${date.getMonth()<9 ? '0' : ''}${date.getMonth()+1}-${date.getDate()<9 ? '0' : ''}${date.getDate()}'`
}

router.get('/getCarsList', async (req, res) => {
    await connection.query(
        `SELECT
            a.id
        ,   max(a.model) as model
        ,   max(a.buildYear) as buildYear
        ,   min(b.date) as buyDate
        FROM t_cars a
            left join t_cars_operations b
                on b.carId = a.id
        where 1=1
        ${req.params.conditions ?? ''}
        group by a.id
        order by min(b.date) desc`)
        .then(([result, fields]) => {
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
})

router.post('/updateCar', async (req, res) => {
    let status = 200
    let errors = []
    
    const car = req.body
    let query = `
        insert into t_cars (id, model, buildYear) 
        values (${car.id ?? 'null'},'${car.model}',${car.buildYear})
        on duplicate key update
        model=values(model), buildYear=values(buildYear)`

    await connection.query(query)
        .then((result)=>{
            
        })
        .catch((err)=>{
            status = 500
            errors.push(err)
        })

    let delIds = car.operations.filter(cur => cur.deleted).map(cur => cur.id)
    car.operations = car.operations.filter(cur => !cur.deleted)

    query = `delete from t_cars_operations
        where id in (${delIds.join(',')})`
    if (delIds.length > 0){
        await connection.query(query)
            .then((result)=>{
                
            })
            .catch((err)=>{
                status = 500
                errors.push(err)
            })
    }

    query = 'insert into t_cars_operations values ' + 
        car.operations.map((cur) => {
            return `(${cur.id ?? 'null'},${car.id},'${cur.name}',${dateToString(new Date(cur.date))},${cur.value})`
        }).join(',') + `
            on duplicate key update name = values(name), date=values(date), value=values(value)`

    if (car.operations.length > 0){
        await connection.query(query)
            .then((result)=>{
                
            })
            .catch((err)=>{
                status = 500
                errors.push(err)
            })
    }
    res.status(status).json(errors)
})

router.get('/getCar', async (req,res) => {
    let status = 200
    let errors = []

    let car = {}

    let query = `
        select
            *
        from t_cars
        where id = ${req.query.id}`
    

    await connection.query(query)
        .then(([result,fields])=>{
            car.id = result[0].id
            car.model = result[0].model
            car.buildYear = result[0].buildYear
            car.operations = []
        })
        .catch((err)=>{
            status = 500
            errors.push(err)
        })

    query = `select
        id
    ,   carId
    ,   name
    ,   DATE_FORMAT(date, '%Y-%m-%d') as date
    ,   value
    from t_cars_operations
    where carId = ${req.query.id}`

    
    await connection.query(query)
        .then(([result,fields])=>{
            for (let row of result){
                car.operations.push({
                    id:row.id,
                    name:row.name,
                    date:row.date,
                    value:row.value
                })
            }
        })
        .catch((err)=>{
            status = 500
            errors.push(err)
        })
    
    for (let i=0; i<car.operations.length; i++){
        console.log(car.operations[i].date)
    }

    res.status(status).json(status === 200 ? car : errors)
})

router.get('/getOperations', async (req, res) => {
    query = `select
        id
    ,   name
    ,   DATE_FORMAT(date, '%Y-%m-%d') as date
    ,   value
    from t_operations
    order by date desc`
    
    await connection.query(query)
        .then(([result,fields])=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
})

router.post('/updateOperations', async (req, res) => {
    let status = 200
    let errors = []

    let operations = req.body
    let delIds = operations.filter(cur => cur.deleted).map(cur => cur.id)

    let query = ''

    if (delIds.length > 0){
        query = `delete from t_operations
            where id in (${delIds.join(',')})`
        await connection.query(query)
            .then((result)=>{
                
            })
            .catch((err)=>{
                status = 500
                errors.push(err)
            })
    }

    operations = operations.filter(cur => !cur.deleted)
    if (operations.length > 0){
        query = 'insert into t_operations values ' + 
            operations.map((cur) => {
                return `(${cur.id ?? 'null'},'${cur.name}',${dateToString(new Date(cur.date))},${cur.value})`
            }).join(',') + `
                on duplicate key update name = values(name), date=values(date), value=values(value)`
        await connection.query(query)
            .then((result)=>{
                
            })
            .catch((err)=>{
                status = 500
                errors.push(err)
            })
    }

    res.status(status).json(errors)
})

router.get('/getCapital', async (req,res)=>{
    const query = `select
                    monthId
                ,	DATE_FORMAT(min(min_date), '%M %Y') as monthName
                ,	sum(value) as value
                from
                (SELECT 
                    DATE_FORMAT(date, '%Y%m') as monthId
                ,	min(date) as min_date
                ,	sum(value) as value
                from t_cars_operations
                group by monthId
                UNION
                SELECT 
                    DATE_FORMAT(date, '%Y%m') as monthId
                ,	min(date) as min_date
                ,	sum(value) as value
                from t_operations
                group by monthId) a
                group by monthId
                order by monthId`

    await connection.query(query)
        .then(([result,fields])=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
})

router.delete('/deleteCar', async (req,res) => {
    query = `delete from t_cars
            where id = ${req.query.id}`
    await connection.query(query)
        .then((result)=>{
            res.status(200).json(`[OK] Car id=${req.query.id} deleted sucsessfully`)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
})

module.exports = router;