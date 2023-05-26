const express = require('express')
const path = require('path')
const router = express.Router()
const fs = require('fs')

router.get('/getPhotos', async (req,res) => {
    let fileNames

    try{
        fileNames = fs.readdirSync(path.join(__dirname, `../photos/${req.query.id}`))
        for (let i in fileNames)
            fileNames[i] = `/photos/${req.query.id}/${fileNames[i]}`
    }
    catch(err){
        console.log(err)
    }

    if (fileNames)
        res.status(200).json({photos:fileNames})
    else 
        res.status(500).json('[FAIL] Server error')
})

module.exports = router;