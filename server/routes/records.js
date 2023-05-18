const express = require('express');
const router = express.Router();

const Record = require('../models/Record.js');

router.get('/', async (req, res) => {
    return res.json(await Record.find(req.query));
});

router.post('/', async (req, res) => {
    const record = new Record(req.body);
    await record.save();
    res.json({state: 'sucsess'});
});

router.put('/', async (req, res) => {
    await Record.updateOne(req.query, req.body);
    res.json({state: 'updated'});
});

router.delete('/', async (req, res) => {
    await Record.deleteMany(req.query);
    res.json({state: 'deleted'});
});

module.exports = router;