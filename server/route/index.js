const homeRouter = require('express').Router();
const fs = require('fs');
const path = require('path');

homeRouter.get('/', (req, res) => {
    let rawdata = fs.readFileSync(path.resolve(__dirname, '../data.json'));
    let student = JSON.parse(rawdata);
    res.send(student);
    res.end();

});

module.exports = homeRouter;