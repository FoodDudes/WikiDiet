
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const userFood = require('../models/UserFood');

router
    .get('/', (req, res, next) => {
        console.log('in userfoods route');
        userFood.find({})
        .then(userfoods => res.send(userfoods))
        .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        userFood.find({})
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', jsonParser, (req, res, next) => {
	    userFood.findByIdAndUpdate(req.params.id, req.body) 
            .then(saved => res.send(saved))
            .catch(next);
    });



module.exports = router;
