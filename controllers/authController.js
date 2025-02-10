const userModel = require('../models/user-model');
const ownerModel = require('../models/owner-model');
const productModel = require('../models/product-model');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken')

module.exports.registerUser = async (req, res) => {
    try{
        let {fullname, email, password} = req.body;

        let user = await userModel.findOne({email: email});

        if (user) return res.status(401).send("Account already exists"); 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                    })
                    let token = generateToken(user);
                    res.cookie('token', token);
                    res.send("user created successfully");
                }
            })
        })

        

        
    } catch (err) {
        console.log(err.message);
    }
    
}

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email});
    if (!user){
        user = await ownerModel.findOne({email});
        if (!user) {
        req.flash("error", "Email or password incorrect");
        return res.redirect('/');
        }
    } 

    bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
            let products = await productModel.find();
            let token = generateToken(user);
            res.cookie("token", token);
            res.render('shop', {products});
        }
        else {
            res.send("Email or password incorrect");
        }
    })
}

module.exports.logoutUser = (req, res) => {
    res.cookie("token", "");
    res.redirect('/');
}