const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken')

router.get('/', (req, res) => {
    res.send('hey owner');
})

if (process.env.NODE_ENV === "development") {
    router.post('/create', async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0) 
            return res
                    .status(409)
                    .send("You don't have permission to create a new owner");

        let {fullname, email, password} = req.body;
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let createdOwner = await ownerModel.create({
                        fullname,
                        email,
                        password: hash,
                    })
                    let token = generateToken(user);
                    res.cookie('token', token);
                    res.status(201).send(createdOwner);
                }
            })
        })           
        
    });
}

router.get('/admin', (req, res) => {
    let success = req.flash("success");
    res.render('createproducts', {success});
})



module.exports = router;