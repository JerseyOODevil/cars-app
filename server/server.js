const express = require('express')
const morgan = require('morgan')
const path = require('path')
const fileUpload = require('express-fileupload')
const fs = require('fs')

const app = express()

app.use(fileUpload())
app.set('port', 3000)

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
})

app.post('/uploadPhotos', async (req, res) => {
    if (!fs.existsSync(path.join(__dirname, `./photos/${req.query.id}`)))
        fs.mkdir(path.join(__dirname, `./photos/${req.query.id}`), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!')
        })
    else 
        console.log(`Car id=${req.query.id} directory already exists`);
    
    if (req.files)
        for (let i in req.files){
            try{
                req.files[i].mv(`${__dirname}/photos/${req.query.id}/${req.files[i].name}`)
                console.log(`[OK] File ${req.files[i].name} upload successfully`)
            }
            catch (err){
                console.log(err)
            }
        }

    res.status(200).json('[OK]')
})
 
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

//API
app.use('/api/MySQL', require('./api/MySQL'))
app.use('/api/photos', require('./api/photos'))

//Photos
app.use('/photos', express.static(path.join(__dirname, './photos')))

app.use('/', express.static(path.join(__dirname, '../dist')))