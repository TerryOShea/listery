'use strict';

var User = require('../models/user'), 
    List = require('../models/list'), 
    Entry = require('../models/entry');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('pages/index', { title: 'Home', list: List("list #1", ["banana", "wash laundry", "shape up", "get a job"].map(a => Entry(a))) });
    });
};