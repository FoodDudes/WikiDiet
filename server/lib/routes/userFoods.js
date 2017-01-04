
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const UserFood = require('../models/userFood');

router
    .get('/', (req, res, next) => {
        UserFood.find()
        .then(userfoods => {
            if (!userfoods || userfoods.length === 0) {
                next({code: 404, message: 'No userfoods found.'});
            } else {
                res.send(userfoods);
            };
        })
        .catch(next);
    })

    .get('/:username', (req, res, next) => {
        let userName = req.params.username;
        UserFood.find({username: userName}).lean()
        .then(userfood => {
            if (!userfood) {
                next({code: 404, message: `No userfood found for ${username}.`});
            };
            res.send(userfood);            
        })
        .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        new UserFood(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', jsonParser, (req, res, next) => {
	    UserFood.findByIdAndUpdate(req.params.id, req.body) 
            .then(saved => res.send(saved))
            .catch(next);
    });



module.exports = router;
