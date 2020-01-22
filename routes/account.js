const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');

//function to add a user
const createUser = async ({ firstName , lastName, email , password }) => {
    return await User.create({ firstName , lastName,  email , password });
};

// find user
const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};


//register a new user
router.post('/register', async  function(req, res, next) {

    const user = await getUser({email : req.body.email});

    if(user)
    return   res.status(409).json({message : 'email already exists'});

    bcrypt.hash(req.body.password , null , null, (err, hash) => {

   
        createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email : req.body.email ,
            password : hash ,
        }).then(user =>
            res.status(200).json({ user, msg: 'account created successfully' }) );
    })

});


module.exports = router;