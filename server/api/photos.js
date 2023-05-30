const express = require('express')
const path = require('path')
const router = express.Router()
const fs = require('fs')

router.get('/getPhotos', async (req,res) => {
    let fileNames = []
    
    try{
        fileNames = fs.readdirSync(path.join(__dirname, `../photos/${req.query.id}`))
        for (let i in fileNames)
            fileNames[i] = `/photos/${req.query.id}/${fileNames[i]}`
    }
    catch(err){
        console.log(err)
    }

    res.status(200).json({photos: fileNames})

})

router.post('/delPhoto', async (req,res) => {
    let filePath = path.join(__dirname, `../${req.body.path}`)
    let status = 200
    let error = null

    await fs.rm(filePath, (err) => {
        status = 500
        error = err
    })

    res.status(status).json(status === 200 ? `[OK] File ${filePath} deleted successfully` : error)
})

module.exports = router;